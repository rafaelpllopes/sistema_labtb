import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SigninComponent } from './signin/signin.component';
import { VmessageModule } from '../shared/vmessage/vmessage.module';
import { AlertModule } from '../shared/components/alert/alert.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VmessageModule,
    AlertModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    SigninComponent
  ]
})
export class HomeModule { }
