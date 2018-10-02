import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdadeCalcPipe } from './idade-calc.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IdadeCalcPipe],
  exports: [IdadeCalcPipe]
})
export class IdadeCalcModule { }
