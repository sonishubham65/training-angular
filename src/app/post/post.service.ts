import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }
  list(page, params) {
    let queries = [];
    console.log(params)
    Object.keys(params).forEach(key => {
      if (params[key].trim()) {
        queries.push((key + '=' + params[key]));
      }
    });
    let queryString = queries.length ? "?" + queries.join('&') : '';
    console.log(queryString)
    return this.http.get(`manager/post/page/${page}${queryString}`);
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
  download(id) {
    return this.http.get(`manager/post/application/resume/${id}`, {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }
}
