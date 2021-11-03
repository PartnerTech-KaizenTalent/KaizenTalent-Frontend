import { Component,ViewChild, OnInit,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TokenStorageService } from '../../../util/token-storage.service';
import { PostulanteProfileService } from './postulante-profile.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasicInfoPostulanteProfile } from './postulante-profile-interface';
import { PasswordRequestService } from '../../reset_password/password-request/password-request.service';
import { PasswordRequest } from '../../reset_password/password-request/password-request-interface';
import { Ciudades } from '../../tools/data-lists';
import { ImageCroppedEvent} from 'ngx-image-cropper';
declare const $:any;

@Component({
  selector: 'app-postulante-profile',
  templateUrl: './postulante-profile.component.html',
  styleUrls: []
})

export class PostulanteProfileComponent implements OnInit {
 
  imageChangedEvent: any = '';
  croppedImage: any = '';

  isLoginFailed: boolean = false;
  
  currentPostulante: any;
  idPostulante: any;

  basicinfoData: any = {};
  basicInfo: any = {};

  passwordrequestData: any = {};

  public postulantebasicinfoupdateForm = this.fb.group({
    
    descripcionUsuario: new FormControl('', Validators.minLength(5)),
    
    tituloUsuario: new FormControl('', Validators.minLength(3)),
    
    direccionUsuario: new FormControl('', Validators.minLength(5)),
    
    telefonoUsuario: new FormControl('', Validators.compose([
      Validators.min(1000000),
      Validators.max(999999999)
    ])),

    imagenUsuario: new FormControl(null), 

    archivocvUsuario: new FormControl(null),
    ciudadUsuario: new FormControl
  });
  
  CurrentUser2: any;
  currentLogo?: File;
  signupSuccess = false;
  selectedlogo: any;
  selectedcv: any;
  currentcv?: File;
  message:any;
  token: any;
  guion:any;

  
  Ciudades = Ciudades.sort(function (a, b) {
    if (a.text > b.text) {
      return 1;
    }

    if(a.text < b.text) {
      return -1;
    }

    else {
      return 0;
    }
  })

 
  constructor(private tokenService: TokenStorageService,
              private postulanteprofileService: PostulanteProfileService,
              private passwordrequestService: PasswordRequestService,
              private router: Router,
              private fb: FormBuilder,
              private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.Auth();
    
    
  }
  ngAfterContentChecked(){
    this.cd.detectChanges();
    this.message = this.tokenService.getCont();
  }
  errorMessage = '';

  
  Auth() {
    if (this.tokenService.getToken()) {
      this.getprofileBasicInfo();
      this.isLoginFailed = true;
    } else {
      this.token = this.tokenService.getToken()
      if( this.token.token == ""){
        this.Exit();
      }
      this.Exit();
    }
  }

  

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  



  Exit() {
    this.tokenService.signOut();
    this.router.navigate(['/signin/postulante']);
  }

  descargarcv(){
    
    if(this.basicInfo.archivocvPostulante === null || this.basicInfo.archivocvPostulante === undefined || this.basicInfo.archivocvPostulante === '' ){
      return window.location.href= '/postulante/'+this.idPostulante+'/profile';
    }
    if(this.basicInfo.archivocvPostulante !== null || this.basicInfo.archivocvPostulante !== undefined || this.basicInfo.archivocvPostulante !==  ''){
       
      return window.location.href= ''+this.basicInfo.archivocvPostulante;
    }
    return '';
  }

  getprofileBasicInfo() {
    this.currentPostulante = this.tokenService.getUser();

    this.postulanteprofileService.BasicInfo(this.currentPostulante.idUsuario).subscribe(
      data => {
        this.basicinfoData = data;
        this.basicInfo.nombrePostulante = this.basicinfoData.nombrePostulante + ' ' + this.basicinfoData.apellidoPostulante;
        this.basicInfo.apellidoPostulante = this.basicinfoData.apellidoPostulante;
        this.basicInfo.direccionPostulante = this.basicinfoData.direccionPostulante;
        this.basicInfo.ciudadPostulante = this.basicinfoData.ciudadPostulante;
        this.basicInfo.emailPostulante = this.basicinfoData.emailPostulante;
        this.tokenService.saveEmail(this.basicInfo.emailPostulante);
        this.basicInfo.telefonoPostulante = this.basicinfoData.telefonoPostulante;
        this.basicInfo.descripcionPostulante = this.basicinfoData.descripcionPostulante;
        this.basicInfo.tituloPostulante = this.basicinfoData.tituloPostulante;
        this.basicInfo.imagen = this.basicinfoData.fotoperfilPostulante.urlImagen;
        this.basicInfo.nombreimagen = this.basicinfoData.fotoperfilPostulante.nombreImagen;
        this.basicInfo.documentocvPostulante  = this.basicinfoData.documentocvPostulante.urlDocumentoCV;
        if (this.basicInfo.descripcionPostulante){ 
          this.basicInfo.descripcionPostulante2 = this.basicInfo.descripcionPostulante.replace(/\n/g, '<br />');
        }

        if(this.basicInfo.direccionReclutador == null || this.basicInfo.direccionReclutador == undefined || this.basicInfo.direccionReclutador == ''){
          this.guion = '';
        }else{
          this.guion = '-'
        }
      }
    );
  }

  updateBasicInfo() {
    var postulante: BasicInfoPostulanteProfile = {
      descripcionUsuario: this.postulantebasicinfoupdateForm.controls['descripcionUsuario'].value,
      tituloUsuario: this.postulantebasicinfoupdateForm.controls['tituloUsuario'].value,
      direccionUsuario: this.postulantebasicinfoupdateForm.controls['direccionUsuario'].value,
      telefonoUsuario: this.postulantebasicinfoupdateForm.controls['telefonoUsuario'].value,
      ciudadUsuario: this.postulantebasicinfoupdateForm.controls['ciudadUsuario'].value
    }

    if (this.postulantebasicinfoupdateForm.invalid) {
      return;
    }

    this.postulanteprofileService.UpdateBasicInfo(this.currentPostulante.idUsuario, postulante ).subscribe(
      data => {
        window.location.reload();
      },

      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  PasswordRequest(): void{
    var passwordRequest: PasswordRequest = {
      emailUsuario: this.basicinfoData.emailPostulante
    }

    console.log()
    
    this.passwordrequestService.PasswordRequest(passwordRequest).subscribe(
      data => {
        this.passwordrequestData = data;
        localStorage.setItem('passwordresetToken', this.passwordrequestData.passwordresetToken);
        this.message = "Se le ha enviado un enlace para que restablezca su contraseña. Por favor, revise su bandeja de entrada.";

      },
      err => {
        this.errorMessage = err.error.message;
        this.message = this.errorMessage;
      }
    )
  }
  
  /*

  GuardarFoto(event: any): void {
    this.selectedlogo = event.target.files;
    if (this.selectedlogo) {
      const logo: File | null = this.selectedlogo.item(0);
      if (logo) {
        this.currentLogo = logo;
        console.log(this.currentLogo);
        this.postulanteprofileService.updateLogo(this.currentLogo,this.currentPostulante.idPostulante).subscribe(
          data => {
            this.CurrentUser2 = data;
            this.signupSuccess = true;
            window.location.reload();  
          },
          err => {
            this.errorMessage = err.error.message;
            this.signupSuccess = false;
          }
        );
      }
    }
  }*/

  GuardarFotoCropper(): void {  

    var imagenbonita = this.croppedImage;
    var png = imagenbonita.split(',')[1];
    var binario = fixBinary(window.atob(png));
    var foto = new Blob([binario], {type: 'image/png'});
    var imagen_foto = new File([foto], 'imagen_foto.png', { type: 'image/png' });

    this.postulanteprofileService.updateLogo(this.currentPostulante.idUsuario, imagen_foto).subscribe(
      data => {
        this.CurrentUser2 = data;
        this.signupSuccess = true;
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.signupSuccess = false;
      }
    );
  }

  GuardarCV(event:any):void {
    this.selectedcv = event.target.files;
    console.log(this.selectedcv)
    if (this.selectedcv) {
      const cv: File | null = this.selectedcv.item(0);
      if (cv) {
        this.currentcv = cv;
        console.log(this.currentcv);
        this.postulanteprofileService.updatecv(this.currentPostulante.idUsuario, this.currentcv).subscribe(
          data => { 
            this.CurrentUser2 = data;
            this.signupSuccess = true;
            window.location.reload();            
          },
          err => {
            this.errorMessage = err.error.message;
            this.signupSuccess = false;
          }
        );
      }
    }
  }
    
}

function fixBinary (bin:any) {
  var length = bin.length;
  var buf = new ArrayBuffer(length);
  var arr = new Uint8Array(buf);
  for (var i = 0; i < length; i++) {
    arr[i] = bin.charCodeAt(i);
  }
  return buf;
}