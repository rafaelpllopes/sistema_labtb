import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacientesComponent } from './pacientes.component';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';

const routes: Routes = [
    {
        path: '',
        component: PacientesComponent,
        children: [
            {
                path: '',
                component: PacientesListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PacientesRoutingModule { }