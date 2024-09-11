import { Component, OnInit } from '@angular/core';
import { viajes } from '../model/viajes';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  usuario:string=''

  arreglo:viajes[]
  constructor() { }

  ngOnInit() {
    this.usuario=localStorage.getItem("usuario") ?? ''

    this.arreglo=JSON.parse(localStorage.getItem("viajes") ?? '')
    
  }

}
