import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileService } from '../account/profile.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/overlay-directives';
import { catchError, mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(
    private profileService: ProfileService,
    private http: HttpClient
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url)
    // return next.handle(req).pipe(
    //   catchError(err => {
    //     console.log(err);
    //     console.log(err)
    //     return Observable.throw(err.error)
    //   })
    // )
    if (req.url !== 'user/authorize') {
      const helper = new JwtHelperService();
      if (this.profileService.token) {
        const isExpired = helper.isTokenExpired(this.profileService.token);
        if (isExpired) {
          return this.http.get('user/authorize', { withCredentials: true }).pipe(mergeMap(data => {
            console.log(data)
            this.profileService.token = data['token'];
            return next.handle(req);
          }))
        }
      }
    } return next.handle(req);
  }
}
