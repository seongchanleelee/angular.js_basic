// import { Component, OnInit } from '@angular/core';

// import { Hero } from '../hero';
// import { HeroService } from '../hero.service';
// import { MessageService } from '../message.service';

// @Component({
//   selector: 'app-heroes',
//   templateUrl: './heroes.component.html',
//   styleUrls: ['./heroes.component.scss']
// })
// export class HeroesComponent implements OnInit {

//   selectedHero?: Hero;

//   heroes: Hero[] = [];
//   constructor(private heroService: HeroService, private messageService: MessageService) { }

//   ngOnInit(): void {
//     this.getHeroes();
//   }

//   onSelect(hero: Hero): void {
//     this.selectedHero = hero;
//     this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
//   }

//   // Observable을 이용하지 않았을때 heroService.getHeroes를 반환하는 문법
//   // getHeroes(): void {
//   //   this.heroes = this.heroService.getHeroes();
//   // }

//   // Observable을 이용하였을 때, heroService.getHeroes를 반환하는 문법
//   getHeroes(): void {
//     this.heroService.getHeroes()
//       .subscribe(heroes => this.heroes = heroes)
//   }
// }


import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }


}
