import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PostulanteSignupService } from './postulante-signup.service';
import { PostulanteSignupRequest } from './postulante-signup-interface';
import { Ciudades, Sexos, TiposDocumento } from '../../tools/data-lists';
import { CustomValidators } from '../../tools/custom-validators';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import {NgbDatepickerI18n, NgbDateStruct, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

declare const $:any;

const I18N_VALUES:any = {
  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  }
};

@Injectable()
export class I18n {
  language = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) { super(); }

  getWeekdayShortName(weekday: number): string { return I18N_VALUES[this._i18n.language].weekdays[weekday - 1]; }
  getWeekLabel(): string { return I18N_VALUES[this._i18n.language].weekLabel; }
  getMonthShortName(month: number): string { return I18N_VALUES[this._i18n.language].months[month - 1]; }
  getMonthFullName(month: number): string { return this.getMonthShortName(month); }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.day}-${date.month}-${date.year}`; }
}


@Component({
  selector: 'app-postulante-signup',
  templateUrl: './postulante-signup.component.html',
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

  ::ng-deep div.ngb-dp-arrow > button {
    color: #00da3b;
  }
  
`],
providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},NgbDatepickerConfig]
})


export class PostulanteSignupComponent implements OnInit{
  
  message:any;
  userToken: any;
  alert: any = {};

  prueba: any ={};
  fechanacimiento: any;

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



  //Lista de Tipos de Documento
  TiposDocumento = TiposDocumento;

  //Lista de Sexos
  Sexos = Sexos;

  public postulantesignupForm = this.fb.group({
    
    nombreUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)")
    ])),

    apellidoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)")
    ])),

    ciudadUsuario: new FormControl('', 
    Validators.required),
    
    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),

    tipodocumentoUsuario: new FormControl('', 
    Validators.required),
    
    numerodocumentoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(10000000),
      Validators.max(999999999999)
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

    fechaN: new FormControl('', 
    Validators.required),        
   
    imagenUsuario: new FormControl(null),

    archivocvUsuario: new FormControl(null),
    

    checkear: new FormControl('', 
    Validators.required),

  });
  eleccion: any;
  msgerror: any;
  Datalist: any;
  elecciondocu: any;
  msgerrordoc: any;
  Datalistdoc: any;
  
  constructor(public fb: FormBuilder,
              private postulantesignupService: PostulanteSignupService,
              private router: Router,
              private tokenstorageService: TokenStorageService,
              private config:NgbDatepickerConfig
              ) { 
                config.maxDate = {year:new Date().getFullYear()-18, month:1 + new Date().getMonth(), day:new Date().getDate()}
                config.minDate = {year:new Date().getFullYear()-70, month:1 + new Date().getMonth(),day: new Date().getDate()}
                config.outsideDays = 'hidden';
                config.outsideDays = 'collapsed';
              }

  ngOnInit(): void {
    this.ifLogin();
    this.AlertDefault(); 
  }

  AlertDefault() {
    this.alert.type = 'default';
  }
  //Variables
  selectedGender:any = '';
  signupSuccess = false;
  errorMessage = '';
  selectedFotosPerfil?: FileList;
  currentFotoPerfil?: File;
  selectedArchivoCV?: FileList;
  currentArchivoCV?: File;  
  tipodocumentoValue: any;
  arreglo={
    day:'',
    month:'',
    year:''
  };

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

  LoadPage(){
    $('#start').css('cursor', 'wait');
  }

  seleccionarFotoPerfil(event: any): void {
    this.selectedFotosPerfil = event.target.files;
  }

  seleccionarArchivoCV(event: any): void {
    this.selectedArchivoCV = event.target.files;
  }

  subirFotoPerfil(): any {
    if (this.selectedFotosPerfil) {
      const fotoperfil: File | null = this.selectedFotosPerfil.item(0);

      if (fotoperfil) {
        this.currentFotoPerfil = fotoperfil;
      }

      return this.currentFotoPerfil;
    }
  }

  subirArchivoCV(): any {
    if (this.selectedArchivoCV) {
      const archivocv: File | null = this.selectedArchivoCV.item(0);

      if (archivocv) {
        this.currentArchivoCV = archivocv;
      }

      return this.currentArchivoCV;
    }
  }

  savecity(e:any){
    let ciudadcita = e.target.value;
    this.eleccion = ciudadcita;
    this.msgerror = null;
  }

  savedoc(e:any){
    let docu = e.target.value;
    this.elecciondocu = docu;
    this.msgerrordoc = null;
  }

  guardarPostulante(): void {
    
    this.prueba = this.postulantesignupForm.controls['fechaN'].value;

    if(this.prueba.day < 10){
      this.prueba.day = ("0"+this.prueba.day).slice(-2);

    }

    if(this.prueba.month < 10){
      this.prueba.month = ("0"+this.prueba.month).slice(-2);

    }

    this.tipodocumentoValue = this.postulantesignupForm.controls['tipodocumentoUsuario'].value;

    switch (this.tipodocumentoValue) {
      case 'DNI - Documento Nacional de Identidad':
        this.tipodocumentoValue = "DNI";
        break;

      case 'CE - Carné de Extranjería':
        this.tipodocumentoValue = "CE";
        break;

      case 'PAS - Pasaporte':
        this.tipodocumentoValue = "PAS";
        break;
    
      default:
        break;
    }
            
    var usuario: PostulanteSignupRequest = {
      nombreUsuario: this.postulantesignupForm.controls['nombreUsuario'].value,
      apellidoUsuario: this.postulantesignupForm.controls['apellidoUsuario'].value,
      ciudadUsuario: this.postulantesignupForm.controls['ciudadUsuario'].value,
      emailUsuario: this.postulantesignupForm.controls['emailUsuario'].value,
      tipodocumentoUsuario: this.tipodocumentoValue,
      numerodocumentoUsuario: this.postulantesignupForm.controls['numerodocumentoUsuario'].value,
      usernameUsuario: this.postulantesignupForm.controls['usernameUsuario'].value,
      passwordUsuario: this.postulantesignupForm.controls['passwordUsuario'].value,
      generoUsuario: this.selectedGender,
      fechanacimientoUsuario: this.prueba.day+"-"+this.prueba.month+"-"+this.prueba.year
    }
    
    if (this.postulantesignupForm.invalid) {
      $('#start').css('cursor', 'default');
      return;
    }
    
    try {
      this.Datalist = this.Ciudades.filter(x => x.value === this.eleccion)[0];

      this.Datalistdoc = this.TiposDocumento.filter(x => x.text === this.elecciondocu)[0];

      this.postulantesignupService.SignUpPostulante(usuario).subscribe(
        data => { 
          this.alert.type = 'valid';  
          this.alert.message = data.message;
          this.signupSuccess = true;
          $('#start').css('cursor', 'default');
    //      this.router.navigate(['/signin/postulante']); 
        },

        err => {        
          this.signupSuccess = false;
          this.alert.type = 'invalid';  
          this.alert.message = err.error.message;
          $('#start').css('cursor', 'default');
      });
      
    } catch (error) {
      if(this.Datalist === null || this.Datalist === undefined){
        this.msgerror = 'Elejir una opcion de Ciudad';
      }
      if(this.Datalistdoc === null || this.Datalistdoc === undefined){
        this.msgerrordoc = 'Elejir una opcion de Documento';
      }
      $('#start').css('cursor', 'default');
    }
  }

  //Seleccionar RadioButton(Genero)
  RBselectedGender (event:any){
    this.selectedGender = event.target.value;
  }
}
