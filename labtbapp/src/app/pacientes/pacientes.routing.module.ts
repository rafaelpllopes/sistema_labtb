import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesComponent } from './pacientes.component';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacienteDetalhesComponent } from './paciente-detalhes/paciente-detalhes.component';
import { PacienteAdicionarComponent } from './paciente-adicionar/paciente-adicionar.component';

const routes: Routes = [
    {
        path: '',
        component: PacientesComponent,
        children: [
            {
                path: '',
                component: PacientesListComponent
            },
            {
                path: 'detalhes/:id',
                component: PacienteDetalhesComponent
            },
            {
                path: 'novo',
                component: PacienteAdicionarComponent
            },
            {
                path: 'editar/:id',
                component: PacienteAdicionarComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PacientesRoutingModule { }