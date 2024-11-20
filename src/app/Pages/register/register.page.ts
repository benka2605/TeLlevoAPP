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
  user = this.fireservice.listarUsuarios(this.usuario,this.email)

  constructor(private navCtrl:NavController,
    private authService: AuthService,
    private fireservice:FireService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async register(){
    try {
      if (this.usuario === await this.user) {
        await this.presentAlert()
      } else {
        await this.authService.register(this.email,this.password,this.usuario,this.rol)
          this.limpiar()
        await this.navCtrl.navigateForward('/login')
          
        }
    }
    catch (error){
      this.presentAlertError(error)
    }
    

  
    }
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'El nombre de usuario ya existe',
        buttons: ['Action'],
      });
  
      await alert.present();
    }
  
    async presentAlertError(error:any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message || 'Se produjo un error inesperado',
        buttons: ['Ok'],
      });
  
      await alert.present();
    }
  
    limpiar(){
      this.email='';
      this.password='';
      this.usuario='';
      this.rol='pasajero';
    }
  }
