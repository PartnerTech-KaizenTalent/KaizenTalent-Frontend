import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})
export class PostulacionesService {

  private API_URL = GlobalUrl.BASE_URL + 'api/postulante';

  constructor(private http: HttpClient) { }

  getMisPostulaciones(idpostu:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${idpostu}/postulaciones`)
  }
}

