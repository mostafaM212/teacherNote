import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import { BehaviorSubject, Subject, forkJoin, tap } from 'rxjs';
import { Quiz } from 'src/app/models/Quiz';
import { Student } from 'src/app/models/Student';
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
  chartOption: EChartsOption = {
    xAxis: {
      type: 'value',
      name: 'رقم ',
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
    private studentService: StudentService
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
    let newOptions = this.chartOption;

    newOptions.series = [
      {
        smooth: true,
        data: [...displayed],
        type: 'line',
      },
    ];
    this.chartOption = { ...newOptions };
  }
  onDeleteQuiz(id: string) {}
  ngOnDestroy(): void {}
}
