import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {

  private postSub: Subscription;
  isLoading = false;
  postId = '';
  post: Post;
  // type: '';
  user: User;
  voted = false;

  constructor(  private route: ActivatedRoute,
                public navCtrl: NavController,
                private database: DatabaseService ) { }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('user-bd'));
    Plugins.Storage.get({ key: 'user-bd' }).then(
      (userData) => {
        this.user = JSON.parse(userData.value);
      }, () => {
        this.navCtrl.navigateBack('login');
      }
    );


    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('postId')) {
        this.navCtrl.navigateBack('/gallery');
        return;
      }
      this.isLoading = true;
      this.postId = paramMap.get('postId');
      this.database.TraerUno('picbild-posts', this.postId).then(post => {
        // console.log('este es el post ' + JSON.stringify(post));
        this.post = post;
        this.voted = (this.post.votes || this.post.votes.length < 1) ? this.post.votes.includes(this.user.id) : false;
        this.isLoading = false;
      });
    });
  }



  onVote() {
    if (!this.post.votes) { this.post.votes = []; }
    this.post.votes.push(this.user.id);
    console.log(this.post);
    this.database.ModificarUno(JSON.parse(JSON.stringify(this.post)), 'picbild-posts')
    .then( () => {
      this.voted = true;
    });
  }

  onCancelVote() {
    const index = this.post.votes.indexOf(this.user.id);
    if (index > -1) {
      this.post.votes.splice(index);
      this.database.ModificarUno(JSON.parse(JSON.stringify(this.post)), 'picbild-posts')
      .then( () => {
        this.voted = false;
      });
    }
  }


  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }




}
