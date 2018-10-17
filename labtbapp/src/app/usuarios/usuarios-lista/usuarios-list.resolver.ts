import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

@Injectable({ providedIn: 'root' })
export class UsuariosListResolver implements Resolve<Observable<any[]>> {
    constructor(private service: UsuariosService) {}

    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) {
        return this.service.getUsuarios(1);
    }
}