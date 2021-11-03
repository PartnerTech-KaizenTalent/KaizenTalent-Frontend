import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReclutadorSignupRequest } from './reclutador-signup-interface';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ReclutadorSignupService {

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador/signup';

  constructor(private http: HttpClient) { }

  auxlogo = new File([], '');

  SignUpReclutador(usuario: ReclutadorSignupRequest): Observable<any> {  
        
    return this.http.post(
      this.API_URL, 
      usuario,
      httpOptions);
  }
}
