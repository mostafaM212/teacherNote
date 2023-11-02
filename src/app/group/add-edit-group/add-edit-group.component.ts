import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { days } from 'src/app/constant/days';
import { stages } from 'src/app/constant/stageArray';
import { GroupService } from 'src/app/services/group.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss'],
})
export class AddEditGroupComponent implements OnDestroy, OnInit {
  _unsubscribe$ = new Subject<boolean>();
  stages = stages;
  days = days;
  addMode: boolean = true;
  groupForm = this.fb.group({
    name: ['', [Validators.required]],
    stage: [Validators.required],
    // day: [0, [Validators.required, Validators.min(0), Validators.max(7)]],

    appointments: this.fb.array([]),
    gender: ['', [Validators.required]],
    period: [1],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private groupService: GroupService,
    private notifyService: NotifyService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.addAppointment();
  }

  get appointments() {
    return this.groupForm.get('appointments') as FormArray;
  }
  addAppointment() {
    const appointmentForm = this.fb.group({
      day: [0, [Validators.required, Validators.min(0), Validators.max(7)]],
      time: ['', [Validators.required]],
    });
    this.appointments.push(appointmentForm);
  }
  removeAppointment(i: number) {
    this.appointments.removeAt(i);
  }
  save() {
    if (this.groupForm.invalid) {
      this.notifyService.info('تاكد من ملئ جميع الحقول ');
      return;
    }
    let body = this.bodyFormatter();
    console.log('test', body);

    if (this.addMode) {
      this.groupService
        .addGroup(body)
        .pipe(
          tap((data) => {
            this.router.navigate(['/group']);
            this.notifyService.success('تم اضافه المجموعه بنجاح');
          }),
          takeUntil(this._unsubscribe$)
        )
        .subscribe();
    }
  }
  bodyFormatter() {
    let appor: any[] = [];

    this.appointments.value.map((group: any) => {
      appor.push({
        time:
          new Date(group.time).getHours() +
          ':' +
          new Date(group.time).getUTCMinutes(),

        day: group.day,
      });
    });

    return {
      ...this.groupForm.value,
      appointments: appor,
    };
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
