import { Component } from '@angular/core';

@Component({
  selector: 'app-section2',
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.scss']
})
export class Section2Component {
  val = true;
  val1 = false;
  val2 = false;
  val3 = false;

  getClass() {
    this.val = true
    this.val1 = false
    this.val2 = false
    this.val3 = false
  }
  changeView() {
    return this.val ? {active: true,} : {none: true}
  }
// #########
  getClass1() {
    this.val = false
    this.val1 = true
    this.val2 = false
    this.val3 = false
  }
  changeView1() {
    return this.val1 ? {active1: true} : {none1: true}
  }
// ######
  getClass2() {
    this.val = false
    this.val1 = false
    this.val2 = true
    this.val3 = false
  }
  changeView2() {
    return this.val2 ? {active2: true} : {none2: true}
  }
// ######
  getClass3() {
    this.val = false
    this.val1 = false
    this.val2 = false
    this.val3 = true
  }
  changeView3() {
    return this.val3 ? {active3: true} : {none3: true}
  }
}
