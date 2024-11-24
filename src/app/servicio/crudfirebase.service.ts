import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {
  public uid :string=''
  constructor(private firestore:AngularFirestore) { }

  crearViaje (viaje:Viaje) {
    return this.firestore.collection('viaje').add(viaje).then(docID=>{
      console.log('Documento creado con ID:', docID.id);
      this.uid = docID.id
      localStorage.setItem('uid',this.uid)
    })
  }
  listarViajes():Observable<Viaje[]>{
    return this.firestore.collection<Viaje>('viaje').valueChanges({idField:'id'})
  }

  getDocuments(): Observable<any[]> {
    return this.firestore.collection('viaje').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as Object;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
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
  usuario:string;
  uid:string;
}