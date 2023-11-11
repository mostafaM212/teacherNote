import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  groups$ = this.groupService.groups$;
  nowHours = new Date().getHours();
  today: number = new Date().getDay();
  displayedColumns: string[] = ['name', 'phone', 'gender', 'appointment'];
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    // console.log('test', new Date().getHours());
    this.getGroupsByDay(this.today);
  }
  getGroupsByDay(day: number) {
    this.groupService
      .getGroups(day)
      .pipe(
        tap((data) => {
          this.groups$.next(data.groups);
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
