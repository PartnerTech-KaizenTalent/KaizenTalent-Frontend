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

  private API_URL = GlobalUrl.BASE_URL + 'api/publicacion';

  constructor(private http:HttpClient) { }

  getEducacion(idpub:any, idpost:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${idpub}/postulante/${idpost}/profile/educacion`);
  }

  getExperiencia(idpub:any, idpost:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${idpub}/postulante/${idpost}/profile/experiencialaboral`);
  }
  getPostulantesByempleo(idpublicacion: any,idpostu:any) : Observable<any> {
    return this.http.get(`${this.API_URL}/${idpublicacion}/postulante/${idpostu}/profile/basicinfo`);
  }

  getReferencia(idpub: any,idpostu:any) : Observable<any> {
    return this.http.get(`${this.API_URL}/${idpub}/postulante/${idpostu}/profile/referencialaboral`);
  }
  getHabilidades(idpub: any,idpostu:any) : Observable<any> {
    return this.http.get(`${this.API_URL}/${idpub}/postulante/${idpostu}/profile/habilidad`);    
  }
  getConocimientos(idpub: any,idpostu:any) : Observable<any> {
    return this.http.get(`${this.API_URL}/${idpub}/postulante/${idpostu}/profile/conocimiento`);
  }
  getIdioma(idpub: any,idpostu:any) : Observable<any> {
    return this.http.get(`${this.API_URL}/${idpub}/postulante/${idpostu}/profile/idioma`);
  }
}

