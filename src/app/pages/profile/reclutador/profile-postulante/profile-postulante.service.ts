import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ProfilePostulanteService {

  private API_URL = GlobalUrl.BASE_URL + 'api/postulante';

  constructor(private http:HttpClient) { }


  BasicInfo(idb: any): Observable<any> {
    return this.http.get(
      `${this.API_URL}/${idb}/profile/basicinfo`);
  }

  mostrarConocimiento(id:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/conocimiento/show`);
  }

  mostrarEducacion(id:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/educacion/show`);
  }

  mostrarExperiencia(id:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/experiencialaboral/show`);
  }

  mostrarHabilidad(id:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/habilidad/show`);
  }
  
  mostrarIdioma(id:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/idioma/show`);
  }

  mostrarReferencia(id:any): Observable<any>{
    return this.http.get(`${this.API_URL}/${id}/referencialaboral/show
    `)
  }


}

