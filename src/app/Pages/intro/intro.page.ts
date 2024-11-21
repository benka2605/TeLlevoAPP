import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/servicio/auth.service';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  constructor(private navCtrl : NavController, private authService:AuthService) {}

  ngOnInit() {
    this.authService.estado()
  }

  seguir(){
      this.navCtrl.navigateForward('/login')
  }
}
  


