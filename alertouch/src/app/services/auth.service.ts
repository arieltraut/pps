import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController,  ToastController } from '@ionic/angular';
import { EmailValidator } from '@angular/forms';

export interface MessagesIndex {
  [index: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user;
  public keyWord: string;

  errorMessages = {
    'invalid-argument': 'Se ha ingresado un argumento invalido.',
    'invalid-disabled-field': 'El valor ingrsado para la propiedad de usuario es invalido.',
    'user-not-found' : 'No existe ningun registro del usuario.',
    'email-already-exists' : 'Ya existe un usuario registrado con ese email.',
    'email-already-in-use' : 'Ya existe un usuario registrado con ese email.',
    'wrong-password' : 'La contraseña que ha ingresado es invalida.'

     /* ADD HERE THE OTHERs IDs AND THE CORRESPONDING MESSAGEs */

  } as MessagesIndex;


  constructor(  private navCtrl: NavController,
                public toastController: ToastController,
                private afAuth: AngularFireAuth,
                ) {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        // this.navCtrl.navigateRoot(['/home']);
      } else {
        this.navCtrl.navigateRoot(['']);
      }
    });
   }



   async login(email: string, password: string) {
     await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
       console.log(success);
       this.navCtrl.navigateRoot(['/home']);

       this.keyWord = password;
       // this.creoToast(true, 'Autenticación exitosa.');
     }).catch((error) => { console.log(error);
                           this.creoToast(false, 'Usuario/contraseña incorrectos.');
    });
   }





   async creoToast(rta: boolean, mensaje: string) {

    if (rta == true) {
      const toast = await this.toastController.create({
        message: mensaje,
        color: 'success',
        position: 'top',
        duration: 2000
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: mensaje,
        color: 'dark',
        position: 'top',
        duration: 2000 ,
        buttons: [
          {
            text: 'Cerrar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }
  }


   async singup(email: string, password: string) {
     await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((success) => {
       console.log(success);
       // Here we need to get additional user details and save them in a DB under uid
       // from success.user.uid
       this.creoToast(true, 'Registración exitosa.');
     }).catch((error) => {
      this.creoToast(false, 'Fallo al registrarse.');
      console.log(error);
     });
   }


   async logout() {
     await this.afAuth.auth.signOut().then(() => {
      console.log('Logged Out');
     }).catch((error) => {
       console.log(error);
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

