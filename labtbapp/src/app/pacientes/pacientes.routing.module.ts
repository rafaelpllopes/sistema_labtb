import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesComponent } from './pacientes.component';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacienteDetalhesComponent } from './paciente-detalhes/paciente-detalhes.component';
import { PacienteAdicionarComponent } from './paciente-adicionar/paciente-adicionar.component';
import { AuthGuard } from '../core/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: PacientesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: PacientesListComponent,
                data: {
                    title: 'Lista de pacientes'
                }
            },
            {
                path: 'detalhes/:id',
                component: PacienteDetalhesComponent,
                data: {
                    title: 'Detalhes do paciente'
                }
            },
            {
                path: 'novo',
                component: PacienteAdicionarComponent,
                data: {
                    title: 'Cadastrar paciente'
                }
            },
            {
                path: 'editar/:id',
                component: PacienteAdicionarComponent,
                data: {
                    title: 'Editar paciente'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PacientesRoutingModule { }