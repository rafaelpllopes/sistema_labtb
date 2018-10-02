import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtomLoadComponent } from './buttom-load.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ButtomLoadComponent],
  exports: [ButtomLoadComponent]
})
export class ButtomLoadModule { }
