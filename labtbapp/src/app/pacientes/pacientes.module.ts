import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesComponent } from './pacientes.component';
import { PacientesListModule } from './pacientes-list/pacientes-list.module';
import { PacientesRoutingModule } from './pacientes.routing.module';

@NgModule({
  imports: [
    CommonModule,
    PacientesListModule,
    PacientesRoutingModule
  ],
  declarations: [
    PacientesComponent
  ]
})
export class PacientesModule { }
