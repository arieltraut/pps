import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.page.html',
  styleUrls: ['./numeros.page.scss'],
})
export class NumerosPage implements OnInit {

  numeros: any[] = [
    {
      name: 'One.name',
      image: 'assets/images/numbers/one.svg',
      sound: 'One.sound'
    },
    {
      name: 'Two.name',
      image: 'assets/images/numbers/two.svg',
      sound: 'Two.sound'
    },
    {
      name: 'Three.name',
      image: 'assets/images/numbers/three.svg',
      sound: 'Three.sound'
    },
    {
      name: 'Four.name',
      image: 'assets/images/numbers/four.svg',
      sound: 'Four.sound'
    },
    {
      name: 'Five.name',
      image: 'assets/images/numbers/five.svg',
      sound: 'Five.sound'
    },
    {
      name: 'Six.name',
      image: 'assets/images/numbers/six.svg',
      sound: 'Six.sound'
    },
    {
      name: 'Seven.name',
      image: 'assets/images/numbers/seven.svg',
      sound: 'Seven.sound'
    },
    {
      name: 'Eight.name',
      image: 'assets/images/numbers/eight.svg',
      sound: 'Eight.sound'
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
