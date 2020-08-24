import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from '../account/profile.service';
@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) { }
  list(page, filter) {
    let url = `manager/post/page/${page}`
    return this.http.get(url)
  }
}
