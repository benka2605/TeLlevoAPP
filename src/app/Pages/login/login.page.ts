import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:string=''
  password:string=''

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
    
  }

  restablecer() {
    this.navCtrl.navigateForward(['/restablecer'])
  }

  validar() {
    if (this.usuario == 'Conductor' && this.password == '1234' || this.usuario == 'Pasajero' && this.password == '1234') {
      localStorage.setItem("usuario",this.usuario)
      this.navCtrl.navigateForward(['/home'])
      alert('Bienvenido')
    } else {
      alert('Usuario y/o contraseña incorrecta')
    }
  }

}
