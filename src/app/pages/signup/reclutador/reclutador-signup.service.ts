import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReclutadorSignupRequest } from './reclutador-signup-interface';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})

export class ReclutadorSignupService {

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador/signup';

  constructor(private http: HttpClient) { }

  auxlogo = new File([], '');

  SignUpReclutador(usuario: ReclutadorSignupRequest, logoempresa: File): Observable<any> {

    const reclutadordata = new Blob([JSON.stringify(usuario)], {type: 'application/json'})

    var reclutador: FormData = new FormData();

    reclutador.append('usuario', reclutadordata);

    if (logoempresa != null) {
      reclutador.append('logo', logoempresa);
    } else {
      reclutador.append('logo', this.auxlogo);
    }
    
    return this.http.post(
      this.API_URL, 
      reclutador);
  }
}
