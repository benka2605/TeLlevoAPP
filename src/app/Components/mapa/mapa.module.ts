import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MapaComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [MapaComponent], // Exporta el componente para que pueda ser usado en otros módulos
})
export class MapaModule {}
