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
- 서로 모르는 클래스 간에  정보를 공유할 수 있는 좋은 방법



```bash
ng generate service hero
```

```typescript
// hero.service.ts
// 초기 generate 했을 시 상태
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor() { }

}
```



```typescript
//Service는 웹서비스, 로컬 저장소 또는 모의 데이터 소스와 같은 모든 위치에서 영웅 데이터를 가져올 수 있음

// 1. 먼저 가져올 녀석을 변수화 시키기
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

//2.  이를 불러드릴 함수를 생성시키기
getHeroes(): Hero[] {
  return HEROES;
}

// 서비스를 제공하려면 인젝터에 등록이 되어야함.
// 기본적으로 root를 사용(대부분의 앱에서 애플리케이션 수준 인젝터임)
// 예외로, platform: 페이지의 모든 애플리케이션이 공유하는 특수 싱글톤 플랫폼 인젝터
//generate service 할 떄 자동으로 생성되니 크게 찾아보지 않아도 될듯
@Injectable({
  providedIn: 'root',
})

//3. hero.service를 이용할 heroes.component.ts에 선언해줌
import { HeroService } from '../hero.service'

// 4. heroes란 빈 배열 생성
heroes: Hero[] = [];

// 5. 사용할 변수를 주사함
constructor(private heroService: HeroService) {}

// 6. 서비스에 영웅을 검색하는 메서드를 작성
getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}

// 이 후 getHeroes()를 직접 호출할 수 있지만 이는 좋은 방법이 아님
// angular가 컴포넌트 초기화를 완료했다는 점을 전달하기 위해 존재하는 ngOnInit을 사용
// 설명하기 애매한데, react면 변경시 routing되게 끔 하는 로직이라 생각하면될듯?
// 초기 생성시 호출되는 router느낌
ngOnInit(): void {
  this.getHeroes();
}
```

##### RxJS 사용하기

- RxJS란 Observable을 제공하는 라이브러리
  - Observable이란, Array와 Promise 성질을 모두 가진 이벤트를 다루는 새로운 객체타입
  - array의 메소드(map, filter)와 같은 연산자를 제공하며 이를 통해 비동기 이벤트를 컬렉션 다루듯 사용할 수 있게 해줌



```typescript
// hero.service.ts

//1. Observable선언
import { Observable, of } from 'rxjs'

//2. Observable을 이용한 변수 선언으로 변경
// 기존
getHeroes(): Hero[] {
  return HEROES
}
// Observable을 이용
getHeroes(): Observable<Hero[]> {
  const heroes = of(HEROES);
  return heroes;
}

//3. 기존에 heroService의 데이터를 할당하는 문법도 바뀜
//기존
getHeroes(): void {
  this.heroes = this.heroService.getHeroes()
}
// Observable 객체를 가져왔을 때 변수에 할당하는 문법(subscribe를 사용)
getHeroes(): void {
  this.heroService.getHeroes()
  	.subscribe(heroes => this.heroes = heroes)
}
```



ㄹㅇ 로직2 

1. 데이터를 컴포넌트 끼리 움직일때, service를 이용함 이유는 service는 모든 웹서비스 , 로컬데이터 등등에서 가져올 수 있는 기능을 제공하기 때문
2. service to service간, service to component간 데이터 이동도 가능하며, 이를위해선
   1. 가져올 또는 보내줄 데이터에 대해 import 한다
   2. constructor에 service를 선언한다
   3. 참고로, 데이터를 html 태그와 바인딩 하기 위해선 속성이 public이어야함 private는 놉
   4. 이를 이전에 얘기된 문법을 이용하여 html에서 보여주면 됨



#### Routing 설정

1. ng generate module app-routing --flat --module=app

(1번은 아마 되있음. 초기에 프레임워크 제작 시, routing 설치 할꺼냐고 물음)

2. routing 할 component를 routing.module.ts에 선언함

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  {path: 'heroes', component: HeroesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
```



ㄹㅇ 로직

1. app-routing.module.ts에 컴포넌트를 가져옴

   ```typescript
   //app-routing.module.ts
   import { DashboardComponent } from './dashboard/dashboard.component';
   ```

2. route 변수에 {path, component 추가}

   ```typescript
   const route: Routes = [
     {path: 'dashboard', component: DashboardComponent}
   ]

   // 추가로, 공식문서에는 나와있지 않지만, 초기 routing 작업을 하는 것으로 제작 하였을 때, app.module.ts에 AppRoutingModule이 없을 수 있다. 그래서 추가해야함

   //app.module.ts
   import { AppRoutingModule } from './app-routing.module';
   ```

3. 만약 기본 경로로 추가하고 싶다면,  route 변수에 하나 더 추가

   ```typescript
   {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
   ```

4. 마지막으로 html에 링크 추가

   ```typescript
   <a routerLink="/dashboard">Dashboard</a>
   ```

5. Path 추가시 콜론을 이용하면 특정 자리 표시자로 이용 가능하다

   ```typescript
   //app-routing.module.ts
   {path: 'detail/:id', component: HeroDetailComponent}

   // html
   <a *ngFor="let hero of heroes" routerLink="/detail/{{hero.id}}">
     {{hero.name}} </a>
   ```

6. 라우팅 가능한 detail 페이지를 만들기

   - detail 페이지는 클릭시, 클릭한 id를 이용하여 정보를 조회하는 기능이 있어야함
   - 그러려면 id를 사용하여 HeroService에서 정보를 가져와야함

   ```typescript
   // 1. 우선 ActivatedRoute, HeroService및 Location를 불러옴
   // hero-detail.component.ts
   import { ActivatedRoute } from '@angular/router';
   import { Location } from '@angular/common';
   import { HeroService } from '../hero.service';

   // 2. import 해온 녀석들을 생성자에 삽입하여 해당 값을 개인 필드에 저장
   constructor(
     private route: ActivatedRoute,
     private heroService: HeroService,
     private location: Location
   ){}

   // 잠깐 설명
   ActivatedRoute는 인스턴스에 대한 경로에 대한 정보를 보유
   HeroService는 Hero 데이터를 가져오고 보여주기 위해 사용
   L

   // 3. 이 후, getHero라는 함수를 제작하여, id 라는 변수에 클릭시 들어가는 id 값을 할당시킴
   //hero-detail.component.ts

     getHero(): void {
       //경로 매개변수는 항상 문자열로 나오기 때문에 Number함수를 이용하여 숫자로 변경해줌
       //route.snapshot 은 구성요소가 생성된 직후, 경로 정보의 정적 이미지임.
       //paramMap은 URL에서 추출한 경로 매개변수 값의 사전임. 키는 가져올 영웅의 id를 반환함
       const id = Number(this.route.snapshot.paramMap.get('id'));
       this.heroService.getHero(id)
         .subscribe(hero => this.hero = hero);

   // 4. 위 함수내부를 보면 this.heroService.getHero(id) 가 있는데 이는 heroService에서 작성한 로직에서 데이터를 보내주어야 함을 인지시킨다.
   // hero.service.ts에 heroid를 찾는 로직 제작하기
   //hero.service.ts
   getHero(id: number): Observable<Hero> {
     // id와 같은 녀석을 찾아 hero라는 변수로 만들어줌
     // ! 도 뭔가 있는 녀석임 왜 인진 모르겠는데 이녀석이 있어야 함수가 실행됨;;
     const hero = HEROES.find(h => h.id === id)!;
     this.messageService.add(`HeroService: fetched hero id = ${id}`);
     console.log(1111)
     return of(hero);
     }
   }
   ```

   ```html
   // 5. 이 후, hero-detail.component.ts에 hero라는 변수로 할당된 값을 html에서 이용해 주면 됨
   // hero-detail.component.html
   <div *ngIf="hero">
     <h2>{{hero.name | uppercase}} Details</h2>
     <div><span>id: </span>{{hero.id}}</div>
     <div>
       <label for="hero-name">Hero name: </label>
       <input id="hero-name" [(ngModel)]="hero.name" placeholder="Hero name"/>
     </div>
     <button type="button" (click)="goBack()">go back</button>
   </div>

   ```

7. ​





#### 서버에서 데이터 받아오기

알아야 할 것 HttpClient

- HttpClient는 리모트 서버와 HTTP 통신을 하기위해 AnGULAR가 제공하는 서비스

- 어플리케이션 전역 범위에서 HttpClient를 사용하려면 아래와 같이 설정

- ```typescript
  //app.module.ts
  import { HttpClientModule } from '@angular/common/http';
  ```

- ```typescript
  //app.module.ts
  @NgModule({
    imports: [
      HttpClientModule,
    ],
  })
  ```

- 이 후, 튜토리얼을 진행하면서는 데이터를 통신할 서버가 존제하지 않아, 인-메모리 라는 WebApi를 이용하여 튜토리얼을 진행

#############################################################



튜토리얼상, InMemoryDataService를 http 데이터라 가정하고 진행

1. 데이터를 사용 할 service에 import 함

   ```typescript
   // hero.service.ts
   import { HttpClient, HttpHeaders } from '@angular/common/http';
   ```

2. constructor(생성자)에 주입시킴

   ```typescript
   constructor(
     private http: HttpClient,
     private messageService: MessageService) { }
   ```

3. 현 튜토리얼에서 자주 사용되는 MessageService를 heroService에서 webapi를 이용해 제작하기 위해 코드 작성

   ```typescript
   private log(message: string) {
       this.messageService.add(`HeroService: ${message}`)
     }

     private heroesUrl = 'api/heroes';
   ```

4. 기존에 히어로 목록을 불러오는 함수인 getHeroes()는 로컬 파일에 있는 데이터를 불러왔다. 하지만 지금부턴 http를 통한 데이터를 불러오는 연습을 해야 하 기 때문에 http를 이용하게 끔 변환

   ```typescript
   // 기존
   getHeroes(): Observable<Hero[]> {
     const heroes = of(HEROES);
     return heroes;
   }

   // 변환된 것
   /** GET heroes from the server */
   getHeroes(): Observable<Hero[]> {
     return this.http.get<Hero[]>(this.heroesUrl)
   }
   // HttpClient 메서드는 무언가의 RxJS를 반환함 (Observable 형태로 반환)
   // 여기서 참고. HttpClient.get()은 json 개체로 반환을 시켜주는데, 이것은 기본적으로 유형이 지정되어 있지 않기 때문에 Typescript를 이용하여 <Hero[]>를 이용하면 컴파일 시간동안 오류를 줄일 수 있다.
   ```

5. 원격 서버에서 데이터를 가져올 때 혹시 모를 **오류처리** 를 조심해야함. 오류를 포착하려면 RxJS 연산자를 통해 관찰 가능한 결과를 "파이핑"해야함

   ```typescript
   //1. 오류처리를 위해 선언
   // hero.service.ts
   import { catchError, map, tap }from 'rxjs/operators'

   //2. 오류를 검출하기 위해 파이핑 제공
   // hero.service.ts
   getHeroes(): Observable<Hero[]> {
     return this.http.get<Hero[]>(this.heroesUrl)
     	.pipe(
     	catchError(this.handleError<Hero[]>('getHeroes, []))
     	)
   }
   // catchError()에서 오류를 가로채고, 오류를 오류 처리 기능에 전달함
   // handleError()메서드는 오류를 보고한 다음 프로그램이 계속 작동하도록 무해한 결과를 반환시킴
   // handleError는 메서드이니, 따로 제작해야함

   //3. handleError 메서드 제작
   private handleError<T>(operation = 'operation', result?: T) {
     return (error: any):Observable<T> => {
       this.log(`${operation} failed: ${error.message}`)
       return of(result as T)
     }
   }

   //4. tap() 연산자를 이용하여 getHeroes()메서드 제작
   // tap()은 관찰 가능한 값을 보고 해당 값으로 작업을 수행하고 전달함으로써 이 기능을 활성화 시킴
     getHeroes(): Observable<Hero[]> {
       return this.http.get<Hero[]>(this.heroesUrl)
         .pipe(
           tap(_ => this.log('fetched heroes')),
           catchError(this.handleError<Hero[]>('getHeroes, []'))
         )
     }

   //5. 이와 동일하지만 id를 이용하여 url:id형태로 id에 맞는 영웅의 데이터를 찾기
     getHero(id: number): Observable<Hero> {
       const url = `${this.heroesUrl}/${id}`;
       return this.http.get<Hero>(url)
         .pipe(
           tap(_ => this.log(`fetched hero id=${id}`)),
           catchError(this.handleError<Hero>(`getHero id=${id}`))
         );
     }
   ```



#### 영웅 업데이트

1. 버튼 제작

   ```html
   <button type="button" (click)="save()">save</button>
   ```

2. 함수제작

   ```typescript
   save(): void {
     if (this.hero) {
       this.heroService.updateHero(this.hero)
       	.subscribe(() => this.goBack())
     }
   }
   ```

3. updateHero 제작

   ```typescript
   // hero.service.ts
   updateHero(hero: Hero): Observable<any> {
       return this.http.put(this.heroesUrl, hero, this.httpOption)
         .pipe(
           tap(_ => this.log(`updated hero id = ${hero.id}`)),
           catchError(this.handleError<any>('updateHero'))
         )
     }
   `
   // 참조
   HttpClient.put()메서드는 세 가지 매개변수를 사용
   1. URL
   2. 이 경우 수정된 영웅인 업데이트 할 데이터
   3. 옵션

   위에서 사용된 옵션을 제작
   httpOptions = {
     header: new HttpHeaders({ 'Content-Type': 'application/json' })
   }
   ```



#### 새로운 영웅 추가

1. html 추가

   ```html
   <div>
     <label for="new-hero">Hero name: </label>
     <input id="new-hero" #heroName />

     <!-- (click) passes input value to add() and then clears the input -->
     <button type="button" class="add-button" (click)="add(heroName.value); heroName.value=''">
       Add hero
     </button>
   </div>
   ```

2. add 함수 추가

   ```typescript
   add(name: string): void {
     name = name.trim();
     if (!name) { return; }
     this.heroService.addHero({ name } as Hero)
       .subscribe(hero => {
         this.heroes.push(hero);
       });
   }
   ```

3. post를 위한 addHero함수 추가

   ```typescript
   /** POST: add a new hero to the server */
   addHero(hero: Hero): Observable<Hero> {
     return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
       tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
       catchError(this.handleError<Hero>('addHero'))
     );
   }
   ```



#### 영웅삭제

1. html 제작

   ```
   <button type="button" class="delete" title="delete hero"
     (click)="delete(hero)">x</button>
   ```

2. delete() 함수 제작

   ```
   delete(hero: Hero): void {
     this.heroes = htis.heroes.fliter(h => h != hero);
     this.heroService.deleteHero(hero.id).subscribe()
   }
   ```

3. deleteHero()함수 제작

   ```typescript
   deleteHero(id: number):Observable<Hero> {
       const url = `${this.heroesUrl}/${id}`;
       return this.http.delete<Hero>(url, this.httpOptions)
         .pipe(
           tap(_ => this.log(`deleted hero id = ${id}`)),
           catchError(this.handleError<Hero>('deleteHero'))
         )
     }
   ```



#### 이름으로 검색

1. 서비스에 searchHeroes 제작

   ```typescript
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
   ```

2. html 추가

   ```html
   <h2>Top Heroes</h2>
   <div class="heroes-menu">
     <a *ngFor="let hero of heroes" routerLink="/detail{{hero.id}}">{{hero.name}}</a>
   </div>

   <app-hero-search />

   ```

3. hero-search 제작

   ```bash
   ng generate component hero-search
   ```

4. html 제작

   ```
   <div id="search-component">
     <label for="search-box">Hero Search</label>
     <input #searchBox id="search-box" (input)="search(searchBox.value)" />
     <ul class="search-result">
       <li *ngFor="let hero of heroes$ | async">
         <a routerLink="/detail/{hero.id}">
           {{hero.name}}
         </a>
       </li>
     </ul>
   </div>

   <li *ngFor="let hero of heroes$ | async">
   // async: 영웅 목록을 반복하라는 문법

   ```

5. 컴포넌트 제작

   ```
   // hero-search.component.ts
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
     styleUrls: [ './hero-search.component.css' ]
   })
   export class HeroSearchComponent implements OnInit {
     heroes$!: Observable<Hero[]>;
     private searchTerms = new Subject<string>();

     constructor(private heroService: HeroService) {}

     // Push a search term into the observable stream.
     search(term: string): void {
       this.searchTerms.next(term);
     }

     ngOnInit(): void {
       this.heroes$ = this.searchTerms.pipe(
         // wait 300ms after each keystroke before considering the term
         debounceTime(300),

         // ignore new term if same as previous term
         distinctUntilChanged(),

         // switch to new search observable each time the term changes
         switchMap((term: string) => this.heroService.searchHeroes(term)),
       );
     }
   }

   ```

   ​

   ### tlqkf ㄹㅇ ROUTER 로직

   1. 컴포넌트를 생성한다

   2. app.module.ts에! RouterModule을 넣어준다!

      ```typescript
      import { Routes, RouterModule } from '@angular/router';

        imports: [
          BrowserModule,
          AppRoutingModule,
          BrowserAnimationsModule,
          RouterModule
        ],
      ```

      ​

   3. app-routing.module.ts에 **routing할 path와 component를 작성하여 넣어준다**

      ```typescript
      import { NgModule } from '@angular/core';
      import { RouterModule, Routes } from '@angular/router';
      import { IntroSection1Component } from './intro/intro-section1/intro-section1.component';
      import { Section1Component } from './section1/section1.component';
      const routes: Routes = [
        {path:'', redirectTo:'intro', pathMatch: 'full'},
        {path:'', component: IntroSection1Component},
        {path:'service', component: Section1Component},
      ];
      ```

   4. routing할 html에 <router-outlet>을 넣어준다



### 또 추가적으로 버튼 클릭시 routerLink로 옮기는 법

```html
	<li>
	  <a routerLink="">
        	회사소개
      </a>
    </li>
    <li>
      <a routerLink="service">
        서비스 소개
      </a>
    </li>

a태그를 만든 후 routerLink="app-routing.module.ts에서 작성한 path명"
을 달아준다
```

이거면 라우팅 끝



### 애니메이션 넣기

1. 애니메이션 모듈 활성화하기

   ```typescript
   //app.module.ts
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

   @NgModule({
     imports: [
       BrowserModule,
       BrowserAnimationsModule
     ],
     declarations: [ ],
     bootstrap: [ ]
   })
   export class AppModule { }

   ```

2. 컴포넌트 파일에 애니메이션 기능 로드하기

   ```
   //사용할 component.ts
   import { Component, HostBinding } from '@angular/core';
   import {
     trigger,
     state,
     style,
     animate,
     transition,
     // ...
   } from '@angular/animations';
   ```

3. 애니메이션 메타데이터 프로퍼티 추가하기

   ```typescript
   //사용할 component.ts
   @Component({
     selector: 'app-root',
     templateUrl: 'app.component.html',
     styleUrls: ['app.component.css'],
     animations: [
       // 애니메이션 트리거는 여기에 작성합니다.
     ]
   })
   ```

4. animations라는 배열에, **trigger** **state**  **style**  **transition** **animate** 넣고 정의하기

   ```typescript
   // 사용할 component.ts
   @Component({
     selector: 'app-intro-section1',
     animations: [
       trigger('openClose', [
         state('open', style({
           height: '200px',
           opacity: 1,
           backgroundColor: 'yellow'
         })),
         state('closed', style({
           height: '100px',
           opacity: 0.8,
           backgroundColor: 'blue'
         })),
         transition('open => closed', [
           animate('1s')
         ]),

         transition('closed => open', [
           animate('0.5s')
         ])
       ])
     ],
     templateUrl: './intro-section1.component.html',
     styleUrls: ['./intro-section1.component.scss'],

   })
   ```

5. html 템플릿과 연결하기

   ```html
   // 사용할 component.html
   <nav>
     <button type="button" (click)="toggle()">Toggle Open/Close</button>
   </nav>

   <div [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
     <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
   </div>

   // 형태는 <div>[@trigger이름]="표현식"<div>
   ```

6. 추가적으로 html과 양방향 바인딩을 하여, 에니메이션을 작동 할 수 있게함

   ```typescript
   // 사용할 component.ts
   export class IntroSection1Component {
     isOpen = true;

     toggle() {
       this.isOpen = !this.isOpen;
     }
   }
   ```

끝

