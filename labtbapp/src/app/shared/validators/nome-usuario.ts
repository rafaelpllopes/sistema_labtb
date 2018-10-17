import { ValidatorFn, FormGroup } from "@angular/forms";

export const nomeUsuario: ValidatorFn = (formGroup: FormGroup) => {
    const usuario = formGroup.get('usuario').value;
    const nome = formGroup.get('nome').value;
   
    if(nome || usuario) {
        return null;
    } else {
        return { nomeUsuario: true };
    }

};