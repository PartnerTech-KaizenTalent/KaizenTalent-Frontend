import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ExperienciaLaboralService {

  private API_URL = GlobalUrl.BASE_URL + 'api/experiencialaboral';
  private API_URL2 = GlobalUrl.BASE_URL + 'api/postulante';

  constructor(private http: HttpClient) { }

  guardarExperiencia(id: any, experiencia: any): Observable<any> {

    return this.http.post(
      `${this.API_URL2}/${id}/agregar/experiencialaboral`, 
      experiencia,
      httpOptions); 
  }

  mostrarExperiencia(id:any): Observable<any> {
    return this.http.get(`${this.API_URL2}/${id}/experiencialaboral/show`);
  }
  

  mostrarReferencia(id:any): Observable<any>{
    return this.http.get(`${this.API_URL2}/${id}/referencialaboral/show
    `)
  }

  borrarExperiencia(id:any): Observable<any>{
    return this.http.delete(`${this.API_URL}/${id}/delete`);
  }

  actualizarExperiencia(id:any, idxp:any, experienciar:any): Observable<any>{
    return this.http.put(`${this.API_URL2}/${id}/experiencialaboral/${idxp}/update`, experienciar);


  }
}
