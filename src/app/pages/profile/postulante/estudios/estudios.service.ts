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
export class EstudiosService {

  private API_URL1 = GlobalUrl.BASE_URL + 'api/educacion';
  private API_URL2 = GlobalUrl.BASE_URL + 'api/postulante';

  constructor(private http: HttpClient) { }

  guardarEducacion(id:any, educacion:any): Observable<any> {

    return this.http.post(
      `${this.API_URL2}/${id}/agregar/educacion`, 
      educacion,
      httpOptions);
  }
  
  mostrarEducacion(id:any): Observable<any> {
    return this.http.get(`${this.API_URL2}/${id}/educacion/show`);
  }

  borrarEducacion(id:any): Observable<any>{
    return this.http.delete(`${this.API_URL1}/${id}/delete`);
  }

  actualizarEducacion(idpostulante:any, id:any, educacionr:any): Observable<any>{
    return this.http.put(`${this.API_URL2}/${idpostulante}/educacion/${id}/update`, educacionr);
    //@PutMapping("/postulante/{idpostulante}/educacion/{ideducacion}/update")
  }
}
