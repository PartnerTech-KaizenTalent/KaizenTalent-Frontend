import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})
export class EmpleoDetailService {

  private API_URL = GlobalUrl.BASE_URL + 'api/puestotrabajo';
  private API_URL2 = GlobalUrl.BASE_URL + 'api/postulante';

  constructor(private http:HttpClient) { }

  getdetalleLista(id:any): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}/detail`);
  }
  
  PostularTrabajoenDetalle(idpostulante:any,idpuesto:any): Observable<any> {

    var puestotrabajo: FormData = new FormData();

    puestotrabajo.append('idpuestotrabajo', idpuesto);

    return this.http.post(
      this.API_URL2+`/${idpostulante}/postular/puestotrabajo`,
      puestotrabajo
    );
  }

}