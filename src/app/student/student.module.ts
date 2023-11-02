import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentListComponent,
    AddEditStudentComponent,
    ViewStudentComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
})
export class StudentModule {}
