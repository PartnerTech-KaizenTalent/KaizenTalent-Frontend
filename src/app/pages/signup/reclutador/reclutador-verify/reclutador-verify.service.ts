import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReclutadorVerifyService {

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador/signup/verify';
  constructor(private http: HttpClient) { }


  VerifyReclutador(token: any): Observable<any> {
    return this.http.put(
      this.API_URL,
      token,
      httpOptions
    );
  }
}
