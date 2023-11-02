import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy, OnInit {
  _unsubscribe$ = new Subject<boolean>();
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private notifyService: NotifyService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  save() {
    if (this.loginForm.invalid) {
      this.notifyService.warning(
        ' تاكد من ان كل البيانات مكتوبه بالطريقه الصحيحه'
      );
      return;
    }
    this.authService
      .loginUser(this.loginForm.value)
      .pipe(
        tap((data) => {
          this.notifyService.success('تم تسجيل الدخول بنجاح');
          this.router.navigate(['/home']);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
