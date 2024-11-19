import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicio/auth.service';
import { NavController } from '@ionic/angular';
import { FireService } from 'src/app/servicio/fire.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email:string='';
  password:string='';
  usuario:string='';
  rol:string='pasajero';

  constructor(private navCtrl:NavController,
    private authService: AuthService,
    private fireservice:FireService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async register(){
    if (await this.fireservice.listarUsuarios(this.usuario)) {
      this.presentAlert()
    } else {
      this.authService.register(this.email,this.password,this.usuario,this.rol).then(() => {
        this.navCtrl.navigateForward('/login').catch(error => {
          console.error('Error de registro',error)
        })
      })
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'El nombre de usuario ya existe',
      buttons: ['Action'],
    });

    await alert.present();
  }

}
