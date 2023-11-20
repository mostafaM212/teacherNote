import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import { BehaviorSubject, Subject, forkJoin, takeUntil, tap } from 'rxjs';
import { Quiz } from 'src/app/models/Quiz';
import { Student } from 'src/app/models/Student';
import { NotifyService } from 'src/app/services/notify.service';
import { QuizService } from 'src/app/services/quiz.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-view-student-level',
  templateUrl: './view-student-level.component.html',
  styleUrls: ['./view-student-level.component.scss'],
})
export class ViewStudentLevelComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  quizzes$ = this.quizService.quizzes$;
  student$ = new BehaviorSubject<Student | null>(null);
  id: string = '';
  displayedColumns: string[] = [
    'total',
    'degree',
    'percentage',
    'date',
    'action',
  ];
  studentLevel!: { name: string; color: string };

  chartOption: EChartsOption = {
    xAxis: {
      type: 'value',
      name: 'رقم ',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      formatter: (params: any, index) => {
        console.log('test', params, index);

        return (
          'درجات الطالب' +
          params[0].value[1] * 100 +
          '<br/>' +
          'رقم الامتحان' +
          params[0].value[0]
        );
      },
    },
    yAxis: {
      type: 'value',
      name: 'درجات الطالب',
    },
    series: [
      {
        smooth: true,
        data: [],
        type: 'line',
      },
    ],
  };

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.getQuizzes(data['id']);
      }
    });
  }

  getQuizzes(id: string) {
    forkJoin({
      quizzes: this.quizService.getQuizsByStudent(id),
      student: this.studentService.getStudent(id),
    })
      .pipe(
        tap((data) => {
          this.quizzes$.next(data.quizzes.Quizs);
          this.formateDataToDisplay(data.quizzes.Quizs);
          this.student$.next(data.student.student);
          this.studentLevel = this.showStudentLevel();
        })
      )
      .subscribe();
  }
  formateDataToDisplay(quizzes: Quiz[]) {
    let displayed: any[] = [];
    quizzes.map((quiz, index) => {
      displayed.push([index + 1, quiz.percentage]);
      console.log('test', displayed, quiz.total, quiz.percentage);
    });
    this.chartOption = {
      xAxis: {
        type: 'value',
        name: 'رقم ',
      },
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'line',
      //   },
      //   formatter: (params: any, index) => {
      //     console.log('test', params, index);

      //     return (
      //       'درجات الطالب' +
      //       params[0].value[1] * 100 +
      //       '<br/>' +
      //       'رقم الامتحان' +
      //       params[0].value[0]
      //     );
      //   },
      // },
      yAxis: {
        type: 'value',
        name: 'درجات الطالب',
      },
      series: [
        {
          smooth: true,
          data: [...displayed],
          type: 'line',
        },
      ],
    };
  }
  onDeleteQuiz(id: string) {
    if (confirm('هل تريد حذف هذا الاختبار')) {
      let newَQuizzes = this.quizzes$
        .getValue()
        .filter((data) => id !== data._id);
      this.quizzes$.next(newَQuizzes);
      this.quizService
        .deleteQuiz(id)
        .pipe(
          tap((data) => {
            this.notifyService.success('تم حذف الاختبار بنجاح');
          }),
          takeUntil(this._unsubscribe$)
        )
        .subscribe();
    }
  }

  showStudentLevel() {
    let studentDegree = 0;
    let count = 0;
    this.quizzes$.getValue().map((quiz) => {
      studentDegree += quiz.percentage;
      count += 1;
    });
    let percentage = studentDegree / count;
    if (percentage >= 0.9) {
      return { name: 'ممتاز', color: '#1a4087' };
    } else if (percentage >= 0.8) {
      return { name: 'جيد جدا', color: '#23ad5b' };
    } else if (percentage >= 0.7) {
      return { name: 'جيد', color: '#e2e2a5' };
    } else if (percentage >= 0.5) {
      return { name: 'مقبول', color: '#7a220e' };
    } else {
      return { name: 'سئ', color: '#c4024f' };
    }
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
