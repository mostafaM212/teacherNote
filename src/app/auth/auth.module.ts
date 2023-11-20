import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './rigister/register.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
