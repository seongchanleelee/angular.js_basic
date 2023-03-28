import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.scss' ]
})
export class HeroSearchComponent implements OnInit {
  // heroes$ 선언
  heroes$!: Observable<Hero[]>;
  // Subject는 관찰 가능한 값의 소스이자 Observable 자체
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // .next(인자)는 Observable이 보낼 수 있는 유형중 하나인데, 전달된 각 값에 대한 핸들러로 실행이 시작된 후 0번 이상 호출되는 녀석
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {


    this.heroes$ = this.searchTerms.pipe(
      //300ms마다 http에 search 요청
      debounceTime(300),

      // 텍스트가 변할 때만 요청 전송
      distinctUntilChanged(),

      // 동과하는 각 검색어에 대해 검색 서비스를 호출함
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
