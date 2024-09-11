import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:string=''
  password:string=''

  constructor(private navCtrl : NavController, private alertController:AlertController) { }

  ngOnInit() {
    
  }

  restablecer() {
    this.navCtrl.navigateForward(['/restablecer'])
  }

  async validar() {
    if (this.usuario == 'Conductor' && this.password == '1234' || this.usuario == 'Pasajero' && this.password == '1234') {
      localStorage.setItem("usuario",this.usuario)
      const alert = await this.alertController.create({
        message: 'Sesion iniciada correctamente.',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateForward(['/home'])
    } else {
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Usuario y/o contraseña incorrecta',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
