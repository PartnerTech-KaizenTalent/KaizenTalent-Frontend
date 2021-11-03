import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { ListaTrabajosService} from './lista-trabajos.service';
import { Router } from '@angular/router';
import { Ciudades, Categorias, Experiencia, PeriodoPublicacion } from '../tools/data-lists';


@Component({
  selector: 'app-lista-trabajos',
  templateUrl: './lista-trabajos.component.html',
  styleUrls: []
})
export class ListaTrabajosComponent implements OnInit {


  //Variables
  CurrentDatos: any = [];
  CurrentEmpleo : any;
  p : number =1 ;
  CurrentDetalleLista: any;


  
  //filtro

  Objetofiltro :any;

  FilterPostPalabraClave :any;
  FilterPostCiudad :any;
  FilterPostCategoria :any;
  FilterPostFechaPublicacion : any;
  FilterPostExperiencia : any;

  
  Anio:any;
  Mes: any;
  Dia:any;
  Hora:any;

  //Datalist
  Categorias = Categorias;
  Experiencias = Experiencia;
  PeriodoPublicaciones = PeriodoPublicacion;

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

  public BusquedaParametros = this.fb.group({
    palabraClave: new FormControl('', 
    Validators.required),

    ciudadUsuario: new FormControl('', 
    Validators.required),

    categoriaUsuario: new FormControl('', 
    Validators.required)
  })
  message: any;

  constructor(private listatrabajosservice: ListaTrabajosService,
              private fb: FormBuilder,
              private tokens: TokenStorageService, 
              private route: Router,
              private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.verListaDeTrabajos();
    this.LimpiarFiltros();
    //var a = new Date().getTime
  }

  /*fecha(){
    this.Anio = new Date().getFullYear();
    this.Mes = new Date().getMonth()+1;
    this.Dia = new Date().getDate();
    this.Hora = new Date().getHours();
  }*/

  ngAfterContentChecked(){
    this.cd.detectChanges();
    this.message = this.tokens.getCont();    
  }

  LimpiarFiltros(){
    if(this.tokens.getTokenBusqueda() != null || this.tokens.getTokenBusqueda() != undefined){
      this.Objetofiltro = this.tokens.getTokenBusqueda();
      this.FilterPostPalabraClave = this.Objetofiltro.puestotrabajo;
      this.FilterPostCiudad = this.Objetofiltro.ciudad;
      this.FilterPostCategoria = this.Objetofiltro.categoria;
    }else{
      this.Objetofiltro = '';
      this.FilterPostPalabraClave = '';
      this.FilterPostCiudad = '';
      this.FilterPostCategoria = '';
      this.tokens.saveTokenBusqueda(this.Objetofiltro);
    }
  }
 

 RBfechaChange (event:any){
   this.FilterPostFechaPublicacion = event.target.value;  
 }

 RBexperienceChange (event:any){
   this.FilterPostExperiencia = event.target.value;
 }

 
 verListaDeTrabajos(){ 
    this.listatrabajosservice.ListaDeTrabajos().subscribe(
      data => {
        this.CurrentEmpleo = data.sort((a: any, b: any) => b.idPuestoTrabajo - a.idPuestoTrabajo) ;  
  })
}

 Seleccionarempleo(empleo:any) {
   this.CurrentDetalleLista = empleo;
 }

 verDetalle(){
   this.tokens.saveTokenjob(this.CurrentDetalleLista.idPuestoTrabajo);
   this.route.navigate(['puestotrabajo/'+this.CurrentDetalleLista.idPuestoTrabajo+'/detail']);
 }

 EliminarFiltros(){

  this.FilterPostPalabraClave = '';
  this.FilterPostCiudad = '';
  this.FilterPostCategoria = '';
  
  window.location.reload();
 }
  

 
 


}
