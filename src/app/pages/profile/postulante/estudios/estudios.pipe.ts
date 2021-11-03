import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estudios'
})
export class EstudiosPipe implements PipeTransform {

  transform(items: any[], estudios: (item: any) => any): any {
    
    if (!items || !estudios) {
        return items;
    }
    return items.filter(item => estudios(item));
}

}
