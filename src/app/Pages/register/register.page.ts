import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicio/auth.service';
import { NavController } from '@ionic/angular';

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

  constructor(private navCtrl:NavController,private authService: AuthService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.email,this.password,this.usuario,this.rol).then(() => {
      this.navCtrl.navigateForward('/login').catch(error => {
        console.error('Error de registro',error)
      })
    })
  }

}
