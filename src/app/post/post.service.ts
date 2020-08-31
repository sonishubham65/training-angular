import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }
  list(page) {
    return this.http.get(`manager/post/page/${page}`);
  }
  add(data) {
    return this.http.post(`manager/post/`, data);
  }
  edit(id, data) {
    return this.http.patch(`manager/post/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`manager/post/${id}`);
  }
  get(id) {
    return this.http.get(`manager/post/${id}`);
  }
  applications(ID, page) {
    return this.http.get(`manager/post/${ID}/application/page/${page}`);
  }
  application_detail(ID) {
    return this.http.get(`manager/post/application/details/${ID}`);
  }
  download(id) {
    return this.http.get(`manager/post/application/resume/${id}`, {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }
}
