import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let request = req;
    if (!RegExp('^(https?:)?//').test(req.url)) {
      request = req.clone({
        url: `${environment.api_url}/${req.url}`
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
            case 401: {
              if (this.router.url !== 'account/login') {
                this.router.navigate(['/account/login'])
              }
            }
          }
        }
        return of(err);
      })
    );
  }

}
