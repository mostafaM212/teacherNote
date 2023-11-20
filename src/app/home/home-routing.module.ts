import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeeklyCalenderComponent } from './weekly-calender/weekly-calender.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calender', component: WeeklyCalenderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
