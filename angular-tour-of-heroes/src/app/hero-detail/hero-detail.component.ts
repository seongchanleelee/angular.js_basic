// import { Component, Input } from '@angular/core';
// import { Hero } from '../hero';

// @Component({
//   selector: 'app-hero-detail',
//   templateUrl: './hero-detail.component.html',
//   styleUrls: ['./hero-detail.component.scss']
// })

// // 표현할 hero라는 값은 Hero라는 type에 맞춰야 하고, 들어온다면 그 값은 이제 이 폴더 내에서 사용 가능한 변수가 됨(바인딩 절차)
// export class HeroDetailComponent {
//   // 내보낼 인자 값을 선언
//   @Input() hero?: Hero;

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.scss' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    //경로 매개변수는 항상 문자열로 나오기 때문에 Number함수를 이용하여 숫자로 변경해줌
    //route.snapshot 은 구성요소가 생성된 직후, 경로 정보의 정적 이미지임.
    //paramMap은 URL에서 추출한 경로 매개변수 값의 사전임. 키는 가져올 영웅의 id를 반환함
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    // 이전 페이지로 돌아가는 코드
    this.location.back();
  }
  // 참고로, component.ts에선 return 값이 대부분 필요 없기 때문에 void를 이용하여 함수를 제작함 void를 이용하면 return을 하지 않아도 되기 때문
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }
}
