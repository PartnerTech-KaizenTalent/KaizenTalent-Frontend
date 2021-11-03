import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeadhuntingService {

  private API_URL1 = GlobalUrl.BASE_URL + 'api/';

  constructor(private http: HttpClient) { }

  getPostulanteByHeadHunting(): Observable<any> {
    return this.http.get(`${this.API_URL1}headhunting/show/all`);
  }


}
