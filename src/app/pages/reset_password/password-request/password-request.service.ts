import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PasswordRequest } from './password-request-interface';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PasswordRequestService {

  private API_URL = GlobalUrl.BASE_URL + 'api/forgotpassword/sendemail';

  constructor(private http: HttpClient) { }

  PasswordRequest(passwordRequest: PasswordRequest): Observable<any> {
    
    return this.http.post(
      this.API_URL,
      passwordRequest,
      httpOptions
    );
  }
}
