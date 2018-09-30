import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { LaudosService } from '../laudos.service';
import { LaudosList } from './laudos-list';

@Injectable({ providedIn: 'root' })
export class LaudosListResolver implements Resolve<Observable<LaudosList[]>> {
    constructor(private service: LaudosService) {}

    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) {
        return this.service.getLaudos(1);
    }
}