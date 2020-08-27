import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private http: HttpClient
  ) { }
  list(page) {
    return this.http.get(`position/page/${page}`);
  }
  details(_id) {
    return this.http.get(`position/${_id}`);
  }
  apply(_id) {
    return this.http.post(`position/apply/${_id}`, {});
  }
}
