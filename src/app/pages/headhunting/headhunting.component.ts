import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { Ciudades, Idioma, NivelGeneral, NivelIdioma } from '../tools/data-lists';
import { HeadhuntingService } from './headhunting.service';
import { Router} from '@angular/router'
declare const $:any;

@Component({
  selector: 'app-headhunting',
  templateUrl: './headhunting.component.html',
  styleUrls: []
})
export class HeadhuntingComponent implements OnInit {
  Lista: any;
  CurrentLista:any;
  p : number =1 ;
  
  filterMetadata = { count: 0 };

  FilterPostPalabraClave = '';
  FilterPostEdadInicio : any;
  FilterPostEdadFin : any;
  FilterPostInstitucionEducativa ='';
  FilterPostCiudad = '';

  Idioma = Idioma;
  NivelIdioma = NivelIdioma;
  NivelGeneral = NivelGeneral;

  FilterPostIdioma = '';
  FilterPostNivelIdioma = '';

  FilterPostConocimiento = '';
  FilterPostNivelConocimiento = '';

  FilterPostHabilidad = '';
  FilterPostNivelHabilidad = '';

  FilterPostPretensionMax : any;
  FilterPostPretensionMin : any;

  public headhunting = this.fb.group({        
    nombreExperienciaLaboral: new FormControl('', Validators.compose([
  
     ])), 
  })
  Lista2: any;
  ListCandidatosCurrent: any;

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
  salir: any;
  reclutador: any;
  postulante: any;
  expiradaso: any;
  UsuarioToken: any;
  idrec: any;

  constructor( private HeadhuntingService: HeadhuntingService,
               private cd:ChangeDetectorRef,
               private fb:FormBuilder,
               private token:TokenStorageService, private route:Router) {
  }

  ngOnInit(): void {
    this.getListaempleos();
    this.id();
  }
  
  ngAfterContentChecked(){
    this.cd.detectChanges();
  }
  
  id(){
    this.idrec = this.token.getUser().idUsuario;
  }

 filterGeneral(lista: any) {

    if(lista.experiencialaboralPostulante !== null){
      if( lista.experiencialaboralPostulante.puestoExperienciaLaboral !== null){
        return lista
      }  
    }
      
    
  }

  getListaempleos(){
    this.HeadhuntingService.getPostulanteByHeadHunting().subscribe(
    data => {
      this.Lista = data;   
      console.log(this.Lista)    
   
    },
    error => {
      console.log(error);
    });
  }

  Seleccionarcandidato(lista:any) {
    this.ListCandidatosCurrent = lista;
    this.token.saveUsuarioPerfil(this.ListCandidatosCurrent.idPostulante);
  }
  
  redirect(){
    this.route.navigate(['perfilcandidato']);
  }

  Salir(){
    this.salir = this.token.getUser();

      var a = this.salir.authorities[0];

      switch (a.authority) {
        case 'ROLE_RECLUTADOR':   
            this.reclutador = a.authority;  
                 
          break;
        case 'ROLE_POSTULANTE': 
            this.postulante = a.authority;
          break;      
        default:
          break;
      }

    if(this.reclutador !== undefined){
      this.token.signOut();
      window.location.href ='/signin/reclutador';
    }else{
      this.token.signOut();
      window.location.href = '/signin/postulante';
    }    
  }

  

}
