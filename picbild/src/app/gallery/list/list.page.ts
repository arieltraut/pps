import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {
  private postsSub: Subscription;
  isLoading = false;
  posts: Post[] = [];
  featured: Post;
  type = '';
  user: User;

  constructor( private database: DatabaseService,
               private auth: AuthenticateService,
               public navCtrl: NavController,
               private route: ActivatedRoute,
               public alertController: AlertController ) { }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('user-bd'));
    Plugins.Storage.get({ key: 'user-bd' }).then(
      (userData) => {
        this.user = JSON.parse(userData.value);
      }, () => {
        this.navCtrl.navigateBack('');
      }
    );

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('type')) {
        this.navCtrl.navigateBack('/gallery');
        return;
      }
      this.isLoading = true;
      this.type = paramMap.get('type');
      this.postsSub = this.database.TraerTodos('picbild-posts').subscribe(posts => {
        this.posts = posts.filter(p => p.type === this.type).sort((a, b) => b.date.localeCompare(a.date));
        console.log(this.posts);

        this.featured = this.posts.reduce((prev, current) => {
          return (prev.votes && prev.votes.length ? prev.votes.length : 0) >
           (current.votes && current.votes.length ? current.votes.length : 0) ? prev : current;
        });
        if ( !this.featured.votes.length || this.featured.votes.length === 0 ) {
          this.featured = this.posts[0];
        }
        this.isLoading = false;
      });
    });
  }




  onCreate() {
    // this.database.AgregarUno(
    //   JSON.parse(JSON.stringify(
    //     new Post(
    //     { date: new Date(),
    //       imageUrl: '',
    //       title: 'prueba',
    //       type: this.type,
    //       user: JSON.parse(JSON.stringify(this.user)),
    //       votes: []
    //     }))), 'picbild-posts').then((resp) => console.log(resp));
  }


  logout() {
    this.auth.logoutUser()
    .then(res => {
      console.log(res);
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


  ngOnDestroy() {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }

}
