import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import io from 'socket.io-client';
import { ProfileService } from '../account/profile.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket;
  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
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

    this.socket.on('application', (data) => {
      console.log(data)
      this.toastr.info(`<p><a class="btn btn-link" href="/post/application/${data.id}">click here</a> to view.</p>`, 'New Application', { enableHtml: true, closeButton: true, tapToDismiss: false });
    });
  }
}
