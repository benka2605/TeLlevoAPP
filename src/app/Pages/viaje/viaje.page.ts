import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { CrudfirebaseService, Viaje } from 'src/app/servicio/crudfirebase.service';
@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  usuario:string=''

  
  
  
  constructor(private CrudServ:CrudfirebaseService,private alertController: AlertController) { }

  // listado_viaje:Viaje[]=[]
  listado_viaje: (Viaje & { id: string })[] = [];
  viaje_mod:Viaje= {costo_persona:'',destino:'',disponibles:0,encuentro:''} 

  ngOnInit() {
    this.usuario=localStorage.getItem("usuario") ?? ''
    this.listar()

    
    
  }

  
  
  listar(){
    this.CrudServ.listarViajes().subscribe(data=>{
      // this.listado_viaje=data
      this.listado_viaje = data as (Viaje & { id: string })[];
    })
  }

  async confirmarModificar(viaje: Viaje & { id: string }) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que quieres tomar este viaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirmación cancelada');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.modificar(viaje);
          }
        }
      ]
    });

    await alert.present();
  }

  modificar(viaje: Viaje & { id: string }) {
    if (viaje.disponibles > 0) {
      this.CrudServ.modificarViaje(viaje.id, viaje).then(() => {
        this.listar(); // Volver a listar para actualizar la vista
      }).catch(error => {
        console.error('Error al modificar el viaje: ', error);
      });
    } else {
      console.warn('No hay asientos disponibles para reducir.');
    }
  }

}
