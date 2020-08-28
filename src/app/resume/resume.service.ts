import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(
    private http: HttpClient
  ) { }
  upload(form) {
    return this.http.put('employee/resume', form)
  }
  download() {
    return this.http.get('employee/resume', {
      observe: 'response',
      responseType: 'blob' as 'json'
    })
  }
}
