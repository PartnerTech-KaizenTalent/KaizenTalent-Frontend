import { Component, OnInit } from '@angular/core';
import { PostulanteVerifyService } from './postulante-verify.service';

@Component({
  selector: 'app-postulante-verify',
  templateUrl: './postulante-verify.component.html',
  styleUrls: []
})
export class PostulanteVerifyComponent implements OnInit {

  constructor( private postulanteVerifyService : PostulanteVerifyService) { }

  ngOnInit(): void {
    this.UserVerify();
  }

  //Variables
  message: any;
  token: any;
  isView = false;
  isView2 = false;
  //Fin Variables

  UserVerify() : void{
    
    //prod
    //console.log(location.href.slice(60))
    
    //local
    //console.log(location.href.slice(47))

    this.token = location.href.slice(47)

    var token: any = {
      utilityToken: this.token
    }    

    this.isView2 = true;


    this.postulanteVerifyService.VerifyPostulante(token).subscribe(
      data => {
        this.isView = true;
        this.isView2 = false;
        this.message = data.message;
        //this.loggedPostulante = this.tokenstorageService.getUser();
        //this.router.navigate(['/postulante/' + this.loggedPostulante.idPostulante + '/profile']);
      },
      err => {
        this.isView = false;
        this.isView2 = true;
        this.message = err.error.message;        
      }
    )
  }

  redirectTo(){
    window.location.href = '/signin/postulante'
  }

}
