import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.page.html',
  styleUrls: ['./colores.page.scss'],
})
export class ColoresPage implements OnInit {
  colores: any[] = [
    {
      name: 'Blue.name',
      image: 'assets/images/colors/blue.svg',
      sound: 'Blue.sound',
      type: 'Blue.type'
    },
    {
      name: 'Green.name',
      image: 'assets/images/colors/green.svg',
      sound: 'Green.sound',
      type: 'Green.type'
    },
    {
      name: 'Red.name',
      image: 'assets/images/colors/red.svg',
      sound: 'Red.sound',
      type: 'Red.type'
    },
    {
      name: 'Violet.name',
      image: 'assets/images/colors/violet.svg',
      sound: 'Violet.sound',
      type: 'Violet.type'
    },
    {
      name: 'Yellow.name',
      image: 'assets/images/colors/yellow.svg',
      sound: 'Yellow.sound',
      type: 'Yellow.type'
    },
    {
      name: 'Pink.name',
      image: 'assets/images/colors/yellow.svg',
      sound: 'Pink.sound',
      type: 'Pink.type'
    },
    {
      name: 'Orange.name',
      image: 'assets/images/colors/orange.svg',
      sound: 'Orange.sound',
      type: 'Orange.type'
    },
    {
      name: 'Brown.name',
      image: 'assets/images/colors/brown.svg',
      sound: 'Brown.sound',
      type: 'Brown.type'
    }
  ];

  activeItem = null;
  player: Howl = null;
  isPlaying = false;
  animation;

  constructor(
    private translateService: TranslateService,
    private animationCtrl: AnimationController
    ) {}

    ngOnInit() {
    }

    playSound(item, event) {
      this.animation = this.animationCtrl.create()
      .addElement(event.target)
      .duration(1000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.2)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);

      if (this.player) {
        this.player.stop();
        this.animation.stop();
      }
      let soundPath;
      this.translateService.get(item.sound).subscribe(
        value => {
          soundPath = value;
        }
      );
      this.player = new Howl({
        src: [soundPath],
        onplay: () =>  {
          console.log('onplay');
          this.isPlaying = true;
          this.activeItem = item;
        },
        onend: () => {
          this.activeItem = null;
          console.log('onend');
        }
      });
      this.player.play();
      this.animation.play();
    }

    togglePlayer(pause) {
      this.isPlaying = !pause;
      if (pause) {
        this.player.pause();
        this.activeItem = null;
      } else {
        this.player.play();
      }
    }


  }
