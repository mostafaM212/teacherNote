import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTimepickerModule } from 'mat-timepicker';
@NgModule({
  declarations: [GroupListComponent, ViewGroupComponent, AddEditGroupComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatTimepickerModule,
  ],
})
export class GroupModule {}
