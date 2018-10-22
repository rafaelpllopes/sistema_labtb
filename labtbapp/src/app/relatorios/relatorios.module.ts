import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosComponent } from './relatorios.component';
import { RelatoriosRoutingModule } from './relatorios.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RelatoriosProducaoComponent } from './relatorios-producao/relatorios-producao.component';
import { RelatoriosLaudosComponent } from './relatorios-laudos/relatorios-laudos.component';
import { VmessageModule } from '../shared/vmessage/vmessage.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VmessageModule,
    RelatoriosRoutingModule
  ],
  declarations: [
    RelatoriosComponent,
    RelatoriosProducaoComponent,
    RelatoriosLaudosComponent
  ]
})
export class RelatoriosModule { }
