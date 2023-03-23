import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

// 표현할 hero라는 값은 Hero라는 type에 맞춰야 하고, 들어온다면 그 값은 이제 이 폴더 내에서 사용 가능한 변수가 됨(바인딩 절차)
export class HeroDetailComponent {
  // 내보낼 인자 값을 선언
  @Input() hero?: Hero;

}
