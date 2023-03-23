#### angular js

장점

- 컴파일 속도가 빠르다
- MVC 패턴 개발이 가능하여 서버의 작업을 줄임
- 데이터 바인딩 기능으로 동적 웹 페이지를 손쉽게 구성
- UI 화면들을 재 사용할 수 있어 작업 생산성이 올라감
- 양방향 데이터 바인딩으로 유지보수 용이



angular cli 설치하기

```
npm install -g @angular/cli
```

개발 단계 들어가기

```
ng new my-app
```

클라이언트 서버 확인하기

```
cd my-app
ng serve --open
```

ANGULAR 구조

- Component
- Template
- Directive
- Service
- Module



Angular 프로젝트를 생성하면 기본적으로 만들어지는 모듈과 컴포넌트가 있다.

모듈

- app-routing.module.ts
- app.module.ts

컴포넌트

- app.component.html
- app.component.scss
- app.component.ts
- app.component.spec.ts

<hr>

#### 구성 요소 생성 방법

##### 생성할 구성 요소 -> 명령어

<hr>

컴포넌트 -> ng generate component<컴포넌트 이름>

디렉티브 -> ng generate directive<디렉티브 이름>

서비스 -> ng generate service<서비스 이름>

모듈     -> ng gererate module<모듈 이름>



##### 컴포넌트 ㄹㅇ 로직

app.component.ts를 보면

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
```

이중, @(데코레이터)안 오브젝트 구조를 잘 보아야 함.

- selector: HTML 템플릿의 이름이며, 다른 템플릿에서 <app-root></app-root> 와 같이 html 이름으로 import 가능
- templateUrl: 해당 컴포넌트의 HTML 템플릿과 매핑
- styleUrl: 해당 컴포넌트 스타일 파일과 매핑

##### Service

서비스는 주로 쿠키나 스토리지, 채널톡, 카카오톡 상담, 모달 등 어느 컴포넌트든 사용할 수 있는 공통로직을 작성

```
@Injectable()
export class ExampleService {
  // ...
}
```

그리고 @Injectable 데코레이터틀 작성하여 데이터 공유 클래스와 비즈니스 로직으로 동시에 사용 가능하다.



##### Directive

Angular가 제공하는 디렉티브는 어트리뷰트 디렉티브(Attribute Directive)와 구조 디렉티브(Structural Directive)로 나뉜다.



디렉티브는 DOM의 모든 것을 직접 관리할 수 있다. HTML 요소 또는 어트리뷰트의 형태로 사용하여 디렉티브가 사용된 요소에게 무언가를 하라는 지시(directive)를 전달한다. 디렉티브는 프로젝트 전역에서 사용할 수 있는 공통 관심사를 컴포넌트에서 분리한 것으로 구현하여 컴포넌트의 복잡도를 낮추고 가독성을 향상시킨다.



##### 어트리뷰트 디렉티브

- NgClass: CSS 클래스 추가/제거
- NgStyle: HTML 스타일 추가/제거
- NgModel: HTML 폼 요소에 양방향 데이터 바인딩 추가

##### 구조 디렉티브

- NgIf: 조건에 따라 DOM에 추가/제거
- NgFor: 배열 항목마다 DOM에 추가
- NgSwitch: 조건에 맞는 것을 선택해서 DOM에 추가



[(ngModel)] -> angular의 양방향 바인딩 문법

```typescript
//ex
<input id="name" [(ngModel)]="hero.name" placeholder="name">
```



https://angular.kr/tutorial/toh-pt1

AppModule

양방향 바인딩 문법인 [(ngModel)]을 이용하기 위해선 최상위 ts 파일인 app.module.ts 에 ngModel을 포함하는 FormsModule을 선언해함!



```typescript
import { NgModule } from '@angular/core';
// FormsModule을 선언
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    // 요기에 FormsModule을 직접 선언
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

선언 이후엔, ngModel(양방향 바인딩 문법)을 사용 가능



##### ngFor

- angular에서 사용되는 for문 또는 map 문법

- ```typescript
  *ngFor="let 데이터 of 데이터배열" 

  //데이터배열의 데이터를 하나씩 보여준다
  // 이중 데이터 배열은 해당 component.ts에 선언되있는 것에 한함
  ```

##### 이벤트

- 이벤트를 넣는법

- ```typescript
  <button type="button" (click)="onSelect(hero)">
  ```

- ```typescript
  // 컴포넌트에 클릭이벤트 발생시 핸들러를 추가해주어야함
  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  ```



##### ngIf

- angular에서 사용되는 제어문

- ```typescript
  *ngIf ="True값"
  ```



##### 이벤트 발생시 css 클래스 변환

```typescript
[class.selected]="hero === selectedHero"
```



```typescript
<li *ngFor="let hero of heroes">
  <button [class.selected]="hero === selectedHero" type="button" (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span>
    <span class="name">{{hero.name}}</span>
  </button>
</li>
```



##### 각 컴포넌트 사이에서 데이터 바인딩 하는법

```typescript
import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})


export class HeroDetailComponent {
  // export 할 
  @Input() hero?: Hero;
}

```

```html
// selectedHero 값을 hero라는 변수에 넣어서 할당 시킨다
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

```typescript
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

```

```html
// 이후엔 html 내 인자값으로 사용 가능
<div *ngIf="hero">

  <h2>{{hero.name | uppercase}} Details</h2>
  <div><span>id: </span>{{hero.id}}</div>
  <div>
    <label for="hero-name">Hero name: </label>
    <input id="hero-name" [(ngModel)]="hero.name" placeholder="name">
  </div>

</div>

```



#### Service

- 웹서비스, 로컬 저장소 또는 모의 데이터 소스와 같은 모든 위치에서 데이터를 가져올 수 있는 기능


- 구성 요소에서 데이터 액세스를 제거하면 구성 요소를 건드리지 않고도 언제든지 구현에 대한 마음을 바꿀 수 있습니다.