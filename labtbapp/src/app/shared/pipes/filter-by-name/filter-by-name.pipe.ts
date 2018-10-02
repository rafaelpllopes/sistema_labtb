import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(objs: any[], query: string) {
    if (query) {
      query = query
        .trim()
        .toLowerCase();

      return objs.filter(obj =>
        obj.paciente_nome.toLowerCase().includes(query)
      );
    } else {
      return objs;
    }
  }

}
