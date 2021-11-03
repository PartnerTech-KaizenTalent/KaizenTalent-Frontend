import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})
export class NoActiveEmpleoService {

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador/profile/noactiveposts';
  private API_URL2 = GlobalUrl.BASE_URL + 'api/publicacion';
  private API_URL3 = GlobalUrl.BASE_URL + 'api/publicacion';

  constructor(private http:HttpClient) { }
  
  getPublicacionNoActive(idno:any){
    return this.http.get(`${this.API_URL}?id=${idno}`);
  }

  deleteEmpleo(idborrar: any) : Observable<any> {
    return this.http.delete(`${this.API_URL2}/${idborrar}/delete`);
  }

  refreshNoActiveToActive(idpubli:any){
    return this.http.get(`${this.API_URL}/${idpubli}/refresh`);
  }

}
