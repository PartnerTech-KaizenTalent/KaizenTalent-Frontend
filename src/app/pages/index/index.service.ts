import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})

export class IndexService {

  private API_URL = GlobalUrl.BASE_URL + 'api/index/publicaciones';
  
  constructor(private http:HttpClient) { }

  getListaparams(): Observable<any> {
    return this.http.get(this.API_URL);
  }

}

  

