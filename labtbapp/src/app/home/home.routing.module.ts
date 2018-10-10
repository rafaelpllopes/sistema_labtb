import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SigninComponent } from './signin/signin.component';
import { LoginGuard } from '../core/auth/login.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [ LoginGuard ],
        children: [
            {
                path: '',
                component: SigninComponent,
                data: {
                    title: 'Login'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }