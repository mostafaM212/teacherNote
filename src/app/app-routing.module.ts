import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    canMatch: [AuthService],
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    canMatch: [AuthService],
    canActivate: [AuthService],
    canActivateChild: [AuthService],
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'group',
    loadChildren: () =>
      import('./group/group.module').then((m) => m.GroupModule),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
