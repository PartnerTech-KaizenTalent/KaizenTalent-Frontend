import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  private API_URL = GlobalUrl.BASE_URL + 'api/index/send/filterparameters';
  private API_URL2 = GlobalUrl.BASE_URL + 'api/index/show/puestostrabajo/all';
  private API_URL3 = GlobalUrl.BASE_URL + 'api/index/show/puestostrabajo/by/fulltime';
  private API_URL4 = GlobalUrl.BASE_URL + 'api/index/show/puestostrabajo/by/parttime';

  constructor(private http:HttpClient) { }

  postBusqueda(ptrabajou: string, pciudadu: string, pcategoriau:string): Observable<any> {    

    var busqueda: FormData = new FormData();

    busqueda.append('puestotrabajo', ptrabajou);
    busqueda.append('ciudad', pciudadu);
    busqueda.append('categoria', pcategoriau);   


    return this.http.post(
      this.API_URL, 
      busqueda);
  }

  getListaparamsfull(): Observable<any> {
    return this.http.get(this.API_URL3);
  }
  getListaparamspart(): Observable<any> {
    return this.http.get(this.API_URL4);
  }
  getListaparams(): Observable<any> {
    return this.http.get(this.API_URL2);
  }

}

  

