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
export class ActiveEmpleoService {
  
  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador';
  private API_URL2 = GlobalUrl.BASE_URL + 'api/publicacion';

  
  constructor(private http:HttpClient) { }

  getActivos(idrec:any){
    return this.http.get(`${this.API_URL}/${idrec}/profile/posts/active/`,
    httpOptions);
  }
  
  putPublicacionpausa(idpausar:any): Observable<any>{
    return this.http.put(`${this.API_URL2}/${idpausar}/update/estado/pausa`,
                        httpOptions);               
  }

  deleteEmpleo(idborrar: any) : Observable<any> {
    return this.http.delete(`${this.API_URL2}/${idborrar}/delete`);
  }

  putPublicacionUpdate(idreclutador:any, idactualizar:any, puestoTrabajo:any): Observable<any>{
    return this.http.put(`${this.API_URL}/${idreclutador}/publicacion/${idactualizar}/update`,
                          puestoTrabajo,
                          httpOptions);
  }
  
}
