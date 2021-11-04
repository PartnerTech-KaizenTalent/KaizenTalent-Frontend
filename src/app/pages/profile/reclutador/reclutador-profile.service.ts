import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicInfoReclutadorProfile } from './reclutador-profile-interface';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ReclutadorProfileService {

  private API_URL = GlobalUrl.BASE_URL + 'api/reclutador';

  auxlogoperfil = new File([], '');

  constructor(private http: HttpClient) { }

  BasicInfo(id: any): Observable<any> {
    return this.http.get(
      `${this.API_URL}/${id}/profile/basicinfo`);
  }

  UpdateBasicInfo(id: any, reclutador: BasicInfoReclutadorProfile): Observable<any> {
    return this.http.put(
      this.API_URL + `/${id}/update/basicinfo`,
      reclutador,
      httpOptions);
  }

  updateLogo(id:any, logo: File): Observable<any> {
  
    var reclutador: FormData = new FormData();

    if (logo != null) {
      reclutador.append('logo', logo);
    }else {
      reclutador.append('logo', this.auxlogoperfil);
    }

    return this.http.put(
      this.API_URL+`/${id}/update/logo`,
      reclutador);
  }
}
