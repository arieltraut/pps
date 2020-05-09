import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit {

  animales: any[] = [
    {
      name: ' ',
      species: 'Lion.species',
      image: 'assets/images/animals/200x50.png',
      sound: 'Lion.sound'
    },
    {
      name: 'Nightingale.name',
      species: 'Nightingale.species',
      image: 'assets/images/animals/nightingale.png',
      sound: 'Nightingale.sound'
    },
    {
      name: 'Whale.name',
      species: 'Whale.species',
      image: 'assets/images/animals/whale.png',
      sound: 'Whale.sound'
    },
    {
      name: 'Owl.name',
      species: 'Owl.species',
      image: 'assets/images/animals/owl2.png', // arriba de tiger
      sound: 'Owl.sound'
    },
    {
      name: 'Tiger.name',
      species: 'Tiger.species',
      image: 'assets/images/animals/tiger.png',
      sound: 'Tiger.sound'
    },
    {
      name: 'Quetzal.name',
      species: 'Quetzal.species',
      image: 'assets/images/animals/quetzal.png',
      sound: 'Quetzal.sound'
    },
    {
      name: 'Peacock.name',
      species: 'Peacock.species',
      image: 'assets/images/animals/peacock.png',
      sound: 'Peacock.sound'
    },
    {
      name: ' ',
      species: 'Flamingo.species',
      image: 'assets/images/animals/100x70.png',
      sound: 'Flamingo.sound'
    },
    {
      name: 'Squirrel.name',
      species: 'Squirrel.species',
      image: 'assets/images/animals/squirel.png', // arriba de fox
      sound: 'Squirrel.sound'
    },
    {
      name: 'Fox.name',
      species: 'Fox.species',
      image: 'assets/images/animals/fox.png',
      sound: 'Fox.sound'
    },
  ];

  activeAnimal = null;
  player: Howl = null;
  isPlaying = false;
  animation;

  constructor(
    private translateService: TranslateService,
    private animationCtrl: AnimationController
    ) {}

    ngOnInit() {
    }


    playSound(animal, event) {
      console.log(event);
      // const target = event.target || event.srcElement || event.currentTarget;
      // var idAttr = target.attributes.id;
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
      this.translateService.get(animal.sound).subscribe(
        value => {
          soundPath = value;
        }
      );
      this.player = new Howl({
        src: [soundPath],
        onplay: () =>  {
          console.log('onplay');
          this.isPlaying = true;
          this.activeAnimal = animal;
        },
        onend: () => {
          this.activeAnimal = null;
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
        this.activeAnimal = null;
      } else {
        this.player.play();
      }
    }


    // start(animal, pause) {
    //   this.playSound(animal);
    //   this.togglePlayer(pause);
    // }


    

  }
