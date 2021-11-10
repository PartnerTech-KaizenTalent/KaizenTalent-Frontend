import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conocimiento'
})
export class ConocimientoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const lista of value) {
      if(lista.conocimientosPostulante !== null){
        if (lista.conocimientosPostulante.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultPosts.push(lista);
        };
      }     

    };
    return resultPosts;
  }

    

}
