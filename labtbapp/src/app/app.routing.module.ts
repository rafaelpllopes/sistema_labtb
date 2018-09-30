import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'pacientes',
        loadChildren: './pacientes/pacientes.module#PacientesModule'
    },
    {
        path: 'laudos',
        loadChildren: './laudos/laudos.module#LaudosModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: true
    })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
