import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
  },
  {
    path: 'add',
    component: AddEditGroupComponent,
  },
  {
    path: 'edit/:id',
    component: AddEditGroupComponent,
  },
  {
    path: 'view/:id',
    component: ViewGroupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
