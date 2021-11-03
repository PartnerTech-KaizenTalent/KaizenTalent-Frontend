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
export class HabilidadesService {

  private API_URL = GlobalUrl.BASE_URL+ 'api/postulante';
  private API_URL2 = GlobalUrl.BASE_URL+ 'api';


  constructor(private http: HttpClient) { }

  guardarHabilidad(idph: any, habilidad: any): Observable<any> {

    return this.http.post(
      `${this.API_URL}/${idph}/agregar/habilidad`, 
      habilidad,
      httpOptions); 
  }

  mostrarHabilidad(id:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/habilidad/show`);
  }

  borrarHabilidad(id:any): Observable<any>{
    return this.http.delete(`${this.API_URL2}/habilidad/${id}/delete`);
  }

  actualizarHabilidad(id:any, idh:any, habilidad:any): Observable<any>{
    return this.http.put(`${this.API_URL}/${id}/habilidad/${idh}/update`, habilidad);


  }
}

