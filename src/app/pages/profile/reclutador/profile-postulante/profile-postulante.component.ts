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
    var id = this.tokens.getUsuarioPerfil();
    this.ProfilePostulanteService.BasicInfo(id).subscribe(data => {
      this.Usuario = data
      this.Usuario.idPostulante= data.idPostulante
      this.Usuario.documentocvPostulante = data.documentocvPostulante.urlDocumentoCV;
      this.Usuario.fotoperfilPostulante = data.fotoperfilPostulante.urlImagen;
      this.Usuario.nombrePostulante = data.nombrePostulante;
      this.Usuario.apellidoPostulante = data.apellidoPostulante;
      this.Usuario.descripcionPostulante = data.descripcionPostulante;
      this.Usuario.emailPostulante = data.emailPostulante;
      this.Usuario.direccionPostulante = data.direccionPostulante;
      this.Usuario.telefonoPostulante= data.telefonoPostulante;
      this.Usuario.tituloPostulante=data.tituloPostulante

      if (this.Usuario.descripcionPostulante){ 
        this.Usuario.descripcionPostulante = this.Usuario.descripcionPostulante.replace(/\n/g, '<br />');
      }      
    },
    
    )
  }

  getEdu(){

    this.ProfilePostulanteService.mostrarEducacion(this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentEducacion= data;  
      });
  }

  getExp(){

    this.ProfilePostulanteService.mostrarExperiencia(this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentExperiencia= data;  
      });
  }

  getRef(){

    this.ProfilePostulanteService.mostrarReferencia(this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentReferencia= data;  
      });
  }

  getCon(){

    this.ProfilePostulanteService.mostrarConocimiento(this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentConocimiento= data;  
      });
  }

  getHab(){

    this.ProfilePostulanteService.mostrarHabilidad(this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentHabilidad= data;  
      });
  }

  getIdi(){

    this.ProfilePostulanteService.mostrarIdioma(this.tokens.getUsuarioPerfil()).subscribe(
      data => {    
        this.CurrentIdioma= data;  
      });
  }

  descargarcv(){
    
    if(this.Usuario.documentocvPostulante === null || this.Usuario.documentocvPostulante === undefined || this.Usuario.documentocvPostulante === '' ){
      return window.location.href= '/perfilcandidato';
    }
    if(this.Usuario.documentocvPostulante !== null || this.Usuario.documentocvPostulante !== undefined || this.Usuario.documentocvPostulante !==  ''){
       
      return window.location.href= ''+this.Usuario.documentocvPostulante;
    }
    return '';
  }

}
