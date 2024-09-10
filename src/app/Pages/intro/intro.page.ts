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
    setTimeout(() => {
      this.navCtrl.navigateForward(['/login'])
    },5000)

    setInterval(() => {
      this.progress += 0.01;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
        }, 5000);
      }
    }, 50);
  }
  }


