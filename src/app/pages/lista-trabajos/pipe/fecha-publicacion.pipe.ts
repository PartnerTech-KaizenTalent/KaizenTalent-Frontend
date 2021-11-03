import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaPublicacion'
})
export class FechaPublicacionPipe implements PipeTransform {

  transform(value: any, FilterPostFechaPublicacion: number): any {
    if (!value || !FilterPostFechaPublicacion) {
      return value;
  }

  let filteredItems = value.filter((empleo: any) => {
    return empleo.periodotranscurridoPuestoTrabajo <= FilterPostFechaPublicacion
  })

  return filteredItems;
  
  }

}
