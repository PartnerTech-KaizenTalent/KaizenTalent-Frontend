import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postulanteDetail'
})
export class PostulanteDetailPipe implements PipeTransform {

  transform(items: any[], postulanteDetail: (item: any) => any): any {
    
    if (!items || !postulanteDetail) {
        return items;
    }
    return items.filter(item => postulanteDetail(item));
}

}
