import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienciaLaboral'
})
export class ExperienciaLaboralPipe implements PipeTransform {

  transform(items: any[], experienciaLaboral: (item: any) => any): any {
    
    if (!items || !experienciaLaboral) {
        return items;
    }
    return items.filter(item => experienciaLaboral(item));
}

}
