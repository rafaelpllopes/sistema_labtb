import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PacientesListComponent } from './pacientes-list.component';
import { SearchModule } from '../../shared/components/search/search.module';
import { FilterByNameModule } from '../../shared/pipes/filter-by-name/filter-by-name.module';
import { ButtomLoadModule } from '../../shared/components/buttom-load/buttom-load.module';
import { SexoNomeModule } from '../../shared/pipes/sexo-nome/sexo-nome.module';
import { VmessageModule } from '../../shared/vmessage/vmessage.module';


@NgModule({
  imports: [
    CommonModule,
    SearchModule,
    RouterModule,
    FilterByNameModule,
    ButtomLoadModule,
    SexoNomeModule,
    FormsModule,
    ReactiveFormsModule,
    VmessageModule
  ],
  declarations: [PacientesListComponent]
})
export class PacientesListModule { }
