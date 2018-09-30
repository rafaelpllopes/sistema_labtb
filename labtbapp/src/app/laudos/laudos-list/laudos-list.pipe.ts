import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'laudosList'
})
export class LaudosListPipe implements PipeTransform {

  transform(laudos: any[], query: string) {
    if (query) {
      query = query
      .trim()
      .toLowerCase();
      
      return laudos.filter(laudo =>
        laudo.paciente_nome.toLowerCase().includes(query)
      );
    } else {
      return laudos;
    }
  }

}
