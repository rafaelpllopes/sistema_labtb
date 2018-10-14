import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';
import { UsuarioAdicionarComponent } from './usuario-adicionar/usuario-adicionar.component';
import { UsuarioDetalhesComponent } from './usuario-detalhes/usuario-detalhes.component';
import { UsuariosRoutingModule } from './usuarios.routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ],
  declarations: [
    UsuariosComponent,
    UsuariosListaComponent,
    UsuarioAdicionarComponent,
    UsuarioDetalhesComponent
  ]
})
export class UsuariosModule { }
