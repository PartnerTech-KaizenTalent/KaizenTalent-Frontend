import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { PostulanteDetailService } from './postulante-detail.service'

@Component({
  selector: 'app-postulante-detail',
  templateUrl: './postulante-detail.component.html',
  styleUrls: []
})
export class PostulanteDetailComponent implements OnInit {
  CurrentEducacion: any;
  CurrentExperiencia: any;
  CurrentHabilidad: any;
  CurrentConocimiento: any;
  CurrentIdioma: any;
  CurrentReferencia: any;
  fotoperfilPostulante: any;
  idPostulante: any;
  apellidoPostulante: any;
  nombrePostulante: any;
  descripcionPostulante: any;
  emailPostulante: any;
  telefonoPostulante: any;
  direccionPostulante: any;
  tituloPostulante: any;
  Usuario: any = {   
  }
  guion:any;

  constructor( private PostulanteDetailService: PostulanteDetailService,
               private tokens: TokenStorageService,
               private modal:NgbModal) { }

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
    this.PostulanteDetailService.getPostulantesByempleo(this.tokens.getHead()).subscribe(data => {
      this.Usuario = data;
      this.Usuario.nombrePostulante = data.nombrePostulante;
      this.Usuario.archivocvPostulante = data.archivocvPostulante.urlArchivoCV;
      this.Usuario.apellidoPostulante = data.apellidoPostulante;
      this.Usuario.descripcionPostulante = data.descripcionPostulante;
      this.Usuario.emailPostulante = data.emailPostulante;
      this.Usuario.direccionPostulante = data.direccionPostulante;
      this.Usuario.telefonoPostulante= data.telefonoPostulante;
      this.Usuario.tituloPostulante=data.tituloPostulante;
      this.Usuario.fotoperfilPostulante = data.fotoperfilPostulante.urlImagen
      console.log(data);
      if(this.Usuario.direccionReclutador == null || this.Usuario.direccionReclutador == undefined || this.Usuario.direccionReclutador == ''){
        this.guion = '';
      }else{
        this.guion = '-'
      }

      if (this.descripcionPostulante){ 
        this.descripcionPostulante = this.descripcionPostulante.replace(/\n/g, '<br />');
      }

    })
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

  getEdu(){

    this.PostulanteDetailService.getEducacion(this.tokens.getHead()).subscribe(
      data => {    
        this.CurrentEducacion= data;  
        console.log(data)
      });
  }


  getExp(){

    this.PostulanteDetailService.getExperiencia(this.tokens.getHead()).subscribe(
      data => {    
        this.CurrentExperiencia= data;  
        console.log(data)
      });
  }

  getRef(){

    this.PostulanteDetailService.getReferencia(this.tokens.getHead()).subscribe(
      data => {    
        this.CurrentReferencia= data;  
        console.log(data)
      });
  }

  getCon(){

    this.PostulanteDetailService.getConocimientos(this.tokens.getHead()).subscribe(
      data => {    
        this.CurrentConocimiento= data;  
        console.log(data)
      });
  }

  getHab(){

    this.PostulanteDetailService.getHabilidades(this.tokens.getHead()).subscribe(
      data => {    
        this.CurrentHabilidad= data;  
        console.log(data)
      });
  }

  getIdi(){

    this.PostulanteDetailService.getIdioma(this.tokens.getHead()).subscribe(
      data => {    
        this.CurrentIdioma= data;  
        console.log(data)
      });
  }
  
}
