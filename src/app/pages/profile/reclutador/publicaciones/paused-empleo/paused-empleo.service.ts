
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
export class PausedEmpleoService {

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador';
  private API_URL3 = GlobalUrl.BASE_URL + 'api/publicacion';

  constructor(private http:HttpClient) { }

  getPublicacionPaused(idpau:any){
    return this.http.get(`${this.API_URL}/${idpau}/profile/posts/paused`);
  }

  putPublicacionactivar(idactivar:any): Observable<any>{
    return this.http.put(`${this.API_URL3}/${idactivar}/update/estado/activo`,
                        httpOptions);               
  }
  
  deleteEmpleo(idborrar: any) : Observable<any> {
    return this.http.delete(`${this.API_URL3}/${idborrar}/delete`);
  }
  

}
