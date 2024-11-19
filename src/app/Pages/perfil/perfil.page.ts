import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../servicio/auth.service';
import { CrudfirebaseService,Viaje } from 'src/app/servicio/crudfirebase.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario:string=''
  uid:string=''
  listado_viaje: (Viaje & { id: string })[] = [];
  constructor(private navCtrl : NavController,private authService: AuthService,private crudServ:CrudfirebaseService) { }

  ngOnInit() {
    this.authService.getAuthState().subscribe(user => {
      this.usuario = user?.displayName || '';
      this.uid = user?.uid || '';
    });
    this.listar()
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.authService.logout().then(() => {
          this.navCtrl.navigateForward(['/inicio-opcion']);
        });
      },
    },
  ];

  listar(){
    this.crudServ.listarViajes().subscribe(data=>{
      // this.listado_viaje=data
      this.listado_viaje = data as (Viaje & { id: string })[];
    })
  }

}
