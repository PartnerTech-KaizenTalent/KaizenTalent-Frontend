import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pretensionMax'
})
export class PretensionMaxPipe implements PipeTransform {

  transform(value: any, FilterPostPretensionMax: number,filterMetadata:any): any {
    if (!value || !FilterPostPretensionMax) {
      return value;
  }

  let filteredItems = value.filter((lista: any) => {
    return lista.sueldoPostulante <= FilterPostPretensionMax
  })

  filterMetadata.count = filteredItems.length;
  return filteredItems;
  
  }

}
