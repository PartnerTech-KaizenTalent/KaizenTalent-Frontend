import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';
import { PostulanteSignin } from './postulante-signin-interface';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PostulanteSigninService {

  private API_URL = GlobalUrl.BASE_URL + 'api/postulante/signin';

  constructor(private http: HttpClient) { }

  SignInPostulante(usuario: PostulanteSignin): Observable<any> {
    return this.http.post(
      this.API_URL,
      usuario,
      httpOptions
    );
  }
}
