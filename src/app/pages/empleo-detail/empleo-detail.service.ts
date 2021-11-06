import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmpleoDetailService {

  private API_URL = GlobalUrl.BASE_URL + 'api/publicacion';
  private API_URL2 = GlobalUrl.BASE_URL + 'api/postulante';

  constructor(private http:HttpClient) { }

  getdetalleLista(id:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/detail`);
  }
  
  PostularTrabajoenDetalle(idpostulante:any,idpublicacion:any): Observable<any> {

    return this.http.post(
      this.API_URL2+`/${idpostulante}/postular/publicacion/${idpublicacion}`,
      httpOptions);
  }


}