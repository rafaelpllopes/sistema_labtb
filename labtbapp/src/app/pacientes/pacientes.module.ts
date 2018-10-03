import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PacientesComponent } from './pacientes.component';
import { PacientesListModule } from './pacientes-list/pacientes-list.module';
import { PacientesRoutingModule } from './pacientes.routing.module';
import { PacienteDetalhesComponent } from './paciente-detalhes/paciente-detalhes.component';
import { SexoNomeModule } from '../shared/pipes/sexo-nome/sexo-nome.module';

@NgModule({
  imports: [
    CommonModule,
    PacientesListModule,
    PacientesRoutingModule,
    RouterModule,
    SexoNomeModule
  ],
  declarations: [
    PacientesComponent,
    PacienteDetalhesComponent
  ]
})
export class PacientesModule { }
