import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  usuario:string=''
  constructor() { }

  ngOnInit() {
    this.usuario=localStorage.getItem("usuario") ?? ''
  }

}
