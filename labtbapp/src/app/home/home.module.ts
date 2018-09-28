import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    SigninComponent
  ]
})
export class HomeModule { }
