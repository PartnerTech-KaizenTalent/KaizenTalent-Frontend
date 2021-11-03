import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias, Ciudades, Experiencia, Publicacion, Remoto, TipoPostulacion } from 'src/app/pages/tools/data-lists';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { ActiveEmpleoService } from './active-empleo.service'

@Component({
  selector: 'app-active-empleo',
  templateUrl: './active-empleo.component.html',
  styleUrls: ['./active-empleo.component.css']
})
export class ActiveEmpleoComponent implements OnInit {
  ListActive: any;
  ids: any;
  ListEmpleoCurrent: any;
  //Datalist
  Categorias = Categorias;
  TipoPostulacion =TipoPostulacion;
  Experiencia = Experiencia;
  Publicacion = Publicacion;
  Remoto = Remoto;
  p : number =1 ;


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
  nombrePuestoTrabajo: any;
  tipojornadaPuestoTrabajo: any;
  ciudadPuestoTrabajo: any;
  sueldoPuestoTrabajo: any;
  categoriaPuestoTrabajo: any;
  experienciaPuestoTrabajo: any;
  periodopublicacionPuestoTrabajo: any;
  trabajoremotoPuestoTrabajo: any;
  descripcionPuestoTrabajo: any;
  eleccion: any;
  msgerror: any;
  Datalist: any;
  Datalistcity: any;
  Datalistjor: any;
  Datalistcat: any;
  Datalisttime: any;
  Datalistper: any;
  Datalistmod: any;
  eleccioncity: any;
  eleccionjornada: any;
  eleccioncat: any;
  elecciontime: any;
  eleccionper: any;
  eleccionmod: any;
  msgerrormod: any;
  msgerrorper: any;
  msgerrortime: any;
  msgerrorcat: any;
  msgerrorjor: any;
  msgerrorcity: any;
  
  constructor(private ActiveEmpleoService:ActiveEmpleoService,
              private token:TokenStorageService,
              private route:Router,
              private fb:FormBuilder,
              private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.ids = this.token.getUser();  
    this.getEmpleoActivo();
  }
  ngAfterContentChecked(){
    this.cd.detectChanges();
  }

  //get Tabla de empleo activos con su respectivo API
  getEmpleoActivo(){
    this.ActiveEmpleoService.getActivos(this.ids.idReclutador).subscribe(data => {
      this.ListActive = data;
      console.log(this.ListActive);
    })
  }

  //Seleccionar un empleo de las listas de empleos (lista) -> es el parametro q se tomara del html
  Seleccionarempleo(lista:any) {    
      this.ListEmpleoCurrent = lista;
      console.log(this.ListEmpleoCurrent);    
      this.nombrePuestoTrabajo = this.ListEmpleoCurrent.nombrePuestoTrabajo;
      this.tipojornadaPuestoTrabajo = this.ListEmpleoCurrent.tipojornadaPuestoTrabajo;
      this.ciudadPuestoTrabajo = this.ListEmpleoCurrent.ciudadPuestoTrabajo;
      this.sueldoPuestoTrabajo = this.ListEmpleoCurrent.sueldoPuestoTrabajo;
      this.categoriaPuestoTrabajo = this.ListEmpleoCurrent.categoriaPuestoTrabajo;
  
      this.experienciaPuestoTrabajo = this.ListEmpleoCurrent.experienciaPuestoTrabajo;
  
      switch (this.experienciaPuestoTrabajo) {
        case 0:    
        this.experienciaPuestoTrabajo = "Sin Experiencia" 
          break;
  
        case 3:      
        this.experienciaPuestoTrabajo = "3 Meses de Experiencia"     
          break;
  
        case 6:  
        this.experienciaPuestoTrabajo = "6 Meses de Experiencia"           
            break;
  
        case 12:     
        this.experienciaPuestoTrabajo = "1 Año de Experiencia" 
            break;
  
        case 36:
        this.experienciaPuestoTrabajo = "3 Años de Experiencia"
            break;
            
        case 60:
        this.experienciaPuestoTrabajo = "5 Años de Experiencia" 
            break;
  
        default:
        this.experienciaPuestoTrabajo = "" 
          break;
      }
  
    this.periodopublicacionPuestoTrabajo = this.ListEmpleoCurrent.periodoPublicidad; 
  
      switch (this.periodopublicacionPuestoTrabajo) {
  
        case 7:    
        this.periodopublicacionPuestoTrabajo = "Semanal" 
          break;
  
        case 15:      
        this.periodopublicacionPuestoTrabajo = "Quincenal"     
          break;
  
        case 30:  
        this.periodopublicacionPuestoTrabajo = "Mensual"           
            break;
  
        default:
        this.periodopublicacionPuestoTrabajo = "" 
          break;
      }
  
      this.trabajoremotoPuestoTrabajo = this.ListEmpleoCurrent.trabajoremotoPuestoTrabajo;
      this.descripcionPuestoTrabajo = this.ListEmpleoCurrent.descripcionPuestoTrabajo;
      this.guardarValidaciondeDatalist();

  }

  //Ir a publicacion del trabajo
  verDetalle(){
    this.token.saveTokenjob(this.ListEmpleoCurrent.idPuestoTrabajo);
    this.route.navigate(['puestotrabajo/'+this.ListEmpleoCurrent.idPuestoTrabajo+'/detail']);    
  }

  //guardar el token para ver la lista de canditatos
  verPostulantes(){
    this.token.saveTokenjob(this.ListEmpleoCurrent.idPuestoTrabajo);
    this.route.navigate(['/listacandidatos']);
  }


  public puestosupdateform = this.fb.group({     
    
    nombrePuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    ciudadPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    categoriaPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    trabajoremotoPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])),        
    tipojornadaPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    sueldoPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    experienciaPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required
    ])), 
    descripcionPuestoTrabajo: new FormControl('', Validators.compose([
    ])),
    
  })

  //Pausar un empleo seleccionado
  PausaEmpleoActive(){
    var trabajo:any = {
      idPuestoTrabajo: this.ListEmpleoCurrent.idPuestoTrabajo
    }
    this.ActiveEmpleoService.putPublicacionpausa(trabajo).subscribe(data => {
      data;
      console.log(data);
      window.location.reload();
    });
  }

  guardarValidaciondeDatalist(){
    if(this.ListEmpleoCurrent !== null || this.ListEmpleoCurrent !== undefined){
      this.eleccioncity = this.ciudadPuestoTrabajo;
      this.eleccionjornada = this.tipojornadaPuestoTrabajo;
      this.eleccioncat = this.categoriaPuestoTrabajo;
      this.elecciontime = this.experienciaPuestoTrabajo;
      this.eleccionmod = this.trabajoremotoPuestoTrabajo;
    }
  }

  savecity(e:any){
    let ciudadcita = e.target.value;
    this.eleccioncity = ciudadcita;
    this.msgerrorcity = null;
  }

  savejor(e:any){
    let ciudadcita = e.target.value;
    this.eleccionjornada = ciudadcita;
    this.msgerrorjor = null;
  }

  savecat(e:any){
    let ciudadcita = e.target.value;
    this.eleccioncat = ciudadcita;
    this.msgerrorcat = null;
  }
  savetime(e:any){
    let ciudadcita = e.target.value;
    this.elecciontime = ciudadcita;
    this.msgerrortime = null;
  }
 
  savemod(e:any){
    let ciudadcita = e.target.value;
    this.eleccionmod = ciudadcita;
    this.msgerrormod = null;
  }
  
  ActualizarEmpleo(): void {
    

    this.experienciaPuestoTrabajo = this.puestosupdateform.controls['experienciaPuestoTrabajo'].value;

    switch (this.experienciaPuestoTrabajo) {

      case "Sin Experiencia":    
      this.experienciaPuestoTrabajo = 0 
        break;

      case "3 Meses de Experiencia":      
      this.experienciaPuestoTrabajo =  3
        break;

      case "6 Meses de Experiencia":  
      this.experienciaPuestoTrabajo = 6           
          break;

      case "1 Año de Experiencia" :     
      this.experienciaPuestoTrabajo = 12
          break;

      case "3 Años de Experiencia":
      this.experienciaPuestoTrabajo = 36
          break;
          
      case "5 Años de Experiencia":
      this.experienciaPuestoTrabajo =  60
          break;
      case "":
        this.experienciaPuestoTrabajo =  ""
        break;
      default:
      
      break;
    }

    var puestowork: any = {
      nombrePuestoTrabajo: this.puestosupdateform.controls['nombrePuestoTrabajo'].value,
      ciudadPuestoTrabajo: this.puestosupdateform.controls['ciudadPuestoTrabajo'].value,
      categoriaPuestoTrabajo: this.puestosupdateform.controls['categoriaPuestoTrabajo'].value,
      trabajoremotoPuestoTrabajo: this.puestosupdateform.controls['trabajoremotoPuestoTrabajo'].value,
      tipojornadaPuestoTrabajo: this.puestosupdateform.controls['tipojornadaPuestoTrabajo'].value,
      sueldoPuestoTrabajo: this.puestosupdateform.controls['sueldoPuestoTrabajo'].value,
      experienciaPuestoTrabajo: this.experienciaPuestoTrabajo,
      descripcionPuestoTrabajo: this.puestosupdateform.controls['descripcionPuestoTrabajo'].value,
    }

    try {
      this.Datalistcity = this.Ciudades.filter(x => x.text === this.eleccioncity)[0];
      console.log(this.Datalistcity.text);
      this.Datalistjor = this.TipoPostulacion.filter(x => x.text === this.eleccionjornada)[0];
      console.log(this.Datalistjor.text);
      this.Datalistcat = this.Categorias.filter(x => x.text === this.eleccioncat)[0];
      console.log(this.Datalistcat.text);
      this.Datalisttime = this.Experiencia.filter(x => x.text === this.elecciontime)[0];
      console.log(this.Datalisttime.text);      
      this.Datalistmod = this.Remoto.filter(x => x.text === this.eleccionmod)[0];
      console.log(this.Datalistmod.text);
      

      this.ActiveEmpleoService.putPublicacionUpdate(puestowork,this.ids.idReclutador, this.ListEmpleoCurrent.idPuestoTrabajo).subscribe(
        data => {
          console.log(data);
          window.location.reload();

      });

      
    } catch (error) {
      if(this.Datalistcity === null || this.Datalist === undefined){
        this.msgerrorcity = 'Elegir una opcion de Ciudad';
      }
      if(this.Datalistjor === null || this.Datalistjor === undefined){
        this.msgerrorjor = 'Elegir una opcion de Jornada';
      }
      if(this.Datalistcat === null || this.Datalistcat === undefined){
        this.msgerrorcat = 'Elegir una opcion de Categoria';
      }
      if(this.Datalisttime === null || this.Datalisttime === undefined){
        this.msgerrortime = 'Elegir una opcion de Experiencia';
      }      
      if(this.Datalistmod === null || this.Datalistmod === undefined){
        this.msgerrormod = 'Elegir una opcion de Modalidad';
      }
    }

  }

  BorrarEmpleoActive(){
    this.ActiveEmpleoService.deleteEmpleo(this.ListEmpleoCurrent.idPuestoTrabajo).subscribe(data => {
      data;
      console.log(data);
    });
    window.location.reload();
  }

}
