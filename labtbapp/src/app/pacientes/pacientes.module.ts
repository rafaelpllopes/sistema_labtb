import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PacientesComponent } from './pacientes.component';
import { PacientesListModule } from './pacientes-list/pacientes-list.module';
import { PacientesRoutingModule } from './pacientes.routing.module';
import { PacienteDetalhesComponent } from './paciente-detalhes/paciente-detalhes.component';
import { SexoNomeModule } from '../shared/pipes/sexo-nome/sexo-nome.module';
import { IdadeCalcModule } from '../shared/pipes/idade-calc/idade-calc.module';
import { PacienteAdicionarComponent } from './paciente-adicionar/paciente-adicionar.component';
import { VmessageModule } from '../shared/vmessage/vmessage.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PacientesListModule,
    PacientesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SexoNomeModule,
    IdadeCalcModule,
    VmessageModule,
    RouterModule
  ],
  declarations: [
    PacientesComponent,
    PacienteDetalhesComponent,
    PacienteAdicionarComponent
  ]
})
export class PacientesModule { }
