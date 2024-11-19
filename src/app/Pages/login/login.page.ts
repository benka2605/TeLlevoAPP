import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../servicio/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string = '';
  password:string = '';

  constructor(private navCtrl : NavController, private alertController:AlertController,private authService: AuthService) { }

  ngOnInit() {
    
  }

  restablecer() {
    this.navCtrl.navigateForward(['/restablecer'])
  }

  login(){
    this.authService.login(this.email,this.password).then(()=>{
      this.navCtrl.navigateForward('/home');
    }).catch(error => {
      console.error('Error de inicio de sesión',error);
    });
  }

  recuperar(){
    this.navCtrl.navigateForward('/restablecer')
  }

  regresar(){
    this.navCtrl.navigateForward('/inicio-opcion')
  }

}
