import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
})
export class AddQuizComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  quizForm = this.fb.group({
    student: [''],
    degree: [0, [Validators.required]],
    total: [10, [Validators.required]],
    percentage: [0],
  });
  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: NotifyService,
    private quizService: QuizService
  ) {}
  ngOnInit(): void {
    if (this.data.student) {
      this.quizForm.patchValue({
        student: this.data.student,
      });
    }
  }
  save() {
    if (this.quizForm.invalid) {
      this.notify.info('تاكد من ملئ جميع البيانات');
      return;
    }
    this.quizForm.patchValue({
      percentage: this.quizForm.value.degree / this.quizForm.value.total,
    });
    this.quizService
      .addQuiz(this.quizForm.value)
      .pipe(
        tap((data) => {
          this.notify.success('تم اضافه الاختبار بنجاح');
          this.onNoClick();
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
