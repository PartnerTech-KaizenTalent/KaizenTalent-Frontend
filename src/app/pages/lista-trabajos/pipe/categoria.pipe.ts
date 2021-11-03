import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoria'
})
export class CategoriaPipe implements PipeTransform {

  transform(value: any, FilterPostCategoria: any): any {
    if (!value || !FilterPostCategoria) {
      return value;
  }

  let filteredItems = value.filter((empleo: any) => {
    return empleo.categoriaEmpresa.toLowerCase().includes(FilterPostCategoria.toLowerCase())
  })

  return filteredItems;

  }

}
