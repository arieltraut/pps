import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { User } from '../models/user';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  // userEmail: string;
  // user = {imageUrl: ''};
  user: User;

  constructor(
    public navCtrl: NavController,
    private authService: AuthenticateService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('user-bd'));
    Plugins.Storage.get({ key: 'user-bd' }).then(
      (userData) => {
        this.user = JSON.parse(userData.value);
      }, () => {
        this.navCtrl.navigateBack('login');
      }
    );
  }

  logout() {
    this.authService.logoutUser()
    .then(res => {
      // console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
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
