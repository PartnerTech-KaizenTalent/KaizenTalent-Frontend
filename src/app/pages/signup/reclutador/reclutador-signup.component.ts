import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ciudades, TamañoEmpresas } from 'src/app/pages/tools/data-lists';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { CustomValidators } from '../../tools/custom-validators';
import { ReclutadorSignupRequest } from './reclutador-signup-interface';
import { ReclutadorSignupService } from './reclutador-signup.service';
declare const $:any;

@Component({
  selector: 'app-reclutador-signup',
  templateUrl: './reclutador-signup.component.html',
  styles: [`
  .alert-default {
    color: transparent;
    background-color: transparent;
    border-color: transparent;
    margin-top: -20px;
  
  }

  .alert-invalid {
    color: #ffffff;
    background-color: #dc3545;
    border-color: #dc3545;
    text-align: center;
    margin-top: 20px;
  }

  .alert-valid {
    color: #ffffff;
    background-color: #29CF2C;
    border-color: #29CF2C;
    text-align: center;
    margin-top: 20px;
  }
`]
})
export class ReclutadorSignupComponent implements OnInit {

  //Variables
  Datalist:any;
  msgerror:any;
  funciona = false;
  isVisibleReclutador = false;
  userToken: any;
  eleccion:any;
 
  //Lista de Ciudades ordenados por Nombre creado en util/data-lists
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

  alert: any = {};
  TamanioEmpresas = TamañoEmpresas;

  public reclutadorsignupForm = new FormGroup({
    
    nombreUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)")
    ])),

    ciudadUsuario: new FormControl('', Validators.compose([
      Validators.required,
      //CustomValidators.ciudadValidator(/Lima/, {ciudadlima: true}),
      //CustomValidators.ciudadValidator(/Ica/, {ciudadica: true})
    ])),
   

    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),

    numerodocumentoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(10000000000),
      Validators.max(99999999999)
    ])),
    
    usernameUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ])),    

    passwordUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { passwordnumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, {passworduppercase: true}),
      CustomValidators.patternValidator(/[a-z]/, {passwordsmallcase: true}),
      CustomValidators.patternValidator(/[@#$:\^%&]/, {passwordspecialcharacter: true})
    ])),

    contactanteempresaUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)")
    ])),

    tamanioempresaUsuario: new FormControl('', 
    Validators.required),
    
    checkear: new FormControl('', 
    Validators.required),

  }); 
  

  constructor(public fb: FormBuilder,
              private reclutadorsignupServie: ReclutadorSignupService,
              private router: Router,
              private tokenstorageService: TokenStorageService) { }

  ngOnInit() {
    this.ifLogin();
    this.AlertDefault();
  }

  AlertDefault() {
    this.alert.type = 'default';
  }

  signupSuccess = false;
  errorMessage = '';

  selectedLogo?: FileList;
  currentLogo?: File;

  message:any;

  ifLogin(){

    if(this.tokenstorageService.getUser()){
      this.userToken = this.tokenstorageService.getUser()
      if(this.userToken.idReclutador !== undefined){       
        this.router.navigate(['/reclutador/' + this.userToken.idReclutador + '/profile']);
      }
      if(this.userToken.idPostulante !== undefined){
        this.router.navigate(['/postulante/' + this.userToken.idPostulante + '/profile']);
      }
    }
    if(this.tokenstorageService.getToken() === null){
    }
  }

  seleccionarLogo(event: any): void {
    this.selectedLogo = event.target.files;
  }

  subirLogo(): any {
    if (this.selectedLogo) {
      const fotologo: File | null = this.selectedLogo.item(0);

      if (fotologo) {
        this.currentLogo = fotologo;
      }

      return this.currentLogo;
    }
  }

  LoadPage(){
    $('#start').css('cursor', 'wait');
  }

  save(e:any){
    let ciudadcita = e.target.value;
    this.eleccion = ciudadcita;
    this.msgerror = null;
  }

  guardarReclutador(): void {
    
    var usuario: ReclutadorSignupRequest = {
      nombreUsuario: this.reclutadorsignupForm.controls['nombreUsuario'].value,
      ciudadUsuario: this.reclutadorsignupForm.controls['ciudadUsuario'].value,
      emailUsuario: this.reclutadorsignupForm.controls['emailUsuario'].value,
      numerodocumentoUsuario: this.reclutadorsignupForm.controls['numerodocumentoUsuario'].value,
      passwordUsuario: this.reclutadorsignupForm.controls['passwordUsuario'].value,
      usernameUsuario: this.reclutadorsignupForm.controls['usernameUsuario'].value,
      contactanteempresaUsuario: this.reclutadorsignupForm.controls['contactanteempresaUsuario'].value,
      tamanioempresaUsuario: this.reclutadorsignupForm.controls['tamanioempresaUsuario'].value
    }

    if (this.reclutadorsignupForm.invalid) {
      $('#start').css('cursor', 'default');
      return;
    }

    try {
      this.Datalist = this.Ciudades.filter(x => x.value === this.eleccion)[0];
      console.log(this.Datalist.value);

      this.reclutadorsignupServie.SignUpReclutador(usuario).subscribe(
        data => { 
          console.log(data);
          this.alert.type = 'valid';  
          this.alert.message = data.message;
          this.signupSuccess = true;
          $('#start').css('cursor', 'default');
        },
  
        err => {
          this.signupSuccess = false;
          this.alert.type = 'invalid';  
          this.alert.message = err.error.message;
          $('#start').css('cursor', 'default');
        });
    } catch (error) {
      this.msgerror = 'Elejir una opcion de Ciudad';
      $('#start').css('cursor', 'default');
    }

  }

}



 

 
  

