import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroSection1Component } from './intro/intro-section1/intro-section1.component';
import { Section1Component } from './service-section/section1/section1.component';
const routes: Routes = [
  {path:'', redirectTo:'intro', pathMatch: 'full'},
  {path:'', component: IntroSection1Component},
  {path:'service', component: Section1Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
