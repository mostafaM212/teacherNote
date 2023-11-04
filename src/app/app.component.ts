import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationError,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgxToastNotifyService } from 'ngx-toast-notify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'teacher_note';
  showFiller = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.events.subscribe((data) => {
      // get the data from the snapshot
      // console.log('test', data);
      // console.log('test', data);

      if (data instanceof NavigationCancel || data instanceof NavigationError) {
        if (this.authService.isAuthenticated$.getValue()) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/auth', 'login']);
        }
      }
    });
    if (!this.authService.isAuthenticated$.getValue()) {
      this.authService.autoLogin();
    }
    setInterval(() => {
      this.authService.autoLogin();
    }, 600000);
  }
}
