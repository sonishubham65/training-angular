import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from '../account/profile.service';
@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }
  list(page, filter) {
    return this.http.get(`manager/post/page/${page}`);
  }
  add(data) {
    return this.http.post(`manager/post/`, data);
  }
  delete(id) {
    return this.http.delete(`manager/post/${id}`);
  }
}
