import { Component,OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuario:string=''
  constructor(private navCtrl : NavController) {}

  ngOnInit(): void {
    this.usuario=localStorage.getItem("usuario") ?? ''
  }
  Programar(){
    this.navCtrl.navigateForward(['/programar'])
  }
  Viaje(){
    this.navCtrl.navigateForward(['/viaje'])
  }
  Perfil(){
    this.navCtrl.navigateForward(['/perfil'])
  }

}
