import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from './user.model';
import { MessagesIndex } from './user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { DatabaseService } from './database.service';
import { Plugins } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any;

errorMessages = {
  'invalid-argument': 'Se ha ingresado un argumento invalido.',
  'invalid-disabled-field': 'El valor ingrsado para la propiedad de usuario es invalido.',
  'user-not-found' : 'No existe ningun registro del usuario.',
  'email-already-exists' : 'Ya existe un usuario registrado con ese email.',
  'email-already-in-use' : 'Ya existe un usuario registrado con ese email.',
  'wrong-password' : 'La contraseña que ha ingresado es invalida.'

   /* ADD HERE THE OTHERs IDs AND THE CORRESPONDING MESSAGEs */

} as MessagesIndex;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public miServ: DatabaseService
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

   // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
      //  this.ngZone.run(() => {
      //     this.router.navigate(['dashboard']);
      //   });
      //  this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }


  saveInStorage(user) {
    return new Promise((resolve, reject) => {
      this.miServ.TraerUno('users', user.uid)
      .then(result => {
        Plugins.Storage.set({ key: 'user-bd', value: JSON.stringify(result) });
        resolve('saved in Storage');
        // JSON.parse(localStorage.getItem('user-bd'));
        // this.router.navigate(['gallery']); // navegar de aca es una negrada
      });
    });
  }




  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }

// translate errors
public printErrorByCode(code: string): string {
  code = code.split('/')[1];
  if (this.errorMessages[code]) {
      return (this.errorMessages[code]);
  } else {
      return ('Ha ocurrido un error desconocido. \n Código del error:: ' + code);
  }
}

}
