import { Component, OnInit } from '@angular/core';
import { viajes } from '../model/viajes';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { CrudfirebaseService, Viaje } from 'src/app/servicio/crudfirebase.service';

@Component({
  selector: 'app-programar',
  templateUrl: './programar.page.html',
  styleUrls: ['./programar.page.scss'],
})
export class ProgramarPage implements OnInit {


  

  constructor(private navCtlr: NavController,private alertController: AlertController,private CrudServ:CrudfirebaseService) { }

  nuevo_viaje:Viaje={costo_persona:'',destino:'',disponibles:0,encuentro:''}
  ngOnInit() {
  }
  alertButtons = ['Ok'];

  async Grabar(){
    this.CrudServ.crearViaje(this.nuevo_viaje).then(async ()=>{
      if(parseInt(this.nuevo_viaje.costo_persona)>0 &&  this.nuevo_viaje.disponibles>0 && this.nuevo_viaje.destino.trim() !='' && this.nuevo_viaje.encuentro.trim()!=''){
        this.navCtlr.navigateForward("/home")
        const alert = await this.alertController.create({
          header: '¡Éxito!',
          message: 'Viaje programado correctamente.',
          buttons: ['OK']
          
        });
        await alert.present();
      }
    }).catch((err)=>{
      alert('error')
    })
  }

}
