import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idioma'
})
export class IdiomaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const lista of value) {
      if(lista.idiomasPostulante !== null){
        if (lista.idiomasPostulante.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultPosts.push(lista);
        };
      }      

    };
    return resultPosts;
  }

}
