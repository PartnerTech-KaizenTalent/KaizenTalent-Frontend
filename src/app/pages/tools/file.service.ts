import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUrl } from 'src/app/util/global-url';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private API_URL = GlobalUrl.BASE_URL;

  constructor(private http: HttpClient) { }

  getArchivocvFile(): Observable<any> {
    return this.http.get(`${this.API_URL}/cvfiles`);
  }

  getFotoFile(): Observable<any> {
    return this.http.get(`${this.API_URL}/photos`);
  }

  getLogoFile(): Observable<any> {
    return this.http.get(`${this.API_URL}/logos`);
  }

  getImages(): Observable<any> {
    return this.http.get(`${this.API_URL}/images`);
  }


}
