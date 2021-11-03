import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MesPeriodo, EstadoEstudio, NivelEstudio } from '../../../tools/data-lists';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { EstudiosService} from './estudios.service'


@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: []
})
export class EstudiosComponent implements OnInit {
  ListEdu: any;
  mesinicio: any;
  mesfinal: any;
  anioinicio: any;
  anio: any;
  CurrentEducacion: any;
  id: any;
  postulante: any;
  nombreEducacion: any;
  institucionEducacion: any;

  MesPeriodo = MesPeriodo;
  EstadoEstudio = EstadoEstudio;
  NivelEstudio = NivelEstudio;


  MesInicio: any;
  MesFin: any;
  aniofinEdu: any;
  anioactual: any;
  aniomin: any;
  choosenivel: any;
  choosestado: any;

  constructor(private tokenService: TokenStorageService,
              private router: Router,
              private fb: FormBuilder,
              public modal:NgbModal,
              private EstudiosService: EstudiosService,
              private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getEdu();
    this.anioactual = new Date().getFullYear();    
    this.aniomin = new Date().getFullYear()-60;    

  }

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }
  //new Date().getFullYear()
  //new Date().getMonth()

  //pipe
  filterEstudios(edu: any) {

    if( edu.nombreEducacion !== null){
      return edu
    }    
    
  }

  public educacionModalForm = this.fb.group({   

    nombreEducacion: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
     ])), 
     
    institucionEducacion: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
     ])), 
     
    mesinicioEducacion: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10)
     ])), 
    anioinicioEducacion:  new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(new Date().getFullYear()-60),
      Validators.max(new Date().getFullYear())
     ])), 
    mesfinEducacion: new FormControl(''),
    aniofinEducacion: new FormControl('')
  });

  public educacionUpdateModalForm = this.fb.group({    
    
    nombreEducacion: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
     ])), 
     
    institucionEducacion: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
     ])), 
     
    mesinicioEducacion: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10)
     ])), 
    anioinicioEducacion:  new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(new Date().getFullYear()-60),
      Validators.max(new Date().getFullYear())
     ])), 
    mesfinEducacion: new FormControl(''),
    aniofinEducacion: new FormControl('')
  }); 
  
  /*
  *SELECCIONAR EDUCACION
  */

  SeleccionarEdu(edu:any) {
    this.ListEdu = edu;
    this.tokenService.saveEdu(this.ListEdu.idEducacion);   
    var mesinicioseparador = this.ListEdu.periodoinicioEducacion

    switch (this.ListEdu.periodofinEducacion) {
      case 'En Curso':
        this.mesfinal = "";
        this.anio = "";
        break;
    
      default:
        var mesfinseparador = this.ListEdu.periodofinEducacion
        this.mesfinal = mesfinseparador.slice(0,-5)

        var cadenafin = this.ListEdu.periodofinEducacion;
        this.anio = cadenafin.slice(-4);
        break;
    }

    this.mesinicio = mesinicioseparador.slice(0,-5)  
    var cadenainicio = this.ListEdu.periodoinicioEducacion;

    this.anioinicio = cadenainicio.slice(-4);
    this.nombreEducacion = this.ListEdu.nombreEducacion;
    this.institucionEducacion = this.ListEdu.institucionEducacion

  }

  /*
  *OBTENER EDUCACION
  */

  getEdu(){
    this.postulante = this.tokenService.getUser();
    
    this.EstudiosService.mostrarEducacion(this.postulante.idPostulante).subscribe(
      data => {    
        this.CurrentEducacion = data.sort;
        if(this.CurrentEducacion.periodoinicioEducacion){
          this.CurrentEducacion = data.sort((a: any, b: any) => b.periodoinicioEducacion.slice(-4) - a.periodoinicioEducacion.slice(-4));   
        }else{
          this.CurrentEducacion = data;
        }

    });
  }

  /*
  *SELECCIONAR COMBOBOX DE ESTADO EN EDUCACION
  */
  SeleccionEstado(e:any){
    let nivel = e.target.value;
    this.choosestado = nivel;
  }

  /*
  *SELECCIONAR COMBOBOX DE NIVEL EN EDUCACION
  */
  SeleccionNivel(e:any){
    let estado = e.target.value;
    this.choosenivel = estado;
  }

  /*
  *AGREGAR EDUCACION
  */

  guardarEdu(){ 

    this.MesInicio = this.educacionModalForm.controls['mesinicioEducacion'].value;
    this.MesFin = this.educacionModalForm.controls['mesfinEducacion'].value;
   
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

    this.aniofinEdu = this.educacionModalForm.controls['aniofinEducacion'].value;
    if(this.aniofinEdu == null){
      this.aniofinEdu = "";
    }


    var educacion: any = {
    nombreEducacion: this.educacionModalForm.controls['nombreEducacion'].value,
    mesinicioEducacion:this.MesInicio,
    anioinicioEducacion:this.educacionModalForm.controls['anioinicioEducacion'].value,
    estadoEducacion: this.choosestado,
    nivelEducacion: this.choosenivel,    
    mesfinEducacion:this.MesFin,
    aniofinEducacion:this.aniofinEdu,
    institucionEducacion: this.educacionModalForm.controls['institucionEducacion'].value     
    }
  

    this.EstudiosService.guardarEducacion(this.postulante.idPostulante, educacion).subscribe(
      data => {     
      this.CurrentEducacion = data;
      window.location.reload(); 

    });    
  }

  /*
  *EDITAR EDUCACION
  */

  editaEdu(){

    this.MesInicio = this.educacionUpdateModalForm.controls['mesinicioEducacion'].value;
    this.MesFin = this.educacionUpdateModalForm.controls['mesfinEducacion'].value;

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

    this.aniofinEdu = this.educacionUpdateModalForm.controls['aniofinEducacion'].value;
    if(this.aniofinEdu == null){
      this.aniofinEdu = "";
    }
    
    var educacion: any = {
      nombreEducacion: this.educacionUpdateModalForm.controls['nombreEducacion'].value,
      mesinicioEducacion:this.MesInicio,
      anioinicioEducacion: this.educacionUpdateModalForm.controls['anioinicioEducacion'].value,
      mesfinEducacion: this.MesFin,
      estadoEducacion: this.choosestado,
      nivelEducacion: this.choosenivel,
      aniofinEducacion : this.educacionUpdateModalForm.controls['aniofinEducacion'].value,
      institucionEducacion: this.educacionUpdateModalForm.controls['institucionEducacion'].value     
    }

    this.EstudiosService.actualizarEducacion(this.postulante.idPostulante, this.ListEdu.idEducacion, educacion).subscribe(
    data => {
      window.location.reload(); 
    })
  }

  /*
  *ELIMINAR EDUCACION
  */

  deleteEdu(){   
    this.EstudiosService.borrarEducacion(this.ListEdu.idEducacion).subscribe(
      data => {    
        window.location.reload();
    });
  }
}
