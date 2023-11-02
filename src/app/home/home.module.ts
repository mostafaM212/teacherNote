import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [HomeComponent, NavBarComponent, SideNavComponent],
  imports: [CommonModule, HomeRoutingModule, AngularMaterialModule],
  exports: [NavBarComponent, SideNavComponent],
})
export class HomeModule {}
