import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private http: HttpClient
  ) { }
  list(page, params) {
    let queries = [];
    Object.keys(params).forEach(key => {
      if (params[key].trim()) {
        queries.push((key + '=' + params[key]));
      }
    });
    let queryString = queries.length ? "?" + queries.join('&') : '';
    return this.http.get(`position/page/${page}${queryString}`);
  }
}
