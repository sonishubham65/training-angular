import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import io from 'socket.io-client';
import { ProfileService } from '../account/profile.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket;
  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {
    this.connect();
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
  disconnect() {
    this.socket.disconnect();
  }
  connect() {
    this.socket = io(environment.api_url, { query: `token=${this.profileService.token}` });
    this.socket.on('connect', function () {
      console.log("connected..");
    });
    this.socket.on('disconnect', function () {
      console.log("disconnected..")
    });
  }
}
