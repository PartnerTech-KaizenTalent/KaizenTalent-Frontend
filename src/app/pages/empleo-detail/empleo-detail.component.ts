import { Component, OnInit, Input } from '@angular/core';
import {TokenStorageService} from 'src/app/util/token-storage.service';
import {Router} from '@angular/router';
import {EmpleoDetailService} from './empleo-detail.service'
import { FormBuilder,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleo-detail',
  templateUrl: './empleo-detail.component.html',
  styleUrls: []
})
export class EmpleoDetailComponent implements OnInit {

  //Variables
  isButtonVisible= false;
  PostulanteActual:any ;
  currentDetalleLista:any = [];
  auxUsertoken: any;
  msgerror: any;
  aviso: any;
  verRedireccion = false;
  reclutador: any;
  postulante: any;
  auxPostu: any;
  idreclutador: any;
  idpostulante: any;

  constructor(private EmpleoDetailService:EmpleoDetailService,
              private tokens:TokenStorageService, 
              private route:Router,
              private fb:FormBuilder) {  }

  ngOnInit(): void {
    this.PostulanteActual = this.tokens.getUser();
    this.getdetalleEmpleo();
    this.verBoton();    
  }

  verBoton(){

    if(this.tokens.getUser()){

      this.auxUsertoken = this.tokens.getUser()

      if(this.auxUsertoken.idUsuario === undefined){
      }else{
        var a = this.auxUsertoken.authorities[0];
        switch (a.authority) {
          case 'ROLE_RECLUTADOR':   
              this.reclutador =  this.auxUsertoken.idUsuario                   
            break;
          case 'ROLE_POSTULANTE': 
              this.postulante = this.auxUsertoken.idUsuario 
            break;      
          default:
            break;
        }

        if(this.reclutador !== undefined){
          this.isButtonVisible = false;
        }
        if(this.postulante !== undefined){
          this.isButtonVisible = true;
        }

        if(this.tokens.getToken() === null){
          this.isButtonVisible = true;
        }
      }
     
      
    }
    

  }

  getdetalleEmpleo(){
    
    this.EmpleoDetailService.getdetalleLista(this.tokens.getTokenjob()).subscribe(
    data => {
      this.currentDetalleLista = data;
      this.currentDetalleLista.imagen = data.logoEmpresa.urlImagen;
      this.currentDetalleLista.descripcionPuestoTrabajo = data.descripcionPuestoTrabajo
      if (this.currentDetalleLista.descripcionPuestoTrabajo){ 
        this.currentDetalleLista.descripcionPuestoTrabajo = this.currentDetalleLista.descripcionPuestoTrabajo.replace(/\n/g, '<br />');
      }
    },
    error => {
    });
  }

  Postularempleo(){
    
    if(this.tokens.getUser()){

      this.auxPostu = this.tokens.getUser()

      if(this.auxPostu.idUsuario === undefined){
      }else{
        var a = this.auxPostu.authorities[0];
        switch (a.authority) {
          case 'ROLE_RECLUTADOR':   
              this.idreclutador =  this.auxPostu.idUsuario                   
            break;
          case 'ROLE_POSTULANTE': 
              this.idpostulante = this.auxPostu.idUsuario 
            break;      
          default:
            break;
        }
      }
    }else{

    }

    if(this.idpostulante != null || this.idpostulante != undefined  ){
        this.EmpleoDetailService.PostularTrabajoenDetalle(this.idpostulante,this.currentDetalleLista.idPuestoTrabajo).subscribe(
          data => {
            this.aviso = data.message;
          },
          error => {
            this.msgerror = error.error.message;
            this.aviso = this.msgerror;
            
          });
    }else{      
      this.aviso = "Debes de Iniciar sesion como postulante";
      this.verRedireccion = true;
    }
  }

}