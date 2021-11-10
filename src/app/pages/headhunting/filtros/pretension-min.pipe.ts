import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pretensionMin'
})
export class PretensionMinPipe implements PipeTransform {

  transform(value: any, FilterPostPretensionMin: number,filterMetadata:any): any {
    if (!value || !FilterPostPretensionMin) {
      return value;
  }

  
  let filteredItems = value.filter((lista: any) => {
    return lista.sueldoPostulante >= FilterPostPretensionMin
  })

  filterMetadata.count = filteredItems.length;
  return filteredItems;
   
  }

}
