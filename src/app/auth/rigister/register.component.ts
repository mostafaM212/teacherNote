import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { passwordAndRepeatedPasswordValidator } from 'src/app/validators/passwordValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();

  allowedImages: string[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/webp',
  ];
  addMode: boolean = true;
  activeFile: any;
  imageUrl: any;
  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [Validators.required, Validators.minLength(6)],
      phone: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [passwordAndRepeatedPasswordValidator],
    }
  );
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private notifyService: NotifyService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSelectFile(event: Event) {
    this.activeFile = (event.target as HTMLInputElement).files?.item(0);
    // console.log('test', this.activeFile.type);

    if (
      !this.activeFile ||
      this.allowedImages.findIndex((image) => image == this.activeFile.type) ==
        -1
    ) {
      // this.tostr.info('invalid extension given');
      return;
    }
    // console.log('test', this.activeFile);

    let reader = new FileReader();

    reader.readAsDataURL(this.activeFile);
    reader.onload = () => {
      this.registerForm.patchValue({
        image: reader.result,
      });
      this.imageUrl = reader.result;
    };
  }
  save() {
    if (this.registerForm.invalid) {
      this.notifyService.warning(
        ' تاكد من ان كل البيانات مكتوبه بالطريقه الصحيحه وكلمه المرور متطابقه'
      );
      return;
    }
    let formData = new FormData();
    formData.append('email', this.registerForm.value.email);
    formData.append('password', this.registerForm.value.password);
    formData.append('phone', this.registerForm.value.phone);
    formData.append('name', this.registerForm.value.name);
    formData.append('photo', this.activeFile);

    this.authService
      .addUser(formData)
      .pipe(
        tap((data) => {
          this.router.navigate(['/auth', 'login']);
          this.notifyService.success('تم اضافه معلم بنجاح');
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
