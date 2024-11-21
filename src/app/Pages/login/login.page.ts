import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../servicio/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string = '';
  password:string = '';
  recordar:boolean = false;

  constructor(private navCtrl : NavController,
     private alertController:AlertController,
     private authService: AuthService,
     private afAuth:AngularFireAuth) {  }

  ngOnInit() {
    if(this.recordar) {
      console.log("si")
    } else {
      console.log("no")
    }
  }

  restablecer() {
    this.navCtrl.navigateForward(['/restablecer'])
  }

  async login(){
    if (this.email.trim()==='' || this.password.trim()==='') {
      this.modalValidar()
    } else{
      await this.authService.login(this.email,this.password,this.recordar).then(()=>{
        this.presentAlert();
        this.limpiarCampos();
        this.navCtrl.navigateForward('/home')
      }).catch((error)=>{
        this.modalValidar()
      })
    }
  }

  recuperar(){
    this.navCtrl.navigateForward('/restablecer')
  }

  registrar(){
    this.navCtrl.navigateForward("/register()")
  }

  limpiarCampos(){
    this.email= '';
    this.password= '';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Se a iniciado sesión correctamente',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async modalValidar() {
    const alert = await this.alertController.create({
      header: 'Correo y/o contraseña estan incorrectos',
      buttons: ['Ok'],
    });

    await alert.present();
  }

}
