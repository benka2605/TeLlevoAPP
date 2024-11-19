import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyAe8Frg6s-1vYdxxlxf4Q6vJQZ-79d51k4",

  authDomain: "tellevoapp-4bed1.firebaseapp.com",

  projectId: "tellevoapp-4bed1",

  storageBucket: "tellevoapp-4bed1.appspot.com",

  messagingSenderId: "619856956350",

  appId: "1:619856956350:web:02af4c5619754f6ba107ef"

}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor() { }

  async listarUsuarios(usuario:string):Promise<boolean>{
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
      if (usuario = doc.data()["usuario"]){
        return true
      }
    }
    return false
  }
}
