import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexoNome'
})
export class SexoNomePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.toUpperCase() === 'M' ? "Masculino" : "Feminino";
  }

}
