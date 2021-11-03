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
export class PostulanteDetailService {

  constructor(private http:HttpClient) { }

  private API_URL = GlobalUrl.BASE_URL + 'api/headhunting';

  getEducacion(idpost:any): Observable<any> {
    return this.http.get(`${this.API_URL}/postulante/${idpost}/educacion/show`);
  }

  getExperiencia(idpost:any): Observable<any> {
    return this.http.get(`${this.API_URL}/postulante/${idpost}/experiencialaboral/show`);
  }
  getPostulantesByempleo(idpostu:any) : Observable<any> {
    return this.http.get(`${this.API_URL}/postulante/${idpostu}/profile/basicinfo`);
  }

  getReferencia(idpostu:any) : Observable<any> {
    return this.http.get(`${this.API_URL}/postulante/${idpostu}/referencialaboral/show`);
  }
  getHabilidades(idpostu:any) : Observable<any> {
    return this.http.get(`${this.API_URL}/postulante/${idpostu}/habilidad/show`);    
  }
  getConocimientos(idpostu:any) : Observable<any> {
    return this.http.get(`${this.API_URL}/postulante/${idpostu}/conocimiento/show`);
  }
  getIdioma(idpostu:any) : Observable<any> {
    return this.http.get(`${this.API_URL}/postulante/${idpostu}/idioma/show`);
  }
}


