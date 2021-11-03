import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'palabraClave'
})
export class PalabraClavePipe implements PipeTransform {

  transform(value: any, FilterPostPalabraClave: any): any {
    if (!value || !FilterPostPalabraClave) {
      return value;
  }

  let filteredItems = value.filter((empleo: any) => {
    return empleo.nombrePuestoTrabajo.toLowerCase().includes(FilterPostPalabraClave.toLowerCase())
  })

  return filteredItems;

  }

}
