import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'palabraclave'
})
export class PalabraClavePipe implements PipeTransform {

  transform(value: any, FilterPostPalabraClave: any,filterMetadata:any): any {

    if (!value || !FilterPostPalabraClave) {
      return value;  
    }


    let filteredItems = value.filter((list: any) => {
      return list.experiencialaboralPostulante.descripcionExperienciaLaboral.toLowerCase().includes(FilterPostPalabraClave.toLowerCase()) ||
      list.experiencialaboralPostulante.puestoExperienciaLaboral.toLowerCase().includes(FilterPostPalabraClave.toLowerCase())
    })

    filterMetadata.count = filteredItems.length;
    return filteredItems;
     
  }
}
