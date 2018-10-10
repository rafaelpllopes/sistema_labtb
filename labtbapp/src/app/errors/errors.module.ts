import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorsComponent } from './global-errors/global-errors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [GlobalErrorsComponent, NotFoundComponent]
})
export class ErrorsModule { }
