import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idadeCalc'
})
export class IdadeCalcPipe implements PipeTransform {

  transform(value: string, args?: any): number {
    const data = value.split('-');
    const dataAtual = new Date().getFullYear();
    return dataAtual - parseInt(data[0]);
  }

}
