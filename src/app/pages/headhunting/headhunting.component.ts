import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { Idioma, NivelGeneral, NivelIdioma } from '../tools/data-lists';
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


  public headhunting = this.fb.group({        
    nombreExperienciaLaboral: new FormControl('', Validators.compose([
  
     ])), 
  })
  Lista2: any;
  ListCandidatosCurrent: any;

  constructor( private HeadhuntingService: HeadhuntingService,
               private cd:ChangeDetectorRef,
               private fb:FormBuilder,
               private token:TokenStorageService, private route:Router) {

  }

  ngOnInit(): void {
    this.getListaempleos();

  }

  

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }
  

  filterGeneral(lista: any) {

    if( lista.experiencialaboralPostulante.puestoExperienciaLaboral !== null){
      return lista
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
    this.token.saveHead(this.ListCandidatosCurrent.idPostulante);
  }
  redirect(){
    this.route.navigate(['headhunting/perfil']);
  }

}
