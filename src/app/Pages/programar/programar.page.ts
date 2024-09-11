import { Component, OnInit } from '@angular/core';
import { viajes } from '../model/viajes';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-programar',
  templateUrl: './programar.page.html',
  styleUrls: ['./programar.page.scss'],
})
export class ProgramarPage implements OnInit {

  costo_persona:string
  destino:string
  lugar_encuentro:string

  

  constructor(private navCtlr: NavController,private alertController: AlertController) { }

  ngOnInit() {
  }

   async Programar(){
    let fechaActual = new Date();
    let via = new viajes()
    via.costo_persona=this.costo_persona
    via.destino=this.destino
    via.lugar_encuentro=this.lugar_encuentro
    via.dia=fechaActual.getDay()
    via.mes=fechaActual.getMonth()
    via.anio=fechaActual.getFullYear()
    via.hora=fechaActual.getHours()
    via.minuto=parseInt(fechaActual.getMinutes().toString().padStart(2))
    let arreglo:viajes[]
    if(localStorage.getItem("viajes")){
      arreglo =JSON.parse(localStorage.getItem("viajes") ?? '')
    } else {
      arreglo=[]
      console.log("No hay datos")
    }
    if(parseInt(this.costo_persona)>0 && this.destino.trim() !='' && this.lugar_encuentro.trim()!=''){
      arreglo.push(via)
      localStorage.setItem("viajes",JSON.stringify(arreglo))
      this.navCtlr.navigateForward("/home")
      const alert = await this.alertController.create({
        header: '¡Éxito!',
        message: 'Viaje programado correctamente.',
        buttons: ['OK']
        
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: '¡Error!',
        message: 'Los campos no son validos.',
        buttons: ['OK']
        
      });
      await alert.present();
    }
  }
  alertButtons = ['Ok'];

}
