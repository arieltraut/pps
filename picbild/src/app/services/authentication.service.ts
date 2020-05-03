import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

@Injectable()
export class AuthenticateService {

  userData: any; // Save logged in user data


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


}
