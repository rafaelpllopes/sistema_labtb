import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaudosComponent } from './laudos.component';
import { LaudosListComponent } from './laudos-list/laudos-list.component';
import { LaudosDetalhesComponent } from './laudos-detalhes/laudos-detalhes.component';
import { LaudosResultadoComponent } from './laudos-resultado/laudos-resultado.component';
import { LaudosImprimirComponent } from './laudos-imprimir/laudos-imprimir.component';
import { LaudosListResolver } from './laudos-list/laudos-list.resolver';
import { LaudosAdicionarComponent } from './laudos-adicionar/laudos-adicionar.component';

const routes: Routes = [
    {
        path: '',
        component: LaudosComponent,
        children: [
            {
                path: '',
                component: LaudosListComponent,
                resolve: { 
                    laudos: LaudosListResolver 
                }
            },
            {
                path: 'resultado/:id',
                component: LaudosResultadoComponent
            },
            {
                path: 'detalhes/:id',
                component: LaudosDetalhesComponent
            },
            {
                path: 'imprimir/:id',
                component: LaudosImprimirComponent
            },
            {
                path: 'novo',
                component: LaudosAdicionarComponent
            },
            {
                path: 'editar/:id',
                component: LaudosAdicionarComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LaudosRoutingModule { }