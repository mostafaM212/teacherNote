import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.isAuthenticated$.getValue()) {
      let authReq = req.clone({
        headers: req.headers.append(
          'Authorization',
          this.authService.token$.getValue()
        ),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
