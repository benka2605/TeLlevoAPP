import { Component, OnInit } from '@angular/core';
import { CrudfirebaseService, Viaje } from 'src/app/servicio/crudfirebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  viajes: any[] = [];
  ui=localStorage.getItem('uid')

  constructor(private crud:CrudfirebaseService,private alertController: AlertController) { }

  ngOnInit() {
    this.listar()
    console.log(this.ui)
  }

  listar(){
    this.crud.getDocuments().subscribe(data => {
      this.viajes = data;
      console.log(this.viajes); // Aquí puedes ver el UID de cada documento en la consola
    });
  }

  empezarViaje(){
    this.crud.eliminarViaje(this.ui)
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: '¿Estás seguro de que quieres empezar el viaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.empezarViaje()
          }
        }
      ]
    });

    await alert.present();
  }

}
