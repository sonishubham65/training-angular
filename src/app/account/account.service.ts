import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  register(userData) {
    return this.http.post(`user/signup`, userData, {
      observe: "response"
    })
  }
  login(userData) {
    return this.http.post(`user/login`, userData, {
    })
  }
}
