import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth/auth.guard';
import { RelatoriosComponent } from './relatorios.component';
import { RelatoriosProducaoComponent } from './relatorios-producao/relatorios-producao.component';
import { InformeMensalComponent } from './informe-mensal/informe-mensal.component';
import { LaudosPeriodoComponent } from './laudos-periodo/laudos-periodo.component';

const routes: Routes = [
    {
        path: '',
        component: RelatoriosComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'informe-mensal',
            },
            {
                path: 'producao',
                component: RelatoriosProducaoComponent,
            },
            {
                path: 'informe-mensal',
                component: InformeMensalComponent
            },
            {
                path: 'laudos-periodo',
                component: LaudosPeriodoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RelatoriosRoutingModule { }