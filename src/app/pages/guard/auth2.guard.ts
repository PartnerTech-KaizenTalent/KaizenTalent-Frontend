import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/util/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class Auth2Guard implements CanActivate {
  usuario: any;
  rol: any;
  
  constructor(private token: TokenStorageService, private router: Router) { }

  canActivate(){
    this.usuario = this.token.getUser();
      
      if(!this.usuario.token){
        this.router.navigate(['/index']);
        return false;
      }else{
        this.rol =this.usuario.authorities[0];       
        var b = 'ROLE_POSTULANTE'
        if( this.rol.authority == b){
          return true;
        }else{
          if(this.rol.authority == "ROLE_RECLUTADOR"){

          this.router.navigate(['/index']);
          return false;
        }
          this.router.navigate(['/index']);
          return false;
        }
        
    }

  }
  
}
