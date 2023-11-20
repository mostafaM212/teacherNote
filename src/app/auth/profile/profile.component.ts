import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, forkJoin, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject();
  user$ = this.authService.user$;
  groupCount: number = 0;
  studentCount: number = 0;

  constructor(
    private authService: AuthService,
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    forkJoin({
      student: this.studentService.getStudentCount(),
      group: this.studentService.getStudentCount(),
    })
      .pipe(
        tap((data) => {
          console.log('test', data);

          this.groupCount = data.group.count;
          this.studentCount = data.student.count;
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
