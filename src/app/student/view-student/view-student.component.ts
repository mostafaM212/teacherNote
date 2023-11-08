import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, forkJoin, takeUntil, tap } from 'rxjs';
import { Student } from 'src/app/models/Student';
import { NotifyService } from 'src/app/services/notify.service';
import { StudentAttendanceService } from 'src/app/services/student-attendance.service';
import { StudentService } from 'src/app/services/student.service';
import { AddQuizComponent } from './add-quiz/add-quiz.component';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  student$ = new BehaviorSubject<Student | null>(null);
  attendance$ = this.attendanceService.attendance$;
  id: string = '';
  displayedColumns: string[] = ['stage', 'date', 'action'];
  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private attendanceService: StudentAttendanceService,
    private notify: NotifyService,
    private dialogRef: MatDialog
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.getData(data['id']);
        this.id = data['id'];
      }
    });
  }

  getData(id: string) {
    forkJoin({
      attendance: this.attendanceService.getStudentAttendancesByStudent(id),
      student: this.studentService.getStudent(id),
    })
      .pipe(
        tap((data) => {
          // console.log('test', data);
          this.student$.next(data.student.student);
          this.attendance$.next(data.attendance.StudentAttendances);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  onDeleteAttendance(id: string) {
    if (!confirm('هل تريد حذف هذا الحضور نهائيا؟')) {
      return;
    }
    this.attendance$.next(
      this.attendance$.getValue().filter((data) => data._id !== id)
    );
    this.attendanceService
      .deleteStudentAttendance(id)
      .pipe(
        tap((data) => {
          this.notify.success('تم حذف حضور للطالب ');
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }

  onAddAttendance() {
    this.attendanceService
      .addStudentAttendance({
        student: this.student$.getValue()?._id,
        group: this.student$.getValue()?.group._id,
      })
      .pipe(
        tap((data) => {
          this.notify.success('تم اضافه حضور للطالب ');
          this.attendance$.next([
            ...this.attendance$.getValue(),
            data.StudentAttendance,
          ]);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  checkIfThereAttendanceToday() {
    // console.log('test', new Date().get());

    let check = false;
    this.attendance$.getValue().map((attendance) => {
      if (
        (attendance.createdAt,
        new Date(attendance.createdAt as string).getDay() ==
          new Date().getDay()) &&
        (attendance.createdAt,
        new Date(attendance.createdAt as string).getMonth() ==
          new Date().getMonth()) &&
        (attendance.createdAt,
        new Date(attendance.createdAt as string).getUTCFullYear() ==
          new Date().getUTCFullYear())
      ) {
        check = true;
      }
    });
    return check;
  }
  openQuizDialog() {
    let dialog = this.dialogRef.open(AddQuizComponent, {
      data: {
        student: this.id,
      },
      width: '40%',
      height: '50%',
    });
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
