import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { days } from 'src/app/constant/days';
import { stages } from 'src/app/constant/stageArray';
import { Group } from 'src/app/models/Group';
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
  id: string = '';
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    if (this.addMode) {
      this.addAppointment();
    }
    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.addMode = false;
        this.id = data['id'];
        this.getGroup(this.id);
      }
    });
  }

  get appointments() {
    return this.groupForm.get('appointments') as FormArray;
  }

  getGroup(id: string) {
    this.groupService
      .getGroup(id)
      .pipe(
        tap((data) => {
          this.putDataToForm(data.group);
          // console.log('test', data.group);
        }, takeUntil(this._unsubscribe$))
      )
      .subscribe();
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
  appointmentsFormatter(data: any[]) {
    let newdata: any[] = [];
    data.map((data) => {
      const [hour, minute] = data.time.split(':');
      // console.log('test', hour, minute);
    });
    return data;
  }
  putDataToForm(group: any) {
    Object.keys(this.groupForm.value).map((data) => {
      if (data !== 'appointments') {
        this.groupForm.patchValue({ [data]: group[data] });
      }
    });
    let newdata: any[] = [];
    // console.log('test', group.appointments);

    group.appointments.map((data: any) => {
      const [hour, minute] = data.time.split(':');
      let newDate = new Date(new Date().setHours(hour, minute));
      newdata.push({ time: newDate, day: data.day });
    });
    // console.log('test', newdata);

    this.groupForm.patchValue({
      appointments: newdata,
    });
  }
  save() {
    if (this.groupForm.invalid) {
      this.notifyService.info('تاكد من ملئ جميع الحقول ');
      return;
    }
    let body = this.bodyFormatter();

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
    } else {
      this.groupService
        .updateGroup(this.id, body)
        .pipe(
          tap((data) => {
            this.router.navigate(['/group', 'view', this.id]);
            this.notifyService.success('تم تعديل المجموعه بنجاح');
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
