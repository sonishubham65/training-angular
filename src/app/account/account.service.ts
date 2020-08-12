import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  register(userData) {
    return this.http.post("user/signup", userData, {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      observe: "response"
    })
  }
  login(userData) {
    return this.http.post("user/login", userData, {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      observe: "body"
    })
  }
}
