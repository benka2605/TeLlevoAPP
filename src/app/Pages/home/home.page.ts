import { Component,OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../servicio/auth.service'
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuario:string|null='';
  usuario_rol:string|null='';

  constructor(private navCtrl : NavController,private authService:AuthService,private firestore:AngularFirestore) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe(user => {
      if(user) {
        this.usuario = user.displayName;
        this.firestore.collection('users').doc(user.uid).valueChanges().subscribe((userData: any) => {
          if (userData && userData.rol) {
            this.usuario_rol = userData.rol;
          } else {
            console.error('No tiene rol')
          }
        })
      }
    })
  }
  Programar(){
    this.navCtrl.navigateForward('/programar')
  }
  Viajes(){
    this.navCtrl.navigateForward('/viaje')
  }
  Perfil(){
    this.navCtrl.navigateForward('/perfil')
  }
}
