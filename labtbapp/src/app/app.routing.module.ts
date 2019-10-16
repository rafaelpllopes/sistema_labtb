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
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'pacientes',
        loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'laudos',
        loadChildren: () => import('./laudos/laudos.module').then(m => m.LaudosModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'relatorios',
        loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosModule),
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
