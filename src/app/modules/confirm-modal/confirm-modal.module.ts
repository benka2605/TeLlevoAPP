import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../Components/confirm-modal/confirm-modal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    IonicModule // Asegúrate de importar IonicModule aquí
  ]
})
export class ConfirmModalModule { }
