import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
  ];

  idioms: any[] = [
    {
      value: 'es',
      label: 'Español'
    },
    {
      value: 'en',
      label: 'Ingles'
    },
    {
      value: 'pt',
      label: 'Portugués'
    }
  ];

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private navCtrl: NavController,
    public alertController: AlertController
    ) {}

    ngOnInit() {
      Plugins.Storage.get({ key: 'user-bd' }).then(
        (userData) => {
          this.user = JSON.parse(userData.value);
        }, () => {
          this.navCtrl.navigateBack('');
        }
      );
    }


    changeLanguage(lang) {
      this.translateService.use(lang);
    }

    logout(){
      this.authService.SignOut()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
    }


    async presentAlertLogout() {
      const alert = await this.alertController.create({
        header: 'Cerrar sesión',
        message: 'Deseas cerrar la sesión?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'OK',
            handler: () => {
              this.logout();
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }
  }
