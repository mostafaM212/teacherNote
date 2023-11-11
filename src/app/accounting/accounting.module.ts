import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { HomeAccountingComponent } from './home-accounting/home-accounting.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [HomeAccountingComponent],
  imports: [CommonModule, AccountingRoutingModule, AngularMaterialModule],
})
export class AccountingModule {}
