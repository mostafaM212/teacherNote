import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, forkJoin, takeUntil, tap } from 'rxjs';
import { AccountingService } from 'src/app/services/accounting.service';

export interface Total {
  totalSalary: number;
  count: number;
}
@Component({
  selector: 'app-home-accounting',
  templateUrl: './home-accounting.component.html',
  styleUrls: ['./home-accounting.component.scss'],
})
export class HomeAccountingComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  monthly!: Total;
  everyLesson!: Total;
  constructor(private accountingService: AccountingService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData();
  }
  getData() {
    forkJoin({
      monthly: this.accountingService.getAllStudentMonthlySalary(),
      everyLesson: this.accountingService.getAllStudentEveryLessonSalary(),
    })
      .pipe(
        tap((data) => {
          this.monthly = data.monthly.data;
          this.everyLesson = data.everyLesson.data;
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
