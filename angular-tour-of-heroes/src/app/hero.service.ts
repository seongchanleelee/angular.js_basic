import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }

  // url에서 가져오기 위해 위 코드를 버리고 이렇게 변환
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes, []'))
      )
  }

  // 내장된 데이터를 이용하여 불러오는 법
  // getHero(id: number): Observable<Hero> {
  //   // id와 같은 녀석을 찾아 hero라는 변수로 만들어줌
  //   // ! 도 뭔가 있는 녀석임 왜 인진 모르겠는데 이녀석이 있어야 함수가 실행됨;;
  //   const hero = HEROES.find(h => h.id === id)!;
  //   this.messageService.add(`HeroService: fetched hero id = ${id}`);
  //   console.log(1111)
  //   return of(hero);
  // }

  // http를 이용하여 데이터를 서버에서 가져오는 방법
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id = ${hero.id}`)),
        catchError(this.handleError<any>('updateHero')),

      )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  deleteHero(id: number):Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id = ${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found heroes matching ${term}`):
          this.log(`no heroes matching "${term}"`),
          catchError(this.handleError<Hero[]>('searchHeroes', []))
          )
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }
  // 히어로 목록을 가져올 url 주소를 변수화함
  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }


}
