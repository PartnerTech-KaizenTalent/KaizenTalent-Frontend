import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/util/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  rol: any;
  usuario: any;

  constructor(private token: TokenStorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    
      this.usuario = this.token.getUser();
      
      if(!this.usuario.token){
        this.router.navigate(['/index']);
        return false;
      }else{
        this.rol =this.usuario.authorities[0];       
        var a = 'ROLE_RECLUTADOR'
        if( this.rol.authority == a){
          return true;
        }else{
          if(this.rol.authority == "ROLE_POSTULANTE"){
          this.router.navigate(['/index']);
          return false;
        }
          this.router.navigate(['/index']);
          return false;
        }
        
    }
  
  }

  
}
