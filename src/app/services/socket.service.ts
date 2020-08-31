import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket;
  constructor() {
    this.socket = io(environment.api_url);
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
