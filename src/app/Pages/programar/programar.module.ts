import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramarPageRoutingModule } from './programar-routing.module';

import { ProgramarPage } from './programar.page';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MapaComponent } from '../../Components/mapa/mapa.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramarPageRoutingModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [ProgramarPage,MapaComponent]
})
export class ProgramarPageModule {}
