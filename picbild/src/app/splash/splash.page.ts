import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  splash = true;

  constructor( private navCtrl: NavController ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    if (!this.splash) {
      this.navCtrl.navigateForward('/login');
    }
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.splash = false;
      this.navCtrl.navigateForward('/login');
    }, 4000);
  }

}
