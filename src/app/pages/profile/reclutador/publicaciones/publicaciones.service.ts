import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador';

  constructor(private http: HttpClient) { }

  BasicInfo(id: any): Observable<any> {
    return this.http.get(
      `${this.API_URL}/${id}/profile/basicinfo`);
  }
}
