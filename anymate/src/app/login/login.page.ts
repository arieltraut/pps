import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, ActionSheetController, LoadingController, ToastController } from '@ionic/angular';

import { MessagesIndex } from '../services/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(

    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController,
    public toastController: ToastController

  ) { }

  validations_form: FormGroup;
  errorMessage = '';
  splash = true;
  fade = false;

   validation_messages = {
    email: [
      { type: 'required', message: 'El email es un campo requerido.' },
      { type: 'pattern', message: 'Por favor ingrese un email válido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es un campo requerido.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' }
    ]
  };

  ngOnInit() {


    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  ionViewDidEnter() {
    setTimeout(() => this.fade = true, 4000);
  }


  loginUser(value) {
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Iniciando sesión...' })
    .then(loadingEl => {
      loadingEl.present();
      this.authService.SignIn(value.email, value.password)
      .then(res => {
        console.log(res);
        this.authService.saveInStorage(res.user)
        .then(message => {
          console.log(message);
          this.errorMessage = '';
          this.loadingCtrl.dismiss();
          this.navCtrl.navigateForward('/tabs/animales');
        });
      }, err => {
        this.errorMessage =  this.authService.printErrorByCode (err.code);
        this.creoToast(false, this.errorMessage);
        this.loadingCtrl.dismiss();
        console.log(err.message);
      });
    });
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/registration');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'users',
      buttons: [{
        text: 'Admin',
        role: 'destructive',
        icon: 'build',
        handler: () => {
          this.validations_form.controls.email.setValue('admin@admin.com');
          this.validations_form.patchValue({ password: '111111' });
        }
      }, {
        text: 'Invitado',
        icon: 'beer',
        handler: () => {
          this.validations_form.patchValue({ email: 'invitado@invitado.com' });
          this.validations_form.patchValue({ password: '222222' });
        }
      }, {
        text: 'Usuario',
        icon: 'person',
        handler: () => {
          this.validations_form.patchValue({ email: 'usuario@usuario.com' });
          this.validations_form.patchValue({ password: '333333' });
        }
      }, {
        text: 'Anonimo',
        icon: 'eye-off',
        handler: () => {
          this.validations_form.patchValue({ email: 'anonimo@anonimo.com' });
          this.validations_form.patchValue({ password: '444444' });
        }
      }, {
        text: 'Tester',
        icon: 'bug',
        handler: () => {
          this.validations_form.patchValue({ email: 'tester@tester.com' });
          this.validations_form.patchValue({ password: '555555' });
        }
      }]
    });
    await actionSheet.present();
  }


  async creoToast(rta: boolean, mensaje: string) {

    if (rta === true) {
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

}
