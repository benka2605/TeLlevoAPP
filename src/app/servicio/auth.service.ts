import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signOut, signInWithPopup, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth()
  private provider = new GoogleAuthProvider()
  constructor(private afAuth: AngularFireAuth,private firestore:AngularFirestore) { }

  login(email: string, password: string,remember:boolean):Promise<any>{
    if (remember){
      return setPersistence(this.auth,browserLocalPersistence).then(()=>{
        return signInWithEmailAndPassword(this.auth,email,password).then((userCrendential)=>{
          const user = userCrendential.user;
          return user;
        })
      })
    } else {
      return setPersistence(this.auth,browserSessionPersistence).then(()=>{
        return signInWithEmailAndPassword(this.auth,email,password).then((userCredential)=>{
          const user = userCredential.user;
          return user
        })
      })
    }
  }

  loginGoogle(){
    return signInWithPopup(this.auth,this.provider).then((result)=>{
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
    })
  }

  logout() {
    return signOut(this.auth)
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

  estado(){
    return onAuthStateChanged(this.auth,((user)=>{
      if(user){
        return console.log('si')
      } else {
        return console.log('no')
      }
    }))
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

