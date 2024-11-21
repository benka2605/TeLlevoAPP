import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth()
  constructor(private afAuth: AngularFireAuth,private firestore:AngularFirestore) { }

  login(email: string, password: string,remember:boolean):Promise<any>{
    const persistence = remember ? browserLocalPersistence : browserSessionPersistence;
      return setPersistence(this.auth,persistence).then(()=>{
      return signInWithEmailAndPassword(this.auth,email,password).then((userCredential)=>{
        const user = userCredential.user; 
        return user;
      })
    })
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

  isAuthenticated():boolean {
    const user = this.afAuth.authState;
    return user !== null;
  }

  getAuthState(){
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
function then(arg0: () => any) {
  throw new Error('Function not implemented.');
}

