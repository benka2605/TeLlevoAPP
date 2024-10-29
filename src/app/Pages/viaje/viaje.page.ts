import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { MapaComponent } from 'src/app/Components/mapa/mapa.component';

import { CrudfirebaseService, Viaje } from 'src/app/servicio/crudfirebase.service';
@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  @ViewChild(MapaComponent) mapComponent: MapaComponent;

  usuario:string=''

  
  
  
  constructor(private CrudServ:CrudfirebaseService,private alertController: AlertController) { }

  // listado_viaje:Viaje[]=[]
  listado_viaje: (Viaje & { id: string })[] = [];
  viaje_mod: Viaje = {
    costo_persona: '',
    destino: '',
    disponibles: 0,
    encuentro: '',
    ruta: { start: [0, 0], end: [1, 1], geojson: null } // Agrega esto
  };

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
    } 
    if (viaje.disponibles === 1 ) {
      this.CrudServ.eliminarViaje(viaje.id)
    }
    else {
      console.warn('No hay asientos disponibles para reducir.');
    }
  }

  verViaje(viaje: Viaje & { id: string }) {
    this.mapComponent.openMap(); // Abre el mapa
    this.mapComponent.drawRoute(viaje.ruta.start, viaje.ruta.end); // Dibuja la ruta
    this.mapComponent.hideSearchForm();
  }
  

}
