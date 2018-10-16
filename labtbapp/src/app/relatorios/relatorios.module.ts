import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosComponent } from './relatorios.component';
import { RelatoriosRoutingModule } from './relatorios.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RelatoriosProducaoComponent } from './relatorios-producao/relatorios-producao.component';
import { RelatoriosLaudosComponent } from './relatorios-laudos/relatorios-laudos.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatoriosComponent, RelatoriosProducaoComponent, RelatoriosLaudosComponent]
})
export class RelatoriosModule { }
