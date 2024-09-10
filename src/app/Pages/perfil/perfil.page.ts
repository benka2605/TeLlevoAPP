import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario:string=''
  constructor(private navCtrl : NavController) { }

  ngOnInit() {
    this.usuario=localStorage.getItem("usuario") ?? ''
  }
  Cerrar(){
    this.navCtrl.navigateForward(['/login'])
  }

}
