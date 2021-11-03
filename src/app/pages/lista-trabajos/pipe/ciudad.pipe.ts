import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ciudad'
})
export class CiudadPipe implements PipeTransform {

  transform(value: any, FilterPostCiudad: any): any {
    if (!value || !FilterPostCiudad) {
      return value;
  }

  let filteredItems = value.filter((empleo: any) => {
    return empleo.ciudadPuestoTrabajo.toLowerCase().includes(FilterPostCiudad.toLowerCase())
  })

  return filteredItems;

  }
}
