import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-opcion',
  templateUrl: './inicio-opcion.page.html',
  styleUrls: ['./inicio-opcion.page.scss'],
})
export class InicioOpcionPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }

  login(){
    this.navCtrl.navigateForward(["/login"])
  }

  register(){
    this.navCtrl.navigateForward('/register')
  }

}
