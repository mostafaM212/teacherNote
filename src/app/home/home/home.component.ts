import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, forkJoin, takeUntil, tap } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import type { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { CoolTheme } from './cool-them';
import { StudentService } from 'src/app/services/student.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  groups$ = this.groupService.groups$;
  students$ = this.studentService.students$;

  showChart: boolean = false;
  nowHours = new Date().getHours();
  today: number = new Date().getDay();
  displayedColumns: string[] = ['name', 'phone', 'gender', 'appointment'];

  theme: string | ThemeOption = '#b21ab4';
  coolTheme = CoolTheme;
  options: EChartsOption = {
    title: {
      left: '50%',
      text: 'قياس مستوى الطلاب',
      subtext: 'Mocking Data',
      textAlign: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      align: 'auto',
      bottom: 10,
      data: [
        'rose1',
        'rose2',
        'rose3',
        'rose4',
        'rose5',
        'rose6',
        'rose7',
        'rose8',
      ],
    },
    calculable: true,
    series: [
      {
        name: 'area',
        type: 'pie',
        radius: [30, 110],
        roseType: 'area',
        data: [
          { value: 0.7, name: 'rose1' },
          { value: 0.5, name: 'rose2' },
          { value: 0.15, name: 'rose3' },
          { value: 0.25, name: 'rose4' },
          { value: 0.2, name: 'rose5' },
          { value: 0.35, name: 'rose6' },
          { value: 0.3, name: 'rose7' },
          { value: 0.4, name: 'rose8' },
        ],
      },
    ],
  };

  constructor(
    private groupService: GroupService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    // console.log('test', new Date().getHours());
    this.getGroupsByDay(this.today);
  }
  getGroupsByDay(day: number) {
    forkJoin({
      groups: this.groupService.getGroups('', day),
      studentLevel: this.studentService.getStudentsLevel(),
    })
      .pipe(
        tap((data) => {
          this.groups$.next(data.groups.groups);
          this.students$.next(data.studentLevel.students);
          let newStudents = this.students$
            .getValue()
            .filter((student) => student.quiz?.length);
          if (newStudents.length) {
            this.showChart = true;
            let newData: EChartsOption = {
              title: {
                left: '50%',
                text: 'قياس مستوى الطلاب',
                subtext: 'مستوى الطالب فى اخر اختبار',
                textAlign: 'center',
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
              },
              legend: {
                align: 'auto',
                bottom: 10,
                data: [...newStudents.map((student) => student.name)],
              },
              calculable: true,
              series: [
                {
                  name: 'area',
                  type: 'pie',
                  radius: [30, 110],
                  roseType: 'area',
                  data: [
                    ...newStudents.map((student) => {
                      return {
                        value: (student.quiz as any[])[0].percentage,
                        name: student.name,
                      };
                    }),
                  ],
                },
              ],
            };
            this.options = { ...newData };
          }
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
