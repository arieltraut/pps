import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Howl } from 'howler';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  animales: any[] = [
    {
      name: "Lion.name",
      species: "Lion.species",
      image: "Lion.image",
      sound: "Lion.sound"
    }, 
    {
      name: "Butterfly.name",
      species: "Butterfly.species",
      image: "Butterfly.image",
      sound: "Butterfly.sound"
    },
    {
      name: "Flamingo.name",
      species: "Flamingo.species",
      image: "Flamingo.image",
      sound: "Flamingo.sound"
    },
    {
      name: "Toucan.name",
      species: "Toucan.species",
      image: "Toucan.image",
      sound: "Toucan.sound"
    },
    {
      name: "Dog.name",
      species: "Dog.species",
      image: "Dog.image",
      sound: "Dog.sound"
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

  activeAnimal = null;
  player : Howl = null;
  isPlaying = false;
  
  constructor(
    private translateService: TranslateService,
    private navCtrl: NavController,
    private httpClient: HttpClient
    ) {}
  
    ngOnInit() {
    }
    
    playSound(animal){
      if(this.player){
        this.player.stop();
      }
      let soundPath;
      this.translateService.get(animal.sound).subscribe(
        value => {
          soundPath = value;
        }
      );
      this.player = new Howl({
        src: [soundPath],
        onplay:() =>  {
          console.log('onplay');
          this.isPlaying = true;
          this.activeAnimal = animal;
        },
        onend:() => {
          this.activeAnimal = null;
          console.log('onend');
        }
      });
      this.player.play();
    }

    togglePlayer(pause){
      this.isPlaying = !pause;
      if(pause){
        this.player.pause();
        this.activeAnimal = null;
      } else{
        this.player.play();
      }
    }

    start(animal, pause){
      this.playSound(animal);
      this.togglePlayer(pause);
    }

    changeLanguage(lang) {
      this.translateService.use(lang);
    }
  }
  