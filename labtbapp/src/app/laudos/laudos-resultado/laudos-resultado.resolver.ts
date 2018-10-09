import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { LaudosService } from '../laudos.service';


@Injectable({ providedIn: 'root' })
export class LaudosResultadoResolver implements Resolve<Observable<any>> {
    constructor(private service: LaudosService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        const id = route.params.id;
        return this.service.getLaudoById(id);
    }
}