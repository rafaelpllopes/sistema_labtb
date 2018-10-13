import { ValidatorFn, FormGroup } from "@angular/forms";

export const mesAno: ValidatorFn = (formGroup: FormGroup) => {
    const mes = formGroup.get('mes').value;
    const ano = formGroup.get('ano').value;

    if(!mes && !ano) {
        return null;
    } 
    
    if(mes && ano) {
        return null;
    } else {
        return { mesAno: true };
    }

};