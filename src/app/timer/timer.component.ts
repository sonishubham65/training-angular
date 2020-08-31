import { Component, OnInit } from '@angular/core';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor(
    private timerService: TimerService
  ) { }

  timer;
  color;
  ngOnInit(): void {
    this.timerService.timer().subscribe(payload => {
      this.timer = payload
    })
    this.timerService.color().subscribe(payload => {
      this.color = payload
    })
  }

}
