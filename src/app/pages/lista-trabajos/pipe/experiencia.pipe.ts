import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experiencia'
})
export class ExperienciaPipe implements PipeTransform {

  transform(value: any, FilterPostExperiencia: number): any {
    if (!value || !FilterPostExperiencia) {
      return value;
  }

  let filteredItems = value.filter((empleo: any) => {
    return empleo.experienciaPuestoTrabajo <= FilterPostExperiencia
  })

  return filteredItems;
  
  }

}
