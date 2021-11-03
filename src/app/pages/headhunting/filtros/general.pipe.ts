import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'general'
})
export class GeneralPipe implements PipeTransform {

  transform(items: any[], general: (item: any) => any): any {
    
    if (!items || !general) {
        return items;
    }
    return items.filter(item => general(item));
}


}
