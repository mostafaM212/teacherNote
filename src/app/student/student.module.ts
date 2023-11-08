import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddQuizComponent } from './view-student/add-quiz/add-quiz.component';
import { ViewStudentLevelComponent } from './view-student/view-student-level/view-student-level.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
@NgModule({
  declarations: [
    StudentListComponent,
    AddEditStudentComponent,
    ViewStudentComponent,
    AddQuizComponent,
    ViewStudentLevelComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
})
export class StudentModule {}
