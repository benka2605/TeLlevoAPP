import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramarPageRoutingModule } from './programar-routing.module';

import { ProgramarPage } from './programar.page';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MapaModule } from 'src/app/Components/mapa/mapa.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramarPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MapaModule,
  ],
  declarations: [ProgramarPage]
})
export class ProgramarPageModule {}
