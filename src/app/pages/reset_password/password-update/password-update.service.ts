import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PasswordUpdate } from './password-update-interface';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PasswordUpdateService {

  private API_URL = GlobalUrl.BASE_URL + 'api/restore_password/update';

  constructor(private http: HttpClient) { }

  /*GetPasswordUpdateTemplate(token: any): Observable<any> {
    
    return this.http.get(`${BASE_URL}/${token}`);
  }*/

  PasswordUpdate(passwordUpdate: PasswordUpdate): Observable<any> {

    return this.http.put(
      this.API_URL,
      passwordUpdate,
      httpOptions
    );
  }
}
