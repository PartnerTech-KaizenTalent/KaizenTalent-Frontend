import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoJornada'
})
export class TipoJornadaPipe implements PipeTransform {

  transform(value: any, FilterPostTipoJornada: any): any {
    if (!value || !FilterPostTipoJornada) {
      return value;
  }

  let filteredItems = value.filter((empleo: any) => {
    return empleo.tipojornadaPuestoTrabajo.toLowerCase().includes(FilterPostTipoJornada.toLowerCase())
  })

  return filteredItems;

  }
}
