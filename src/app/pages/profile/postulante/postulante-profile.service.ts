import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicInfoPostulanteProfile } from './postulante-profile-interface';
import { GlobalUrl } from 'src/app/util/global-url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PostulanteProfileService {

  private API_URL = GlobalUrl.BASE_URL + 'api/postulante';

  auxfoto = new File([], '');
  auxcv = new File([], '');

  constructor(private http: HttpClient) { }

  BasicInfo(id: any): Observable<any> {
    return this.http.get(
      `${this.API_URL}/${id}/profile/basicinfo`);
  }

  updateLogo(foto:File, id:any): Observable<any> {

    var postulante: FormData = new FormData();

    if (foto != null) {
      postulante.append('foto', foto);
    }else {
      postulante.append('foto', this.auxfoto);
    }
    
    return this.http.put(
      this.API_URL+`/${id}/update/foto`,  
      postulante      
    )
  }

  updatecv(cv:File, id:any): Observable<any> {

    var postulante: FormData = new FormData();

    if (cv != null) {
      postulante.append('archivocv', cv);
    }else {
      postulante.append('archivocv', this.auxcv);
    }
    
    return this.http.put(
      this.API_URL+`/${id}/update/cv`,  
      postulante      
    )
  }

  UpdateBasicInfo(postulante: BasicInfoPostulanteProfile, id: any): Observable<any> {
    return this.http.put(
      this.API_URL + `/${id}/update/fields`,
      postulante,
      httpOptions);
  }
}
