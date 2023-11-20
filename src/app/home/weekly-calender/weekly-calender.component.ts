import dayGridPlugin from '@fullcalendar/daygrid';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/Group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly-calender',
  templateUrl: './weekly-calender.component.html',
  styleUrls: ['./weekly-calender.component.scss'],
})
export class WeeklyCalenderComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  groups$ = this.groupService.groups$;
  constructor(private groupService: GroupService, private router: Router) {}
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locales: [{ code: 'ar' }],
    weekends: true,

    eventClick: (data) => {
      this.router.navigate(['group', 'view', data.event.id]);
    },
  };
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.groupService
      .getGroups()
      .pipe(
        tap((data) => {
          this.groups$.next(data.groups);
          this.formateDateToCalender(data.groups);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  formateDateToCalender(data: Group[]) {
    let startMonthDate = new Date().setDate(1);
    let startDay = new Date(startMonthDate).getDay();
    let days = [];
    for (let index = startDay; index <= 6; index++) {
      days.push(index);
    }
    for (let index = 0; index < startDay; index++) {
      days.push(index);
    }
    let events: any[] = [];
    days.map((day) => {
      this.groups$.getValue().map((group) => {
        group.appointments.map((appoint) => {
          if (appoint.day == day) {
            events.push({
              title: group.stage + ' ' + appoint.time,
              id: group._id,
              start: new Date(new Date(startMonthDate).setDate(day)),
              color: 'gray',
              borderColor: '',
              allDay: true,
            });
          }
        });
      });
    });
    // console.log('test', events);
    let newCalender = this.calendarOptions;

    newCalender.events = [...events];
    this.calendarOptions = { ...newCalender };
    // console.log('test', startMonthDate, new Date(startMonthDate));

    data.map((group) => {});
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
