import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajePageRoutingModule } from './viaje-routing.module';

import { ViajePage } from './viaje.page';
import { MapaComponent } from 'src/app/Components/mapa/mapa.component';
import { MapComponent } from 'src/app/Components/map/map.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajePageRoutingModule,
  ],
  declarations: [ViajePage,MapComponent]
})
export class ViajePageModule {}
