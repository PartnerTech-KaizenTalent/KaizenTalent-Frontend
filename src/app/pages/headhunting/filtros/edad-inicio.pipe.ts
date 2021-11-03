import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edadInicio'
})
export class EdadInicioPipe implements PipeTransform {

  transform(value: any, FilterPostEdadInicio: number,filterMetadata:any): any {
    if (!value || !FilterPostEdadInicio) {
      return value;
  }

  let filteredItems = value.filter((lista: any) => {
    return lista.edadPostulante >= FilterPostEdadInicio
  })

  filterMetadata.count = filteredItems.length;
  return filteredItems;
   
  }
}
