import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByNamePipe } from './filter-by-name.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterByNamePipe],
  exports: [FilterByNamePipe]
})
export class FilterByNameModule { }
