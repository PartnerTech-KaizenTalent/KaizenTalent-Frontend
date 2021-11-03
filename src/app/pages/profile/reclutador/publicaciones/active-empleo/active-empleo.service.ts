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

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador/profile/activeposts';
  private API_URL2 = GlobalUrl.BASE_URL + 'api/publicacion/update/estado/pausa';
  private API_URL3 = GlobalUrl.BASE_URL + 'api/publicacion';
  private API_URL4 = GlobalUrl.BASE_URL + 'api/reclutador';

  constructor(private http:HttpClient) { }

  getActivos(idrec:any){
    return this.http.get(`${this.API_URL}?id=${idrec}`);
  }
  
  putPublicacionpausa(idpausar:any): Observable<any>{

    return this.http.put(this.API_URL2,
                        idpausar,
                        httpOptions);               
  }  

  deleteEmpleo(idborrar: any) : Observable<any> {
    return this.http.delete(`${this.API_URL3}/${idborrar}/delete`);
  }

  putPublicacionUpdate(puestoTrabajo:any,  idreclutador:any, idactualizar:any): Observable<any>{
    return this.http.put(`${this.API_URL4}/${idreclutador}/publicacion/${idactualizar}/update`,
                          puestoTrabajo,
                          httpOptions);
  }
  
}
