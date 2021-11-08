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
export class ConocimientosService {

  private API_URL = GlobalUrl.BASE_URL+ 'api/postulante';
  private API_URL2 = GlobalUrl.BASE_URL+ 'api';


  constructor(private http: HttpClient) { }

  guardarConocimiento(idc: any, conocimiento: any): Observable<any> {

    return this.http.post(
      `${this.API_URL}/${idc}/agregar/conocimiento`, 
      conocimiento,
      httpOptions); 
  }

  mostrarConocimiento(id:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/conocimiento/show`);
  }
  
  borrarConocimiento(id:any): Observable<any>{
    return this.http.delete(`${this.API_URL2}/conocimiento/${id}/delete`);
  }

  actualizarConocimiento(id:any, idh:any, conocimiento:any): Observable<any>{
    return this.http.put(`${this.API_URL}/${id}/conocimiento/${idh}/update`, conocimiento);
  }

}
