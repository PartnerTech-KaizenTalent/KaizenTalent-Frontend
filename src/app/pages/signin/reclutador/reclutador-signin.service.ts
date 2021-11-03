import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';
import { ReclutadorSignin } from './reclutador-signin-interface';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReclutadorSigninService {

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador/signin';

  constructor(private http: HttpClient) { }

  SignInReclutador(usuario: ReclutadorSignin): Observable<any> {
    return this.http.post(
      this.API_URL,
      usuario,
      httpOptions
    ); 
  }
}
