import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  groups$ = this.groupService.groups$;

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.getGroups();
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
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
