import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { days } from 'src/app/constant/days';
import { Student } from 'src/app/models/Student';
import { NotifyService } from 'src/app/services/notify.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  students$ = new BehaviorSubject<Student[]>([]);
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  search: string = '';
  days = days;
  day!: { name: string; value: number };
  displayedColumns: string[] = ['name', 'group', 'time', 'phone', 'action'];
  id: string = '';
  disableForAllBtn: boolean = false;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.getStudents(this.pageSize, this.pageIndex * this.pageSize);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  constructor(
    // private groupService: GroupService,
    // private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private notifyService: NotifyService // private attendanceService: StudentAttendanceService
  ) {}

  ngOnInit(): void {
    this.getStudents(this.pageSize, this.pageIndex * this.pageSize);
  }
  onSearch() {
    this.getStudents(
      this.pageSize,
      this.pageIndex * this.pageSize,
      this.search
    );
  }
  getStudents(numOfDocs: number, from: number, search?: string) {
    this.studentService
      .getStudents(numOfDocs, from, search)
      .pipe(
        tap((data) => {
          this.students$.next(data.students);
          this.length = data.totalDocs;
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  // hasDay(index: number) {
  //   let has = false;
  //   let data: any = null;
  //   this.group$.getValue()?.appointments.map((appoint) => {
  //     if (appoint.day == index) {
  //       has = true;
  //       data = appoint;
  //     }
  //   });
  //   return { has: has, appointment: data };
  // }
  onDeleteStudent(id: string) {
    if (confirm('هل تريد حذف هذا الطالب')) {
      let newStudents = this.students$
        .getValue()
        .filter((data) => id !== data._id);
      this.students$.next(newStudents);
      this.studentService
        .deleteStudent(id)
        .pipe(
          tap((data) => {
            this.notifyService.success('تم حذف الطالب بنجاح');
          }),
          takeUntil(this._unsubscribe$)
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
