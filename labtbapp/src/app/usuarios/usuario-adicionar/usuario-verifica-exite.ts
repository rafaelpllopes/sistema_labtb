import { AbstractControl } from '@angular/forms';
import { Injectable } from "@angular/core";

import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { UsuariosService } from '../usuarios.service';


@Injectable()
export class UserNotTakenValidatorService {
    constructor(private service: UsuariosService) {}

    checkUserNameTaken() {

        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName =>
                   this.service.usuarioExite(userName)
                ))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true} : null))
                .pipe(first());
        }
    }
}