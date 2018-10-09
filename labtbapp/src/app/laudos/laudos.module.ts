import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LaudosComponent } from './laudos.component';
import { LaudosRoutingModule } from './laudos.routing.module';
import { LaudosListModule } from './laudos-list/laudos-list.module';
import { LaudosDetalhesComponent } from './laudos-detalhes/laudos-detalhes.component';
import { LaudosResultadoComponent } from './laudos-resultado/laudos-resultado.component';
import { LaudosAdicionarComponent } from './laudos-adicionar/laudos-adicionar.component';
import { VmessageModule } from '../shared/vmessage/vmessage.module';
import { IdadeCalcModule } from '../shared/pipes/idade-calc/idade-calc.module';
import { SexoNomeModule } from '../shared/pipes/sexo-nome/sexo-nome.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LaudosListModule,
    LaudosRoutingModule,
    VmessageModule,
    IdadeCalcModule,
    SexoNomeModule,
    RouterModule
  ],
  declarations: [
    LaudosComponent,
    LaudosDetalhesComponent,
    LaudosResultadoComponent,
    LaudosAdicionarComponent,
  ]
})
export class LaudosModule { }
