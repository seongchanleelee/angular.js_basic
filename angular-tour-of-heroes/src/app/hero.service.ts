import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // id와 같은 녀석을 찾아 hero라는 변수로 만들어줌
    // ! 도 뭔가 있는 녀석임 왜 인진 모르겠는데 이녀석이 있어야 함수가 실행됨;;
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id = ${id}`);
    console.log(1111)
    return of(hero);
  }

}
