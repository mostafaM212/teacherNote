import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';
import { authMatchGuard } from './guards/auth-match.guard';

const routes: Routes = [
  {
    path: 'auth',
    // canActivate: [notAuthGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'group',
    canActivate: [authGuard],

    loadChildren: () =>
      import('./group/group.module').then((m) => m.GroupModule),
  },
  {
    path: 'student',
    canActivate: [authGuard],

    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
  },
  {
    canMatch: [authMatchGuard],
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
