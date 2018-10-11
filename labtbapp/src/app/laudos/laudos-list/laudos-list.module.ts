import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LaudosListComponent } from './laudos-list.component';
import { LaudosListResolver } from './laudos-list.resolver';
import { FilterByNameModule } from '../../shared/pipes/filter-by-name/filter-by-name.module';
import { SearchModule } from '../../shared/components/search/search.module';
import { ButtomLoadModule } from '../../shared/components/buttom-load/buttom-load.module';
import { SexoNomeModule } from '../../shared/pipes/sexo-nome/sexo-nome.module';
import { IdadeCalcModule } from '../../shared/pipes/idade-calc/idade-calc.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterByNameModule,
    SearchModule,
    ButtomLoadModule,
    SexoNomeModule,
    RouterModule,
    IdadeCalcModule
  ],
  declarations: [
    LaudosListComponent
  ],
  providers: [
    LaudosListResolver
  ]
})
export class LaudosListModule { }
