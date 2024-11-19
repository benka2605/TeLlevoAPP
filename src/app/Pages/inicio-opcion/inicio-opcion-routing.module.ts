import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioOpcionPage } from './inicio-opcion.page';

const routes: Routes = [
  {
    path: '',
    component: InicioOpcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioOpcionPageRoutingModule {}
