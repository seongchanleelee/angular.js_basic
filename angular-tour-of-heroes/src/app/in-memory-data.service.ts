import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Hero } from './hero'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes}
  }


  //히어로 객체가 항상 id 프로퍼티를 갖도록 getId 메소드를 오버라이드
  // 히어러 목록이 비어있다면, 11을 반환
  // 비어있지 않다면 히어로 id의 최대값에 1을 더해서 반환
  getId(heroes: Hero[]): number {
    return heroes.length > 0? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

}
