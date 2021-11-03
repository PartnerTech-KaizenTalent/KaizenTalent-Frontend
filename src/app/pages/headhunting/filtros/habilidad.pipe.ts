import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'habilidad'
})
export class HabilidadPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const lista of value) {
      if (lista.habilidadesPostulante.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(lista);
      };
    };
    return resultPosts;
  }
}
