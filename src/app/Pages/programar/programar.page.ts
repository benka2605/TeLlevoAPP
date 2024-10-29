import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { MapaComponent } from '../../Components/mapa/mapa.component';
import { ConfirmModalComponent } from '../../Components/confirm-modal/confirm-modal.component';
import { CrudfirebaseService, Viaje } from 'src/app/servicio/crudfirebase.service';

@Component({
  selector: 'app-programar',
  templateUrl: './programar.page.html',
  styleUrls: ['./programar.page.scss'],
})
export class ProgramarPage implements OnInit {
  @ViewChild(MapaComponent) mapComponent: MapaComponent;

  constructor(
    private navCtlr: NavController,
    private modalController: ModalController,
    private alertController: AlertController,
    private CrudServ: CrudfirebaseService
  ) {}

  nuevo_viaje: Viaje = { 
    costo_persona: '', 
    destino: '', 
    disponibles: 0, 
    encuentro: '', 
    ruta: { 
      start: [0, 0], 
      end: [0, 0], 
      geojson: {}
    }
  };

  ngOnInit() {}

  async onDestinoSeleccionado({ destino, ruta }: { destino: string, ruta: { start: [number, number], end: [number, number], geojson: any } }) {
    this.nuevo_viaje.destino = destino; // Guarda el nombre del destino en el modelo
    this.nuevo_viaje.ruta = ruta; // Guarda la ruta en el modelo
    this.mapComponent.closeMap(); // Cierra el mapa
  }
  
  

  async Grabar() {
    this.CrudServ.crearViaje(this.nuevo_viaje).then(async () => {
      if (parseInt(this.nuevo_viaje.costo_persona) > 0 && this.nuevo_viaje.disponibles > 0 && this.nuevo_viaje.destino.trim() !== '' && this.nuevo_viaje.encuentro.trim() !== '') {
        this.navCtlr.navigateForward('/home');
        const alert = await this.alertController.create({
          header: '¡Éxito!',
          message: 'Viaje programado correctamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }).catch((err) => {
      alert('Error al crear el viaje');
    });
  }

  

  abrirMapa() {
    this.mapComponent.openMap(); // Llama al método para abrir el mapa
  }
}
