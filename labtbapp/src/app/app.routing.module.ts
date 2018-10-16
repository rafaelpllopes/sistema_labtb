import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { GlobalErrorsComponent } from './errors/global-errors/global-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

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
        loadChildren: './pacientes/pacientes.module#PacientesModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'laudos',
        loadChildren: './laudos/laudos.module#LaudosModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'usuarios',
        loadChildren: './usuarios/usuarios.module#UsuariosModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'relatorios',
        loadChildren: './relatorios/relatorios.module#RelatoriosModule',
        canActivate: [AuthGuard]
    },
    { 
        path: 'error', 
        component: GlobalErrorsComponent,
        data: {
            title: 'Erro'
        }
    },
    { 
        path: 'not-found', 
        component: NotFoundComponent,
        data: {
            title: 'Pagina não encontrada'
        }
    },
    { 
        path: '**', 
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: true
    })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
