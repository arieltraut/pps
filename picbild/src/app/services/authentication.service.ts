import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

export interface MessagesIndex {
  [index: string]: string;
}

@Injectable()
export class AuthenticateService {

  userData: any; // Save logged in user data

  errorMessages = {
    'invalid-argument': 'Se ha ingresado un argumento invalido.',
    'invalid-disabled-field': 'El valor ingrsado para la propiedad de usuario es invalido.',
    'user-not-found' : 'No existe ningun registro del usuario.',
    'email-already-exists' : 'Ya existe un usuario registrado con ese email.',
    'email-already-in-use' : 'Ya existe un usuario registrado con ese email.',
    'wrong-password' : 'La contraseña que ha ingresado es invalida.'

     /* ADD HERE THE OTHERs IDs AND THE CORRESPONDING MESSAGEs */

  } as MessagesIndex;


  constructor( public afAuth: AngularFireAuth,
               public miServ: DatabaseService,
               private router: Router ) {

    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     // this.logeado = user;
    //     // this.userData = user;
    //     // console.log('usuario es: ' + this.userData);

    //     // this.userData = user;
    //     // localStorage.setItem('user', JSON.stringify(user));
    //     // JSON.parse(localStorage.getItem('user'));

    //     this.saveInStorage(user);

    //   } else {
    //     Plugins.Storage.remove({key: 'user-bd'});
    //   }
    // });
  }


  registerUser(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       result => {
          if (result) {
            this.miServ.AgregarUno({
              profile: 'User',
              gender: 'Female',
              id: result.user.uid,
              email: result.user.email}, 'users');
          }
          resolve(result);
       },
       err => reject(err)
      );
   });
  }


  loginUser(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => {
        resolve(this.saveInStorage(res.user));
       },
       err => reject(err));
   });
  }


  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
        .then(() => {
          // console.log('LOG Out');
          localStorage.removeItem('user');
          // localStorage.removeItem('user-bd');
          Plugins.Storage.remove({key: 'user-bd'});
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    });
  }


  userDetails() {
    return firebase.auth().currentUser;
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
