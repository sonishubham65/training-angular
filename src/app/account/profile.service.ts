import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userData;
  private tokenData;

  constructor() {
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
}
