import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  constructor(private firestore:AngularFirestore) { }

  crearViaje (viaje:Viaje) {
    return this.firestore.collection('viaje').add(viaje)
  }
  listarViajes():Observable<Viaje[]>{
    return this.firestore.collection<Viaje>('viaje').valueChanges({idField:'id'})
  }
  // modificarViaje(id:any,viaje:Viaje){
  //   return this.firestore.collection('viaje').doc(id).update(viaje)
  // }
  modificarViaje(id: string, viaje: Viaje) {
    // Restar 1 a los disponibles
    const nuevosDisponibles = viaje.disponibles - 1;
    return this.firestore.collection('viaje').doc(id).update({ ...viaje, disponibles: nuevosDisponibles });
  }

  eliminarViaje(id:any){ 
    return this.firestore.collection('viaje').doc(id).delete();
  }
}


export interface Viaje{
  costo_persona:string;
  destino:string;
  disponibles:number;
  encuentro:string;
  ruta:{
    start : [number,number];
    end: [number,number];
    geojson:any;
  }
}