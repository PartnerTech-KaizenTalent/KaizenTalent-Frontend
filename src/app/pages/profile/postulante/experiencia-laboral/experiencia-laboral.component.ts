import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MesPeriodo } from '../../../tools/data-lists';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { ExperienciaLaboralService} from './experiencia-laboral.service'
import {ExperienciaLaboralPipe} from './experiencia-laboral.pipe'

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: []
})


export class ExperienciaLaboralComponent implements OnInit {
    
  ListExp: any;
  mesinicio: any;
  mesfinal: any;
  anioinicio: any;
  anio: any;
  CurrentExperiencia: any;
  postulante: any;
  nombreExperienciaLaboral: any;
  empresaExperienciaLaboral: any;

  MesPeriodo = MesPeriodo;
  MesInicio: any;
  MesFin: any;
  message: any;
  aniofinExp: any;
  emailReferente: any;
  referenteExperienciaLaboral: any;
  telefonoReferente: any;
  descripcionExperienciaLaboral: any;
  CurrentReferencia: any;
  anioactual: any;
  aniomin: any;

  toDoTaskList = [
    {id:'a', name:'a'},
    {id:'b', name:'b'},
    {id:'c', name:'c'}
  ];
  newRecordToUpdate: any
  updatedVal: any

  constructor(private tokenService: TokenStorageService,
              private ExperienciaLaboralService: ExperienciaLaboralService,
              private router: Router,
              private fb: FormBuilder,
              public modal:NgbModal,
              private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getExp();
    this.getRef();
    this.anioactual = new Date().getFullYear();    
    this.aniomin = new Date().getFullYear()-60; 
  }

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }

  //Experiencia Modal Form
  public experienciaModalForm = this.fb.group({    
    
    nombreExperienciaLaboral: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
     ])), 
    empresaExperienciaLaboral: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
     ])), 
    mesinicioExperienciaLaboral: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10)
     ])),
    anioinicioExperienciaLaboral: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(new Date().getFullYear()-60),
      Validators.max(new Date().getFullYear())
     ])), 
   
    descripcionExperienciaLaboral:  new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
     ])), 
     
    mesfinExperienciaLaboral: new FormControl(''),
    aniofinExperienciaLaboral: new FormControl(''),
    referenteReferenciaLaboral: new FormControl(''),
    emailreferenteReferenciaLaboral:  new FormControl(''),
    telefonoreferenteReferenciaLaboral:  new FormControl('', Validators.compose([
      Validators.max(999999999)
     ])), 
    }); 


   //Experiencia Update Modal Form
   public experienciaUpdateModalForm = this.fb.group({    
    
    nombreExperienciaLaboral: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
     ])), 
    empresaExperienciaLaboral: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
     ])), 
    mesinicioExperienciaLaboral: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10)
     ])), 
    anioinicioExperienciaLaboral: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(new Date().getFullYear()-60),
      Validators.max(new Date().getFullYear())
     ])), 
   
    descripcionExperienciaLaboral:  new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
     ])), 

    referenteReferenciaLaboral: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
     ])), 
     
    mesfinExperienciaLaboral: new FormControl(''),
    aniofinExperienciaLaboral: new FormControl(''),
    emailreferenteReferenciaLaboral:  new FormControl(''),
    telefonoreferenteReferenciaLaboral:  new FormControl('', Validators.compose([
      Validators.max(999999999)
     ])), 
  }); 

  

  //seleccionar experiencia

  Seleccionarexp(exp:any) {
    this.ListExp = exp;
    this.tokenService.saveExp(this.ListExp.idExperienciaLaboral);    

    this.emailReferente =  this.ListExp.emailReferente;
    this.referenteExperienciaLaboral = this.ListExp.nombreReferente;
    this.telefonoReferente = this.ListExp.telefonoReferente;
    this.descripcionExperienciaLaboral = this.ListExp.descripcionExperienciaLaboral

    switch (this.ListExp.periodofinExperienciaLaboral) {
      case 'En Curso':
        this.mesfinal = "";
        this.anio = "";
        break;
    
      default:
        var mesfinseparador = this.ListExp.periodofinExperienciaLaboral;
        this.mesfinal = mesfinseparador.slice(0,-5)

        var cadenafin = this.ListExp.periodofinExperienciaLaboral;
        this.anio = cadenafin.slice(-4);
        break;
    }

    

    var mesinicioseparador = this.ListExp.periodoinicioExperienciaLaboral
    this.mesinicio = mesinicioseparador.slice(0,-5)
       
    var cadenainicio = this.ListExp.periodoinicioExperienciaLaboral;
    this.anioinicio = cadenainicio.slice(-4);

    this.nombreExperienciaLaboral = this.ListExp.nombreExperienciaLaboral;
    this.empresaExperienciaLaboral = this.ListExp.empresaExperienciaLaboral;
    
  }

  //pipe
  filterRef(ref: any) {

    if(ref !== null){
      if( (ref.nombreReferente !== "" && ref.nombreReferente !==null) && ((ref.emailReferente !== "" && ref.emailReferente !== null ) || (ref.telefonoReferente !== "" && ref.telefonoReferente !== null))){
        return ref
      } 
    }    
    
  }

  //pipe
  filterExp(exp: any) {

    if( exp.nombreExperienciaLaboral !== null){
      return exp
    }    
    
  }
  
  getExp(){
    this.postulante = this.tokenService.getUser();

    this.ExperienciaLaboralService.mostrarExperiencia( this.postulante.idUsuario).subscribe(
      data => {      
        this.CurrentExperiencia = data.sort((a: any, b: any) => b.periodoinicioExperienciaLaboral.slice(-4) - a.periodoinicioExperienciaLaboral.slice(-4));
      });       
  }

  getRef(){        
    this.postulante = this.tokenService.getUser();

    this.ExperienciaLaboralService.mostrarReferencia(this.postulante.idUsuario).subscribe(
      data => {   
        this.CurrentReferencia = data 
      });    
  }

  guardarExp(){ 

    this.MesInicio = this.experienciaModalForm.controls['mesinicioExperienciaLaboral'].value;
    this.MesFin = this.experienciaModalForm.controls['mesfinExperienciaLaboral'].value;
   
    switch (this.MesInicio) 
    {
        case 'Enero':  this.MesInicio = "01";
                 break;
        case 'Febrero':  this.MesInicio = "02";
                 break;
        case 'Marzo':  this.MesInicio = "03";
                 break;
        case 'Abril':  this.MesInicio = "04";
                 break;
        case 'Mayo':  this.MesInicio = "05";
                 break;
        case 'Junio':  this.MesInicio = "06";
                 break;
        case 'Julio':  this.MesInicio = "07";
                 break;                   
        case 'Agosto':  this.MesInicio = "08";
                 break;
        case 'Septiembre':  this.MesInicio = "09";
                 break;
        case 'Octubre':  this.MesInicio = "10";
                 break;
        case 'Noviembre':  this.MesInicio = "11";
                 break;
        case 'Diciembre':  this.MesInicio = "12";
                 break;       
    }

    switch (this.MesFin) 
    {
        case 'Enero':  this.MesFin = "01";
                 break;
        case 'Febrero':  this.MesFin = "02";
                 break;
        case 'Marzo':  this.MesFin = "03";
                 break;
        case 'Abril':  this.MesFin = "04";
                 break;
        case 'Mayo':  this.MesFin = "05";
                 break;
        case 'Junio':  this.MesFin = "06";
                 break;
        case 'Julio':  this.MesFin = "07";
                 break;                  
        case 'Agosto':  this.MesFin = "08";
                 break;
        case 'Septiembre':  this.MesFin = "09";
                 break;
        case 'Octubre':  this.MesFin = "10";
                 break;
        case 'Noviembre':  this.MesFin = "11";
                 break;
        case 'Diciembre':  this.MesFin = "12";
                 break; 
        default: this.MesFin = "";
           break;           
    }   

    this.aniofinExp = this.experienciaModalForm.controls['aniofinExperienciaLaboral'].value;
    if(this.aniofinExp == null){
      this.aniofinExp = "";
    }
        
    var experiencia: any = {
      nombreExperienciaLaboral: this.experienciaModalForm.controls['nombreExperienciaLaboral'].value,
      mesinicioExperienciaLaboral: this.MesInicio,
      anioinicioExperienciaLaboral: this.experienciaModalForm.controls['anioinicioExperienciaLaboral'].value,
      mesfinExperienciaLaboral: this.MesFin,
      aniofinExperienciaLaboral : this.aniofinExp,
      empresaExperienciaLaboral: this.experienciaModalForm.controls['empresaExperienciaLaboral'].value, 
      descripcionExperienciaLaboral: this.experienciaModalForm.controls['descripcionExperienciaLaboral'].value,
      referenteReferenciaLaboral: this.experienciaModalForm.controls['referenteReferenciaLaboral'].value,
      emailreferenteReferenciaLaboral: this.experienciaModalForm.controls['emailreferenteReferenciaLaboral'].value,
      telefonoreferenteReferenciaLaboral: this.experienciaModalForm.controls['telefonoreferenteReferenciaLaboral'].value
    }

    this.ExperienciaLaboralService.guardarExperiencia(this.postulante.idUsuario, experiencia).subscribe(
      data => {    
        data;
          window.location.reload();

      },
      err => {
        this.message = err.error.message;
       
      });    
  }

  updateExp(){   
    
    this.MesInicio = this.experienciaUpdateModalForm.controls['mesinicioExperienciaLaboral'].value;
    this.MesFin = this.experienciaUpdateModalForm.controls['mesfinExperienciaLaboral'].value;
   
    switch (this.MesInicio) 
    {
        case 'Enero':  this.MesInicio = "01";
                 break;
        case 'Febrero':  this.MesInicio = "02";
                 break;
        case 'Marzo':  this.MesInicio = "03";
                 break;
        case 'Abril':  this.MesInicio = "04";
                 break;
        case 'Mayo':  this.MesInicio = "05";
                 break;
        case 'Junio':  this.MesInicio = "06";
                 break;
        case 'Julio':  this.MesInicio = "07";
                 break;                  
        case 'Agosto':  this.MesInicio = "08";
                 break;
        case 'Septiembre':  this.MesInicio = "09";
                 break;
        case 'Octubre':  this.MesInicio = "10";
                 break;
        case 'Noviembre':  this.MesInicio = "11";
                 break;
        case 'Diciembre':  this.MesInicio = "12";
                 break;                                
    }
    
    switch (this.MesFin) 
    {
        case 'Enero':  this.MesFin = "01";
                 break;
        case 'Febrero':  this.MesFin = "02";
                 break;
        case 'Marzo':  this.MesFin = "03";
                 break;
        case 'Abril':  this.MesFin = "04";
                 break;
        case 'Mayo':  this.MesFin = "05";
                 break;
        case 'Junio':  this.MesFin = "06";
                 break;
        case 'Julio':  this.MesFin = "07";
                 break;                  
        case 'Agosto':  this.MesFin = "08";
                 break;
        case 'Septiembre':  this.MesFin = "09";
                 break;
        case 'Octubre':  this.MesFin = "10";
                 break;
        case 'Noviembre':  this.MesFin = "11";
                 break;
        case 'Diciembre':  this.MesFin = "12";
                 break; 
        default: this.MesFin = "";
                 break;            
    }   

    this.aniofinExp = this.experienciaUpdateModalForm.controls['aniofinExperienciaLaboral'].value;
    if(this.aniofinExp == null){
      this.aniofinExp = "";
    }

      var experiencia: any = {
        nombreExperienciaLaboral: this.experienciaUpdateModalForm.controls['nombreExperienciaLaboral'].value,
        mesinicioExperienciaLaboral: this.MesInicio,
        anioinicioExperienciaLaboral: this.experienciaUpdateModalForm.controls['anioinicioExperienciaLaboral'].value,  
        mesfinExperienciaLaboral:  this.MesFin,
        aniofinExperienciaLaboral: this.aniofinExp,
        empresaExperienciaLaboral: this.experienciaUpdateModalForm.controls['empresaExperienciaLaboral'].value,
        descripcionExperienciaLaboral: this.experienciaUpdateModalForm.controls['descripcionExperienciaLaboral'].value,
        referenteReferenciaLaboral: this.experienciaUpdateModalForm.controls['referenteReferenciaLaboral'].value,
        emailreferenteReferenciaLaboral: this.experienciaUpdateModalForm.controls['emailreferenteReferenciaLaboral'].value,
        telefonoreferenteReferenciaLaboral: this.experienciaUpdateModalForm.controls['telefonoreferenteReferenciaLaboral'].value
      }

      this.ExperienciaLaboralService.actualizarExperiencia(this.postulante.idUsuario, this.ListExp.idExperienciaLaboral, experiencia).subscribe(
        data => {    
          window.location.reload();

        })
    }

  deleteExp(){
    this.ExperienciaLaboralService.borrarExperiencia( this.ListExp.idExperienciaLaboral).subscribe(
      data => {    
        window.location.reload();
      });
  }


}
