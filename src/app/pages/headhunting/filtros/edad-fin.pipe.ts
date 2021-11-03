import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edadFin'
})
export class EdadFinPipe implements PipeTransform {

  transform(value: any, FilterPostEdadFin: number,filterMetadata:any): any {
    if (!value || !FilterPostEdadFin) {
      return value;
  }

  let filteredItems = value.filter((lista: any) => {
    return lista.edadPostulante <= FilterPostEdadFin
  })

  filterMetadata.count = filteredItems.length;
  return filteredItems;
  
  }

}
