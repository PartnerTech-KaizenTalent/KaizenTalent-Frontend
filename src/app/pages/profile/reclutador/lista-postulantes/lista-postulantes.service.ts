import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})
export class ListaPostulantesService {

  private API_URL = GlobalUrl.BASE_URL + 'api/publicacion';

  constructor(private http:HttpClient) { }  

  getPublicacionbyPostulante(idpt:any){
    return this.http.get(`${this.API_URL}/${idpt}/show/postulantes`);
  }
  
}
