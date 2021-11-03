import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';
import { PostulanteSignupRequest } from './postulante-signup-interface';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PostulanteSignupService {
  
  private API_URL = GlobalUrl.BASE_URL + 'api/postulante/signup';
  constructor(private http: HttpClient) { }

  SignUpPostulante(usuario: PostulanteSignupRequest): Observable<any> {        
    return this.http.post(
      this.API_URL, 
      usuario,
      httpOptions);
  }
}
