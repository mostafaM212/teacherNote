import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { User } from '../models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  token$ = new BehaviorSubject<string>('');
  baseUrl: string = environment.backendUrl + 'users';

  constructor(private http: HttpClient, private router: Router) {}

  addUser(user: any) {
    return this.http.post(this.baseUrl, user);
  }

  loginUser(data: any) {
    return this.http
      .post<{ message: string; user: User; token: string }>(
        this.baseUrl + '/login',
        data
      )
      .pipe(
        tap((data) => {
          this.user$.next(data.user);
          this.isAuthenticated$.next(true);
          this.token$.next(data.token);
          this.setUserDataToLocalStorage(data.user, data.token);
          this.router.navigate(['home']);
        })
      );
  }
  autoLogin() {
    let expiresIn = localStorage.getItem('tokenExpireIn');
    if (expiresIn !== null && new Date(+expiresIn) > new Date()) {
      let user = localStorage.getItem('user');
      let token = localStorage.getItem('token');
      if (user !== null && token !== null) {
        this.user$.next(JSON.parse(user));
        this.token$.next(token);
        this.isAuthenticated$.next(true);
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  }
  setUserDataToLocalStorage(user: User, token: string) {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem(
        'tokenExpireIn',
        new Date().setHours(new Date().getHours() + 7 * 24).toString()
      );
    } catch (error) {
      console.log('test', error);
    }
  }
  getUserData() {}

  logout() {
    localStorage.clear();
    this.isAuthenticated$.next(false);
    this.user$.next(null);
    this.token$.next('');
    this.router.navigate(['/auth', 'login']);
    // this.toast.success('logout successfully');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isAuthenticated$.getValue();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isAuthenticated$.getValue();
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isAuthenticated$.getValue();
  }
}
