import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesListComponent } from './pacientes-list.component';
import { RouterModule } from '@angular/router';
import { SearchModule } from '../../shared/components/search/search.module';
import { FilterByNameModule } from '../../shared/pipes/filter-by-name/filter-by-name.module';
import { ButtomLoadModule } from '../../shared/components/buttom-load/buttom-load.module';
import { SexoNomeModule } from '../../shared/pipes/sexo-nome/sexo-nome.module';

@NgModule({
  imports: [
    CommonModule,
    SearchModule,
    RouterModule,
    FilterByNameModule,
    ButtomLoadModule,
    SexoNomeModule
  ],
  declarations: [PacientesListComponent]
})
export class PacientesListModule { }
