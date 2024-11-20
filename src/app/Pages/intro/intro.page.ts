import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from 'src/app/servicio/auth.service';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  isAuthenticated:boolean = false

  public progress = 0;
  constructor(private navCtrl : NavController,private afAuth:AuthService) {}

  ngOnInit() { 
    

    setInterval(() => {
      this.progress += 0.01;
      if (this.progress > 1) {
        
      }
    }, 50);

    setTimeout(() => {
      this.progress = 1;
      this.afAuth.getAuthState().subscribe(user=>{
      this.isAuthenticated = !! user;
      })
      if (this.isAuthenticated){
        this.navCtrl.navigateForward('/home')
      } else {
        this.navCtrl.navigateForward(['/login']) 
      }
    }, 5000);
    
  }
  }


