import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PublicarEmpleoService {

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador';

  constructor(private http: HttpClient) { }
  
  Publicar(puesto:any,id:any): Observable<any> {
    return this.http.post(
      this.API_URL+`/${id}/publicar`,
      puesto,
      httpOptions
    );
  }
}
