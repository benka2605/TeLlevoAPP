import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth,private firestore:AngularFirestore) { }

  login(email: string, password: string) { 
    return this.afAuth.signInWithEmailAndPassword(email, password); 
  }

  logout() {
    return this.afAuth.signOut(); 
  }

  register(email: string, password: string, usuario:string,rol:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      userCredential.user?.updateProfile({
        displayName:usuario
      });
      return this.firestore.collection('users').doc(userCredential.user?.uid).set({
        uid: userCredential.user?.uid,
        email:email,
        usuario:usuario,
        rol:rol
      });
    });
  }

  getAuthState() {
    return this.afAuth.authState; 
  }

  resetPassword(email:string){
    return this.afAuth.sendPasswordResetEmail(email).then(() => {
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  
}
