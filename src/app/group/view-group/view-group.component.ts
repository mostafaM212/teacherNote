import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, forkJoin, takeUntil, tap } from 'rxjs';
import { days } from 'src/app/constant/days';
import { Group } from 'src/app/models/Group';
import { Student } from 'src/app/models/Student';
import { StudentAttendance } from 'src/app/models/StudentAttendance';
import { GroupService } from 'src/app/services/group.service';
import { NotifyService } from 'src/app/services/notify.service';
import { QuizService } from 'src/app/services/quiz.service';
import { StudentAttendanceService } from 'src/app/services/student-attendance.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
})
export class ViewGroupComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  group$ = new BehaviorSubject<Group | null>(null);
  students$ = new BehaviorSubject<Student[]>([]);
  days = days;
  day!: { name: string; value: number };
  displayedColumns: string[] = ['name', 'phone', 'gender', 'quiz', 'action'];
  id: string = '';
  disableForAllBtn: boolean = false;
  disableDegreeBtn: boolean = false;
  quizForm = this.fb.group({
    total: [10, [Validators.required, Validators.min(0)]],
    studentDegrees: this.fb.array([]),
  });
  constructor(
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private notifyService: NotifyService,
    private attendanceService: StudentAttendanceService,
    private fb: UntypedFormBuilder,
    private quizService: QuizService
  ) {}
  get studentDegrees(): FormArray {
    return this.quizForm.get('studentDegrees') as FormArray;
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.getData(data['id']);
      this.id = data['id'];
    });
  }
  addStudentDegree(studentId: string) {
    const degreeForm = this.fb.group({
      degree: [0, [Validators.required, Validators.min(0)]],
      student: [studentId],
    });
    this.studentDegrees.push(degreeForm);
  }
  addStudentAttendanceForAllStudents() {
    if (!confirm('هل تريد اضافه حضور لكل الطلاب')) {
      return;
    }
    let attendances: any[] = [];
    this.students$.getValue().map((student) => {
      attendances.push({ student: student._id, group: student.group });
    });
    if (attendances.length == 0) {
      return;
    }
    this.attendanceService
      .addStudentAttendanceForAllStudents({ studentAttendances: attendances })
      .pipe(
        tap((data) => {
          console.log('test', data);

          this.disableForAllBtn = true;
          let students = this.students$.getValue();
          students.map((student, stIndex) => {
            data.StudentAttendances.map((attendance, atIndex) => {
              if (student._id == attendance.student) {
                students[stIndex].studentAttendances = [
                  ...students[stIndex].studentAttendances,
                  attendance,
                ];
              }
            });
          });
          this.students$.next(students);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  onAddAttendance(student: Student, index: number) {
    if (!confirm('هل تريد اضافه حضور لهذا الطالب؟')) {
      return;
    }
    // console.log('test', student);

    this.attendanceService
      .addStudentAttendance({
        student: student?._id,
        group: student?.group,
      })
      .pipe(
        tap((data) => {
          this.notifyService.success('تم اضافه حضور للطالب ');
          let students = this.students$.getValue();
          students[index].studentAttendances = [
            ...students[index].studentAttendances,
            data.StudentAttendance,
          ];
          this.students$.next(students);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  getData(id: string) {
    forkJoin({
      group: this.groupService.getGroup(id),
      students: this.studentService.getStudentsByGroup(id),
    })
      .pipe(
        tap((data) => {
          this.group$.next(data.group.group);
          this.students$.next(data.students.students);
          let disable = false;
          data.students.students.map((student) => {
            this.addStudentDegree(student._id as string);
            if (this.checkIfThereAttendanceToday(student.studentAttendances)) {
              disable = true;
            }
          });
          this.disableForAllBtn = disable;
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  hasDay(index: number) {
    let has = false;
    let data: any = null;
    this.group$.getValue()?.appointments.map((appoint) => {
      if (appoint.day == index) {
        has = true;
        data = appoint;
      }
    });
    return { has: has, appointment: data };
  }
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
  checkIfThereAttendanceToday(studentAttendances: StudentAttendance[]) {
    // console.log('test', new Date().get());

    let check = false;
    studentAttendances.map((attendance) => {
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
  addQuizHandler() {
    if (!confirm('هل تريد اضافه امتحان لهذا الطالب؟')) {
      return;
    }
    if (this.quizForm.invalid) {
      this.notifyService.info('تاكد من ملئ جميع البيانات');
      return;
    }
    const body: any[] = [];
    const total: number = this.quizForm.value.total;
    this.studentDegrees.controls.map((control) => {
      body.push({
        student: control.value.student,
        degree: control.value.degree,
        total: total,
        percentage: control.value.degree / total,
      });
    });
    this.quizService
      .addQuizForAllStudents(body)
      .pipe(
        tap((data) => {
          this.notifyService.success('تم اضافه الاختبارات بدرجات الطلاب بنجاح');
          this.disableDegreeBtn = true;
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
