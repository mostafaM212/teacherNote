import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, forkJoin, takeUntil, tap } from 'rxjs';
import { days } from 'src/app/constant/days';
import { Group } from 'src/app/models/Group';
import { Student } from 'src/app/models/Student';
import { GroupService } from 'src/app/services/group.service';
import { StudentService } from 'src/app/services/student.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
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
  displayedColumns: string[] = ['name', 'phone', 'gender', 'action'];

  constructor(
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.getData(data['id']);
    });
  }

  getData(id: string) {
    forkJoin({
      groups: this.groupService.getGroup(id),
      students: this.studentService.getStudentsByGroup(id),
    })
      .pipe(
        tap((data) => {
          this.group$.next(data.groups.group);
          this.students$.next(data.students.students);
          console.log('test', data);

          // days.map((day) => {
          //   if (day.value == data.groups.group.day) {
          //     this.day = day;
          //   }
          // });
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
