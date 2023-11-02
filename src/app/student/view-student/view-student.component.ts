import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { Student } from 'src/app/models/Student';
import { GroupService } from 'src/app/services/group.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  student$ = new BehaviorSubject<Student | null>(null);
  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.getStudent(data['id']);
      }
    });
  }

  getStudent(id: string) {
    this.studentService
      .getStudent(id)
      .pipe(
        tap((data) => {
          console.log('test', data);

          this.student$.next(data.student);
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
