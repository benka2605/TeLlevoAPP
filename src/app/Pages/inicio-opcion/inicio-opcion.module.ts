import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioOpcionPageRoutingModule } from './inicio-opcion-routing.module';

import { InicioOpcionPage } from './inicio-opcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioOpcionPageRoutingModule
  ],
  declarations: [InicioOpcionPage]
})
export class InicioOpcionPageModule {}
