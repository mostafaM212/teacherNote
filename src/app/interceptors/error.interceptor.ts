import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { NotifyService } from '../services/notify.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notifyService: NotifyService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.notifyService.error('يجب عليك تسجيل الدخول');
        } else {
          this.notifyService.error(error.message);
        }
        return throwError(error);
      })
    );
  }
}
