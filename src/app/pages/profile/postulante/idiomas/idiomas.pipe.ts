import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idiomas'
})
export class IdiomasPipe implements PipeTransform {

  transform(items: any[], idiomas: (item: any) => any): any {
    
    if (!items || !idiomas) {
        return items;
    }
    return items.filter(item => idiomas(item));
}

}
