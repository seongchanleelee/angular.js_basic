import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSection1Component } from './intro-section1.component';

describe('IntroSection1Component', () => {
  let component: IntroSection1Component;
  let fixture: ComponentFixture<IntroSection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroSection1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
