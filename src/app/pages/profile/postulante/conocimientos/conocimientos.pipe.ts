import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conocimientos'
})
export class ConocimientosPipe implements PipeTransform {

  transform(items: any[], conocimientos: (item: any) => any): any {
    
    if (!items || !conocimientos) {
        return items;
    }
    return items.filter(item => conocimientos(item));
}


}
