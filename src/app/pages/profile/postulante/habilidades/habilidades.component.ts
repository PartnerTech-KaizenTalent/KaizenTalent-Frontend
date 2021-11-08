import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { NivelGeneral } from '../../../tools/data-lists';
import {HabilidadesService} from './habilidades.service'

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: []
})
export class HabilidadesComponent implements OnInit {
  
  Datalist:any;
  msgerror:any;
  eleccion:any;

  NivelGeneral = NivelGeneral;
  postulante: any;
  message: any;
  CurrentHabilidad: any;
  ListHab: any;
  nivelSkill: any;
  nombreSkill: any;
  choosenivel: any;

  constructor( private fb:FormBuilder,
               private HabilidadesService:HabilidadesService,
               private tokenService:TokenStorageService,
               private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getHab();
  }

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }

  //pipe
  filterHabilidades(hab: any) {

    if( hab.nombreSkill !== null){
      return hab
    }    
    
  }

  public habilidadesModalForm = this.fb.group({    

    nombreHabilidad: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40)
     ])), 

    nivelHabilidad: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
     ]))

  });
  

  public habilidadesUpdateModalForm = this.fb.group({    
    nombreHabilidad: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40)
     ])), 

    nivelHabilidad: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
     ]))  
  });


  getHab(){
    this.postulante = this.tokenService.getUser();

    this.HabilidadesService.mostrarHabilidad( this.postulante.idUsuario).subscribe(
      data => {    
        this.CurrentHabilidad = data;

        if ( this.CurrentHabilidad.nombreSkill) {
          this.CurrentHabilidad = data.sort((a: any, b: any) => b.nombreSkill.slice(-4) - a.nombreSkill.slice(-4));
        } else {
          this.CurrentHabilidad = data;
        }


      });       
  }

  SeleccionHabilidad(e:any){
    let nivel = e.target.value;
    this.choosenivel = nivel;
  }

  registrarHabilidad(){
    this.postulante = this.tokenService.getUser();

    var habilidad: any = {
      nombreHabilidad: this.habilidadesModalForm.controls['nombreHabilidad'].value,     
      nivelHabilidad: this.choosenivel
    }
        
    try {

      this.Datalist = this.NivelGeneral.filter(y => y.value === this.choosenivel)[0];

      this.HabilidadesService.guardarHabilidad(this.postulante.idUsuario, habilidad).subscribe(
        data => {    
          data;
          window.location.reload();
        },
        err => {
          this.message = err.error.message;
         
        });
    } catch (error) {
      this.msgerror = "Seleccione una opción de la lista";
    }

       
  }

  Seleccionarhab(hab:any) {
    this.ListHab = hab;
    this.tokenService.saveHab(this.ListHab.idSkill);  
    this.nivelSkill = this.ListHab.nivelSkill;
    this.nombreSkill = this.ListHab.nombreSkill;    
  }

  updateHabilidad(){     
    
    this.postulante = this.tokenService.getUser();


    if(this.choosenivel){
      this.choosenivel=this.choosenivel
    }else{
      this.choosenivel=this.nivelSkill
    }

    var habilidad: any = {
      nombreHabilidad: this.habilidadesUpdateModalForm.controls['nombreHabilidad'].value,     
      nivelHabilidad: this.choosenivel
    }
    
    try {
      
     // this.Datalist = this.NivelGeneral.filter(y => y.value === this.choosenivel)[0];
     // console.log(this.Datalist.value);

      this.HabilidadesService.actualizarHabilidad(this.postulante.idUsuario, this.ListHab.idSkill, habilidad).subscribe(
        data => {    
          window.location.reload();

        })
    } catch (error) {
      this.msgerror = "Seleccione una opción de la lista";
    }

    }

  deleteHab(){
    this.HabilidadesService.borrarHabilidad(this.ListHab.idSkill).subscribe(
      data => {    
        window.location.reload();
      });
  }

  
}
