import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ciudad'
})
export class CiudadPipe implements PipeTransform {

  transform(value: any, FilterPostCiudad: any,filterMetadata:any): any {
    if (!value || !FilterPostCiudad) {
      return value;
  }

  let filteredItems = value.filter((list: any) => {
    return list.ciudadPostulante.toLowerCase().includes(FilterPostCiudad.toLowerCase())
  })

  filterMetadata.count = filteredItems.length;
  return filteredItems;

  }
}
