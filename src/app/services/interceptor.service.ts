import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'
import { catchError, tap, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProfileService } from '../account/profile.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private profileService: ProfileService,
    private http: HttpClient
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    let request = req;
    console.log(req.headers)
    let headers = req.headers;
    if (this.profileService.token) {
      headers = headers.set('Authorization', `Bearer ${this.profileService.token}`)
    }
    console.log("req.withCredentials", req.withCredentials)
    if (!RegExp('^(https?:)?//').test(req.url)) {
      request = req.clone({
        url: `${environment.api_url}/${req.url}`,
        headers: headers,
        withCredentials: req.withCredentials
      })
    }
    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt['body'].message) {
            this.toastr.success('', evt['body'].message)
          }
        }

      }),
      catchError(err => {
        console.log(err.error)

        if (err instanceof HttpErrorResponse) {
          this.toastr.error('', err.error.message);
          switch (err.status) {
            case 409:
            case 422: {
              //Show Error
            } break;
            case 401:
            case 400: {
              if (this.router.url !== 'account/login') {
                //this.profileService.logout();
                //this.router.navigate(['/account/login'])
              }
            }
          }
        }
        return of(err);
      })
    );
  }

}
