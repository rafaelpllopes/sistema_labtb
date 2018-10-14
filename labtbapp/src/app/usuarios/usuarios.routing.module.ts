import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth/auth.guard';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';
import { UsuarioDetalhesComponent } from './usuario-detalhes/usuario-detalhes.component';
import { UsuarioAdicionarComponent } from './usuario-adicionar/usuario-adicionar.component';

const routes: Routes = [
    {
        path: '',
        component: UsuariosComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: UsuariosListaComponent,
                data: {
                    title: 'Lista de usuarios'
                }
            },
            {
                path: 'detalhes/:id',
                component: UsuarioDetalhesComponent,
                data: {
                    title: 'Detalhes do usuario'
                }
            },
            {
                path: 'novo',
                component: UsuarioAdicionarComponent,
                data: {
                    title: 'Cadastrar usuario'
                }
            },
            {
                path: 'editar/:id',
                component: UsuarioAdicionarComponent,
                data: {
                    title: 'Editar usuario'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }