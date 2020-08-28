import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userData;
  private tokenData;

  constructor(
    private http: HttpClient
  ) {
    if (localStorage.getItem('profile')) {
      this.userData = JSON.parse(localStorage.getItem('profile'));
    }
    if (localStorage.getItem('token')) {
      this.tokenData = localStorage.getItem('token');
    }
  }

  get user() {
    return this.userData;
  }
  set user(data) {
    localStorage.setItem('profile', JSON.stringify(data));
    this.userData = data;
  }

  get token() {
    return this.tokenData;
  }
  set token(data) {
    localStorage.setItem('token', data);
    this.tokenData = data;
  }
  logout() {
    this.token = undefined;
    this.user = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
  }
  getProfile() {
    return this.http.get('user/profile')
      .pipe(tap((res) => {
        this.user = res['data'];
      }));
  }
}
