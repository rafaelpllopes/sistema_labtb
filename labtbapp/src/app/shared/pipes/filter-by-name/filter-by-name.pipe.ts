import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(objs: any[], query: any) {
    if (query) {
      let numero = parseInt(query);
      if (isNaN(numero)) {
        query = query
          .trim()
          .toLowerCase();

        return objs.filter(obj =>
          obj.paciente_nome.toLowerCase().includes(query));
      } else {
        return objs.filter(obj =>
          obj.laudo_numero_geral == query);
      }
    } else {
      return objs;
    }
  }

}
