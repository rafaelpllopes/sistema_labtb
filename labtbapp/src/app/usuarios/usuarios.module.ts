import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';
import { UsuarioAdicionarComponent } from './usuario-adicionar/usuario-adicionar.component';
import { UsuarioDetalhesComponent } from './usuario-detalhes/usuario-detalhes.component';
import { UsuariosRoutingModule } from './usuarios.routing.module';
import { VmessageModule } from '../shared/vmessage/vmessage.module';
import { UserNotTakenValidatorService } from './usuario-adicionar/usuario-verifica-exite';
import { RouterModule } from '@angular/router';
import { UsuarioAtualizarComponent } from './usuario-atualizar/usuario-atualizar.component';
import { AlertModule } from '../shared/components/alert/alert.module';
import { ButtomLoadModule } from '../shared/components/buttom-load/buttom-load.module';

@NgModule({
  imports: [
    CommonModule,
    VmessageModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    UsuariosRoutingModule,
    AlertModule,
    ButtomLoadModule
  ],
  declarations: [
    UsuariosComponent,
    UsuariosListaComponent,
    UsuarioAdicionarComponent,
    UsuarioDetalhesComponent,
    UsuarioAtualizarComponent
  ],
  providers: [
    UserNotTakenValidatorService
  ]
})
export class UsuariosModule { }
