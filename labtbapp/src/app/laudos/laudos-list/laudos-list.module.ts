import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LaudosListPipe } from './laudos-list.pipe';
import { LaudosSearchComponent } from './laudos-search/laudos-search.component';
import { LoadListButtomComponent } from './load-list-buttom/load-list-buttom.component';
import { LaudosListComponent } from './laudos-list.component';
import { LaudosService } from '../laudos.service';
import { LaudosListResolver } from './laudos-list.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LaudosListComponent,
    LaudosListPipe,
    LaudosSearchComponent,
    LoadListButtomComponent,
  ],
  providers: [
    LaudosListResolver
  ]
})
export class LaudosListModule { }
