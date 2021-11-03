import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute,Router, ParamMap} from '@angular/router';
import { NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {ProfilePostulanteService} from './profile-postulante.service'

@Component({
  selector: 'app-profile-postulante',
  templateUrl: './profile-postulante.component.html',
  styleUrls: []
})
export class ProfilePostulanteComponent implements OnInit {
  [x: string]: any;
  CurrentEducacion: any;
  CurrentUser: any;
  CurrentExperiencia: any;
  
  Usuario: any = {   
  }

  idPostulante: any;
  fotoperfilPostulante: any;
  nombrePostulante: any;
  apellidoPostulante: any;
  descripcionPostulante: any;
  emailPostulante: any;
  telefonoPostulante: any;
  CurrentIdioma: any;
  CurrentHabilidad: any;
  CurrentConocimiento: any;


  constructor(private tokens:TokenStorageService,
              private ProfilePostulanteService:ProfilePostulanteService,
              public modal:NgbModal) { }

  ngOnInit(): void {
    this.getpostulantexempleo();
    this.getEdu();
    this.getExp();
    this.getRef();
    this.getCon();
    this.getHab();
    this.getIdi();
  }

  //pipe
  filterHabilidades(hab: any) {

    if( hab.nombreSkill !== null){
      return hab
    }    
    
  }

  //pipe
  filterRef(ref: any) {

    if( ref.nombreReferente !== "" &&   (ref.emailReferente !== "" || ref.telefonoReferente !== "")){
      return ref
    }    
    
  }

  //pipe
  filterExp(exp: any) {

    if( exp.nombreExperienciaLaboral !== null){
      return exp
    }    
    
  }

  //pipe
  filterEstudios(edu: any) {

    if( edu.nombreEducacion !== null){
      return edu
    }    
    
  }

  filterConocimientos(con: any) {

    if( con.nombreSkill !== null){
      return con
    }    
    
  }


  filterIdiomas(idi: any) {

    if( idi.nombreSkill !== null){
      return idi
    }    
    
  }
  getpostulantexempleo(){
    this.ProfilePostulanteService.getPostulantesByempleo(this.tokens.getTokenjob(),this.tokens.getUsuarioPerfil()).subscribe(data => {
      this.Usuario = data
      this.Usuario.idPostulante= data.idPostulante
      this.Usuario.archivocvPostulante = data.archivocvPostulante.urlArchivoCV;
      this.Usuario.fotoperfilPostulante = data.fotoperfilPostulante.urlImagen;
      this.Usuario.nombrePostulante = data.nombrePostulante;
      this.Usuario.apellidoPostulante = data.apellidoPostulante;
      this.Usuario.descripcionPostulante = data.descripcionPostulante;
      this.Usuario.emailPostulante = data.emailPostulante;
      this.Usuario.direccionPostulante = data.direccionPostulante;
      this.Usuario.telefonoPostulante= data.telefonoPostulante;
      this.Usuario.tituloPostulante=data.tituloPostulante
      console.log(data);

      if (this.Usuario.descripcionPostulante){ 
        this.Usuario.descripcionPostulante = this.Usuario.descripcionPostulante.replace(/\n/g, '<br />');
      }

      
    })
  }

  getEdu(){

    this.ProfilePostulanteService.getEducacion(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentEducacion= data;  
        console.log(data)
      });
  }

  getExp(){

    this.ProfilePostulanteService.getExperiencia(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentExperiencia= data;  
        console.log(data)
      });
  }

  getRef(){

    this.ProfilePostulanteService.getReferencia(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentReferencia= data;  
        console.log(data)
      });
  }

  getCon(){

    this.ProfilePostulanteService.getConocimientos(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentConocimiento= data;  
        console.log(data)
      });
  }

  getHab(){

    this.ProfilePostulanteService.getHabilidades(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentHabilidad= data;  
        console.log(data)
      });
  }

  getIdi(){

    this.ProfilePostulanteService.getIdioma(this.tokens.getTokenjob(), this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentIdioma= data;  
        console.log(data)
      });
  }

  descargarcv(){
    
    if(this.Usuario.archivocvPostulante === null || this.Usuario.archivocvPostulante === undefined || this.Usuario.archivocvPostulante === '' ){
      return window.location.href= '/postulante/'+this.idPostulante+'/profile';
    }
    if(this.Usuario.archivocvPostulante !== null || this.Usuario.archivocvPostulante !== undefined || this.Usuario.archivocvPostulante !==  ''){
       
      return window.location.href= ''+this.Usuario.archivocvPostulante;
    }
    return '';
  }

}
