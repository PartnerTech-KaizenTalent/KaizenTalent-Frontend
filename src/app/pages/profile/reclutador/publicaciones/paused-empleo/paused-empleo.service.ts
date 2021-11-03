
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

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador/profile/pausedposts';
  private API_URL2 = GlobalUrl.BASE_URL + 'api/publicacion/update/estado/activo';
  private API_URL3 = GlobalUrl.BASE_URL + 'api/publicacion';

  constructor(private http:HttpClient) { }

  getPublicacionPaused(idpau:any){
    return this.http.get(`${this.API_URL}?id=${idpau}`);
  }

  
  putPublicacionactivar(idactivar:any): Observable<any>{

    return this.http.put(this.API_URL2,
                         idactivar,
                         httpOptions);               
  }
  
  deleteEmpleo(idborrar: any) : Observable<any> {
    return this.http.delete(`${this.API_URL3}/${idborrar}/delete`);
  }

}
