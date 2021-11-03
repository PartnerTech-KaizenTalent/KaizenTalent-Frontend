import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ContactanosService {

  private API_URL = GlobalUrl.BASE_URL + 'api/contactanos/send_email';

  constructor(private http: HttpClient) { }

  Contactanos(mensaje: any): Observable<any> {
    return this.http.post(
      this.API_URL,
      mensaje,
      httpOptions
    );
  }
}



