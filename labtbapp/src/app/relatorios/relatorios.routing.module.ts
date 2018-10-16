import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/auth/auth.guard';
import { RelatoriosComponent } from './relatorios.component';
import { RelatoriosProducaoComponent } from './relatorios-producao/relatorios-producao.component';
import { RelatoriosLaudosComponent } from './relatorios-laudos/relatorios-laudos.component';

const routes: Routes = [
    {
        path: '',
        component: RelatoriosComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'producao',
                component: RelatoriosProducaoComponent
            },
            {
                path: 'laudos',
                component: RelatoriosLaudosComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RelatoriosRoutingModule { }