import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})
export class ListaTrabajosService {

  private API_URL = GlobalUrl.BASE_URL + 'api/empleos/publicaciones';
  private API_URL2 = GlobalUrl.BASE_URL + 'api/empleos/find/by';

  constructor(private http: HttpClient) { }

  ListaDeTrabajos(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  BusquedaListaParametros(nombrework:any,city:any,category:any,periodopubli:any,exp:any): Observable <any> {   
    return this.http.get(`${this.API_URL2}?puestotrabajo=${nombrework}&ciudad=${city}&categoria=${category}&periodopublicacion=${periodopubli}&experiencia=${exp}`);
  }
}
