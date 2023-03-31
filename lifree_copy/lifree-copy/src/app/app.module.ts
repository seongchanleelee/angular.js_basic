import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Section1Component } from './service-section/section1/section1.component';
import { Section2Component } from './service-section/section2/section2.component';
import { Section3Component } from './service-section/section3/section3.component';
import { Section4Component } from './service-section/section4/section4.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IntroSection1Component } from './intro/intro-section1/intro-section1.component'
import { IntroSection2Component } from './intro/intro-section2/intro-section2.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    Section4Component,
    IntroSection1Component,
    IntroSection2Component

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
