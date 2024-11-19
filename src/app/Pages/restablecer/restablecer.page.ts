import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/servicio/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  email:string =''

  constructor(private authService:AuthService,private navCtrl: NavController) { }

  ngOnInit() {
  }
  
  recuperar(){
    this.authService.resetPassword(this.email)
  }

  regresar(){
    this.navCtrl.navigateForward('/login')
  }

  public alertButtons = [
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.limpiar()
        console.log('Alert confirmed');
      },
    },
  ];
  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  limpiar(){
    this.email=''
  }
}
