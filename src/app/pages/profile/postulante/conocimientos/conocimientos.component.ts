import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { NivelGeneral } from '../../../tools/data-lists';
import { ConocimientosService } from './conocimientos.service'

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: []
})
export class ConocimientosComponent implements OnInit {
  [x: string]: any;

  Datalist:any;
  msgerror:any;
  eleccion:any;
  
  NivelGeneral = NivelGeneral;
  postulante: any;
  CurrentConocimiento: any;
  message: any;
  ListCon: any;
  nombreConocimiento: any;
  nivelSkill:any;
  nombrSkill:any;
  choosenivel:any;

  constructor( private fb:FormBuilder,
               private ConocimientosService: ConocimientosService,
               private tokenService:TokenStorageService,
               private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getConocimiento();
  }

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }

  filterConocimientos(con: any) {

    if( con.nombreSkill !== null){
      return con
    }    
    
  }

  public conocimientosModalForm = this.fb.group({    
    nombreConocimiento: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40)
     ])), 
    nivelConocimiento: new FormControl   
  });

  public conocimientosUpdateModalForm = this.fb.group({    
    nombreConocimiento: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40)
     ])), 
    nivelConocimiento: new FormControl   
  });

  getConocimiento(){
    this.postulante = this.tokenService.getUser();

      this.ConocimientosService.mostrarConocimiento( this.postulante.idPostulante).subscribe(
        data => {    
          this.CurrentConocimiento = data;
          if (this.CurrentConocimiento.nombreSkill) {
            this.CurrentConocimiento = data.sort((a: any, b: any) => b.nombreSkill.slice(-4) - a.nombreSkill.slice(-4));
          } else {
            this.CurrentConocimiento = data;
          }
  
        }); 
      
    
          
  }

  registrarConocimiento(){
    this.postulante = this.tokenService.getUser();

    var conocimiento: any = {
      nombreConocimiento: this.conocimientosModalForm.controls['nombreConocimiento'].value,     
      nivelConocimiento: this.choosenivel
    }

    try {
      this.Datalist = this.NivelGeneral.filter(y => y.value === this.choosenivel)[0];
      console.log(this.Datalist.value);

      this.ConocimientosService.guardarConocimiento(this.postulante.idPostulante, conocimiento).subscribe(
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

  SeleccionarCon(con:any) {
    this.ListCon = con;
    this.tokenService.saveCon(this.ListCon.idSkill);  
    this.nivelSkill = this.ListCon.nivelSkill;
    this.nombreSkill = this.ListCon.nombreSkill;  
  }

  SeleccionarNivel(e:any){
    let nivel = e.target.value;
    this.choosenivel = nivel;
  }


  updateConocimiento(){     
    this.postulante = this.tokenService.getUser();

    if(this.choosenivel){
      this.choosenivel=this.choosenivel
    }else{
      this.choosenivel=this.nivelSkill
    }

    var conocimiento: any = {
      nombreConocimiento: this.conocimientosUpdateModalForm.controls['nombreConocimiento'].value,     
      nivelConocimiento: this.choosenivel
    }

    try {

      //this.Datalist = this.NivelGeneral.filter(y => y.value === this.eleccion)[0];
      //console.log(this.Datalist.value);

      this.ConocimientosService.actualizarConocimiento(this.postulante.idPostulante, this.ListCon.idSkill, conocimiento).subscribe(
        data => {    
          window.location.reload();

        })
    } catch (error) {
      this.msgerror = "Seleccione una opción de la lista";
    }

    }

  deleteCon(){
    this.ConocimientosService.borrarConocimiento(this.ListCon.idSkill).subscribe(
      data => {    
        window.location.reload();
      });
  }

}
