import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  public progress = 0;
  constructor(private navCtrl : NavController) {}

  ngOnInit() { 
    

    setInterval(() => {
      this.progress += 0.01;
      if (this.progress > 1) {
        
      }
    }, 50);

    setTimeout(() => {
      this.progress = 1;
      this.navCtrl.navigateForward(['/inicio-opcion']) 
    }, 5000);
    
  }
  }


