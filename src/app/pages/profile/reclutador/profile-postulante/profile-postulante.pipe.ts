import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profilePostulante'
})
export class ProfilePostulantePipe implements PipeTransform {

  transform(items: any[], profilePostulante: (item: any) => any): any {
    
    if (!items || !profilePostulante) {
        return items;
    }
    return items.filter(item => profilePostulante(item));
}
}
