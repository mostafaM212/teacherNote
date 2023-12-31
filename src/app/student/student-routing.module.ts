import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewStudentLevelComponent } from './view-student/view-student-level/view-student-level.component';

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent,
  },
  {
    path: 'add',
    component: AddEditStudentComponent,
  },
  {
    path: 'edit/:id',
    component: AddEditStudentComponent,
  },
  {
    path: 'view/:id',
    component: ViewStudentComponent,
  },
  {
    path: 'view/level/:id',
    component: ViewStudentLevelComponent,
  },
  {
    path: 'view/:id',
    component: ViewStudentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
