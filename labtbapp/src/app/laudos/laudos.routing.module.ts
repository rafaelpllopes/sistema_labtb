import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaudosComponent } from './laudos.component';
import { LaudosListComponent } from './laudos-list/laudos-list.component';
import { LaudosDetalhesComponent } from './laudos-detalhes/laudos-detalhes.component';
import { LaudosResultadoComponent } from './laudos-resultado/laudos-resultado.component';
import { LaudosListResolver } from './laudos-list/laudos-list.resolver';
import { LaudosAdicionarComponent } from './laudos-adicionar/laudos-adicionar.component';
import { LaudosResultadoResolver } from './laudos-resultado/laudos-resultado.resolver';
import { AuthGuard } from '../core/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LaudosComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: LaudosListComponent,
                resolve: {
                    laudos: LaudosListResolver
                },
                data: {
                    title: 'Lista de laudos'
                }
            },
            {
                path: 'resultado/:id',
                component: LaudosResultadoComponent,
                resolve: {
                    laudo: LaudosResultadoResolver
                },
                data: {
                    title: 'Editar laudo'
                }
            },
            {
                path: 'detalhes/:id',
                component: LaudosDetalhesComponent,
                data: {
                    title: 'Detalhe do laudo'
                }
            },
            {
                path: 'novo',
                component: LaudosAdicionarComponent,
                data: {
                    title: 'Cadastar laudo'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LaudosRoutingModule { }