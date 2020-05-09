import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
 

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {
 
 
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  timeLeft: number = 5;
  interval;
  success=0;
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'El email es un campo requerido.' },
      { type: 'pattern', message: 'Por favor ingrese un email valido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es un campo requerido.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' }
    ]
  };
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
 
  ngOnInit(){
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
 
  tryRegister(value){
    this.authService.RegisterUser(value.email, value.password)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.success = 1;
       this.successMessage = "Tu cuenta ha sido creada, serás redireccionado a la pagina de ingreso en ";
       this.startTimer();
     }, err => {
       console.log(err);
       this.errorMessage =  this.authService.printErrorByCode (err.code);
      console.log(err.message);
     })
  }
 
  goLoginPage(){
    this.navCtrl.navigateForward('');
  }

  

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 3;
        clearInterval(this.interval);
        this.navCtrl.navigateBack('');
      }
    },1000)
  }

}