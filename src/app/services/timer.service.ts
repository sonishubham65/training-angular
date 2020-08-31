import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  socket;
  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', function () {
      console.log("connected..");
    });
    this.socket.on('disconnect', function () { });
  }
  timer() {
    return Observable.create(observer => {
      this.socket.on('timer', function (data) {
        observer.next(data);
      });
    })
  }
  color() {
    return Observable.create(observer => {
      this.socket.on('color', function (data) {
        observer.next(data);
      });
    })
  }
}
