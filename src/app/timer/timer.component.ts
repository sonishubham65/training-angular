import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor(
    private socketService: SocketService
  ) { }

  timer;
  color;
  ngOnInit(): void {
    this.socketService.timer().subscribe(payload => {
      this.timer = payload
    })
    this.socketService.color().subscribe(payload => {
      this.color = payload
    })
  }

}
