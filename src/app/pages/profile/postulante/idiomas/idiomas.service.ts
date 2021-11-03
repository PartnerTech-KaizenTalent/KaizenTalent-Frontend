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
export class IdiomasService {

  private API_URL = GlobalUrl.BASE_URL+ 'api/postulante';
  private API_URL2 = GlobalUrl.BASE_URL+ 'api'; 

  constructor(private http:HttpClient) { }

  guardarIdioma(id: any, idioma: any): Observable<any> {

    return this.http.post(
      `${this.API_URL}/${id}/agregar/idioma`, 
      idioma,
      httpOptions); 
  }

  mostrarIdioma(id:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/idioma/show`);
  }

  borrarIdioma(id:any): Observable<any>{
    return this.http.delete(`${this.API_URL2}/idioma/${id}/delete`);
  }

  actualizarIdioma(id:any, idi:any, idioma:any): Observable<any>{
    return this.http.put(`${this.API_URL}/${id}/idioma/${idi}/update`, idioma);


  }

}
