import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaudosComponent } from './laudos.component';
import { LaudosRoutingModule } from './laudos.routing.module';
import { LaudosListModule } from './laudos-list/laudos-list.module';
import { LaudosDetalhesComponent } from './laudos-detalhes/laudos-detalhes.component';
import { LaudosResultadoComponent } from './laudos-resultado/laudos-resultado.component';
import { SexoNomePipe } from './sexo-nome.pipe';
import { LaudosAdicionarComponent } from './laudos-adicionar/laudos-adicionar.component';
import { VmessageModule } from '../shared/vmessage/vmessage.module';
import { IdadeCalcPipe } from './idade-calc.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LaudosListModule,
    LaudosRoutingModule,
    VmessageModule
  ],
  declarations: [
    LaudosComponent,
    LaudosDetalhesComponent,
    LaudosResultadoComponent,
    LaudosAdicionarComponent,
    IdadeCalcPipe,
    SexoNomePipe
  ]
})
export class LaudosModule { }