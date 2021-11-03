import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'habilidades'
})
export class HabilidadesPipe implements PipeTransform {

  transform(items: any[], habilidades: (item: any) => any): any {
    
    if (!items || !habilidades) {
        return items;
    }
    return items.filter(item => habilidades(item));
}

}
