import { Component } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations'
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
        opacity: 0.1,
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

export class IntroSection1Component {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
