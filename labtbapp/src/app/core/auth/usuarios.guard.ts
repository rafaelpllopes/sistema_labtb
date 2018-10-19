import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class UsuariosGuard implements CanActivateChild {
    constructor(private userService: UserService, private router: Router) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.userService.getUserName() !== 'admin') {
            this.router.navigate(['laudos']);
            return false;
        }
        return true;
    }
}