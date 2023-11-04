import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, tap, takeUntil } from 'rxjs';
import { days } from 'src/app/constant/days';
import { stages } from 'src/app/constant/stageArray';
import { GroupService } from 'src/app/services/group.service';
import { NotifyService } from 'src/app/services/notify.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.scss'],
})
export class AddEditStudentComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  groups$ = this.groupService.groups$;
  stages = stages;
  days = days;
  addMode: boolean = true;
  id: string = '';
  studentForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', Validators.required],
    paymentMethod: ['', [Validators.required]],
    price: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    group: ['', [Validators.required]],
  });
  constructor(
    private fb: UntypedFormBuilder,
    private groupService: GroupService,
    private notifyService: NotifyService,
    private router: Router,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getGroups();
    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.addMode = false;
        this.getGroup(data['id']);
        this.id = data['id'];
      }
    });
  }
  getGroup(id: string) {
    this.studentService
      .getStudent(id)
      .pipe(
        tap((data) => {
          this.studentForm.patchValue({
            ...data.student,
            group: data.student.group._id,
          });
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  getGroups() {
    this.groupService
      .getGroups()
      .pipe(
        tap((data) => {
          this.groups$.next(data.groups);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  save() {
    if (this.studentForm.invalid) {
      this.notifyService.info('تاكد من ملئ جميع الحقول ');
      return;
    }
    if (this.addMode) {
      this.studentService
        .addStudent(this.studentForm.value)
        .pipe(
          tap((data) => {
            this.router.navigate([
              '/group',
              'view',
              this.studentForm.value.group,
            ]);
            this.notifyService.success('تم اضافه المجموعه بنجاح');
          }),
          takeUntil(this._unsubscribe$)
        )
        .subscribe();
    } else {
      this.studentService
        .updateStudent(this.id, this.studentForm.value)
        .pipe(
          tap((data) => {
            this.router.navigate(['/student', 'view', this.id]);
            this.notifyService.success('تم تعديل المجموعه بنجاح');
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
