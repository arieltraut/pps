import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ActionSheetController,

  LoadingController   } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  splash = true;
  spinner = false;
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

  constructor(
    public modelController: ModalController,
    public authService: AuthService,
    public actionSheetController: ActionSheetController
  ) {
    this.loginForm = new FormGroup({
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

  ngOnInit() {
  }


  ionViewDidEnter() {
    setTimeout(() => this.splash = false, 4000);
  }

  async login() {
    this.spinner = true;
    this.authService.login(this.loginForm.value['email'], this.loginForm.value['password'])
    .then( () => { this.spinner = false; });
  }

  async creoSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ingresar como ...',
      cssClass: 'actSheet',
        buttons: [{
        text: 'admin',
        icon: 'build',
        handler: () => {
          this.loginForm.patchValue({email: 'admin@admin.com', password: '111111'});
        }
      }, {
        text: 'invitado',
        icon: 'beer',
        handler: () => {
          this.loginForm.patchValue({email: 'invitado@invitado.com', password: '222222'});
        }
      }, {
        text: 'usuario',
        icon: 'person',
        handler: () => {
          this.loginForm.patchValue({email: 'usuario@usuario.com', password: '333333'});
        }
      }, {
        text: 'anonimo',
        icon: 'eye-off',
        handler: () => {
          this.loginForm.patchValue({email: 'anonimo@anonimo.com', password: '444444'});
        }
      }, {
        text: 'tester',
        icon: 'bug',
        handler: () => {
          this.loginForm.patchValue({email: 'tester@tester.com', password: '555555'});
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'btnCancel',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
  }
}
