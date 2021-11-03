import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../util/token-storage.service';
import { Router } from '@angular/router';
import { ReclutadorProfileService } from './reclutador-profile.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BasicInfoReclutadorProfile } from './reclutador-profile-interface';
import { PasswordRequestService } from '../../reset_password/password-request/password-request.service';
import { PasswordRequest } from '../../reset_password/password-request/password-request-interface';
import { Ciudades } from '../../tools/data-lists';
import { ImageCroppedEvent} from 'ngx-image-cropper';


@Component({
  selector: 'app-reclutador-profile',
  templateUrl: './reclutador-profile.component.html',
  styleUrls: []
})

export class ReclutadorProfileComponent implements OnInit {

  isLoginFailed: boolean = false;
  croppedImage: any = '';
  imageChangedEvent: any = '';

  currentReclutador: any;
  idReclutador: any;

  basicinfoData: any = {};
  basicInfo: any = {};
  guion:any;
  passwordrequestData: any = {};

  signupSuccess = false;
  CurrentUser2: any;
  currentLogo?: File;
  selectedlogo: any;


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

  public reclutadorbasicinfoupdateForm = this.fb.group({
    
    descripcionUsuario: new FormControl('', Validators.minLength(5)),
    
    tituloUsuario: new FormControl('', Validators.minLength(3)),
    
    direccionUsuario: new FormControl('', Validators.minLength(5)),
    
    telefonoUsuario: new FormControl('', Validators.compose([
      Validators.min(1000000),
      Validators.max(999999999)
    ])),

    nombrecontactanteUsuario: new FormControl('', Validators.compose([
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)"),
      Validators.minLength(6),
      Validators.maxLength(60),
      Validators.required
    ])),

    imagenUsuario: new FormControl(null),

    ciudadUsuario: new FormControl
  });
  token: any;
  message: any;
  

  constructor(private tokenService: TokenStorageService,
              private reclutadorprofileService: ReclutadorProfileService,
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
      this.GetProfileBasicInfo();
      this.isLoginFailed = true;
    } else {
       this.token = this.tokenService.getToken()
      if( this.token.token == ""){
        this.Exit();       
      }
      this.Exit();
    }
  }

  Exit() {
    this.tokenService.signOut();
    this.router.navigate(['/signin/reclutador']);
  }

  GetProfileBasicInfo() {

    this.currentReclutador = this.tokenService.getUser();
    this.idReclutador = this.currentReclutador.idReclutador;

    this.reclutadorprofileService.BasicInfo(this.currentReclutador.idReclutador).subscribe(
      data => {
        this.basicinfoData = data;
        this.basicInfo.nombreReclutador = this.basicinfoData.nombreReclutador,
        this.basicInfo.tituloReclutador = this.basicinfoData.tituloReclutador,
        this.basicInfo.descripcionReclutador = this.basicinfoData.descripcionReclutador,
        this.basicInfo.direccionReclutador = this.basicinfoData.direccionReclutador,
        this.basicInfo.ciudadReclutador = this.basicinfoData.ciudadReclutador,
        this.basicInfo.emailReclutador = this.basicinfoData.emailReclutador,
        this.basicInfo.telefonoReclutador = this.basicinfoData.telefonoReclutador,
        this.basicInfo.nombrecontactanteReclutador = this.basicinfoData.nombrecontactanteReclutador,
        this.basicInfo.logoempresaReclutador = this.basicinfoData.logoempresaReclutador.urlImagen              

        console.log(this.basicInfo);
        if (this.basicInfo.descripcionReclutador){ 
          this.basicInfo.descripcionReclutador1 = this.basicInfo.descripcionReclutador.replace(/\n/g, '<br />');
        }
        if(this.basicInfo.direccionReclutador == null || this.basicInfo.direccionReclutador == undefined || this.basicInfo.direccionReclutador == ''){
          this.guion = ''
        }else{
          this.guion = '-'
        }
      }
    );
  }

  
  updateBasicInfo() {
    var postulante: BasicInfoReclutadorProfile = {
      descripcionUsuario: this.reclutadorbasicinfoupdateForm.controls['descripcionUsuario'].value,
      tituloUsuario: this.reclutadorbasicinfoupdateForm.controls['tituloUsuario'].value,
      direccionUsuario: this.reclutadorbasicinfoupdateForm.controls['direccionUsuario'].value,
      telefonoUsuario: this.reclutadorbasicinfoupdateForm.controls['telefonoUsuario'].value,
      nombrecontactanteUsuario: this.reclutadorbasicinfoupdateForm.controls['nombrecontactanteUsuario'].value,
      ciudadUsuario: this.reclutadorbasicinfoupdateForm.controls['ciudadUsuario'].value
    }

    if (this.reclutadorbasicinfoupdateForm.invalid) {
      return;
    }

    this.reclutadorprofileService.UpdateBasicInfo(postulante, this.currentReclutador.idReclutador).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },

      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  PasswordRequest(): void{
    var passwordRequest: PasswordRequest = {

      emailUsuario: this.basicinfoData.emailReclutador
    }
    this.passwordrequestService.PasswordRequest(passwordRequest).subscribe(
      data => {
        this.passwordrequestData = data;
        localStorage.setItem('passwordresetToken', this.passwordrequestData.passwordresetToken);
        console.log(this.passwordrequestData);
        this.message = "Se le ha enviado un enlace para que restablezca su contraseña. Por favor, revise su bandeja de entrada.";

      },
      err => {
        this.errorMessage = err.error.message;
        this.message = this.errorMessage;
      }
    )
  }

    GuardarFoto(event: any): void {
      this.selectedlogo = event.target.files;
      if (this.selectedlogo) {
        const logo: File | null = this.selectedlogo.item(0);
        if (logo) {
          this.currentLogo = logo;
          console.log(this.currentLogo);
          this.reclutadorprofileService.updateLogo(this.currentLogo,this.currentReclutador.idReclutador).subscribe(
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

    fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
    }
  

    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
    
    GuardarFotoCropper(): void {  

      var imagenbonita = this.croppedImage;
      var png = imagenbonita.split(',')[1];
      var binario = fixBinary(window.atob(png));
      var foto = new Blob([binario], {type: 'image/png'});
      var imagen_foto = new File([foto], 'imagen_foto.png', { type: 'image/png' });
  
      this.reclutadorprofileService.updateLogo(imagen_foto,this.currentReclutador.idReclutador).subscribe(
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

function fixBinary (bin:any) {
  var length = bin.length;
  var buf = new ArrayBuffer(length);
  var arr = new Uint8Array(buf);
  for (var i = 0; i < length; i++) {
    arr[i] = bin.charCodeAt(i);
  }
  return buf;
}