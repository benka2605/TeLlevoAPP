import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() destino: string;

  constructor(private modalCtrl: ModalController) {}

  async confirmar() {
    await this.modalCtrl.dismiss({ confirmado: true });
  }

  async cancelar() {
    await this.modalCtrl.dismiss({ confirmado: false });
  }
}
