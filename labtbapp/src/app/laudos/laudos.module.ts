import { IdadeCalcPipe } from './idade-calc.pipe';
import { LaudosImprimirComponent } from './laudos-imprimir/laudos-imprimir.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaudosComponent } from './laudos.component';
import { LaudosRoutingModule } from './laudos.routing.module';
import { LaudosListModule } from './laudos-list/laudos-list.module';
import { LaudosDetalhesComponent } from './laudos-detalhes/laudos-detalhes.component';
import { LaudosResultadoComponent } from './laudos-resultado/laudos-resultado.component';
import { SexoNomePipe } from './sexo-nome.pipe';
import { LaudosAdicionarComponent } from './laudos-adicionar/laudos-adicionar.component';

@NgModule({
  imports: [
    CommonModule,
    LaudosListModule,
    LaudosRoutingModule
  ],
  declarations: [
    LaudosComponent,
    LaudosDetalhesComponent,
    LaudosImprimirComponent,
    LaudosResultadoComponent,
    LaudosAdicionarComponent,
    IdadeCalcPipe,
    SexoNomePipe
  ]
})
export class LaudosModule { }
