import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SexoNomePipe } from './sexo-nome.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SexoNomePipe],
  exports: [SexoNomePipe]
})
export class SexoNomeModule { }
