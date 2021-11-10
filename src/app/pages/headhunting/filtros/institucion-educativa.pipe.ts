import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'institucionEducativa'
})
export class InstitucionEducativaPipe implements PipeTransform {

  transform(value: any, FilterPostInstitucionEducativa: any): any {
    if (!value || !FilterPostInstitucionEducativa) {
      return value;
  }
   

    return value.filter((lista: any) => {
      if(lista.institucionesPostulante !== null){
        return lista.institucionesPostulante.toLowerCase().includes(FilterPostInstitucionEducativa.toLowerCase()) 
      }
      
    })
  
  }

}
