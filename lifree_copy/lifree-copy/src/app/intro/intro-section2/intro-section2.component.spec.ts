import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSection2Component } from './intro-section2.component';

describe('IntroSection2Component', () => {
  let component: IntroSection2Component;
  let fixture: ComponentFixture<IntroSection2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroSection2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroSection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
