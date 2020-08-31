import { Component } from '@angular/core';
import { TimerService } from './services/timer.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'app';
  constructor(
    private timerService: TimerService
  ) {

  }
}
