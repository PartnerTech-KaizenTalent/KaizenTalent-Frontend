import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { Idioma, NivelIdioma } from '../../../tools/data-lists';
import { IdiomasService } from './idiomas.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: []
})
export class IdiomasComponent implements OnInit {

  Datalist:any;
  msgerror:any;
  eleccion:any;

  Idioma = Idioma;
  NivelIdioma = NivelIdioma;
  postulante: any;
  CurrentIdioma: any;
  message: any;
  ListIdi: any;
  nivelSkill: any;
  nombreSkill: any;
  Datalistidioma: any;
  eleccionidioma: any;
  chooseidioma: any;
  choosenivel: any;

   

  constructor(private fb:FormBuilder,
              private tokenService:TokenStorageService,
              private IdiomasService:IdiomasService,
              private cd:ChangeDetectorRef) { }

  

  ngOnInit(): void {
    this.getIdioma();
  }

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }

  //pipe
  filterIdiomas(idi: any) {

    if( idi.nombreSkill !== null){
      return idi
    }    
    
  }

  public idiomasModalForm = this.fb.group({    
    nombreIdioma: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
     ])), 

    nivelIdioma: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15)
     ]))
    
  });

  public idiomasUpdateModalForm = this.fb.group({    
    nombreIdioma: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
     ])), 

    nivelIdioma: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15)
     ]))  
  });

  getIdioma(){
    this.postulante = this.tokenService.getUser();

    this.IdiomasService.mostrarIdioma( this.postulante.idUsuario).subscribe(
      data => {    
        this.CurrentIdioma =data;
        if(this.CurrentIdioma.nombreSkill) {
          this.CurrentIdioma = data.sort((a: any, b: any) => b.nombreSkill.slice(-4) - a.nombreSkill.slice(-4));
        }else{
          this.CurrentIdioma =data;
        }

      });       
  }

  SeleccionarIdioma(e:any){
    let idioma = e.target.value;
    this.chooseidioma = idioma;
  }
  SeleccionarNivel(e:any){
    let nivel = e.target.value;
    this.choosenivel = nivel;
  }

  registrarIdioma(){
    this.postulante = this.tokenService.getUser();

    var idioma: any = {
      nombreIdioma: this.chooseidioma, 
      nivelIdioma: this.choosenivel
    }
    
    this.IdiomasService.guardarIdioma(this.postulante.idUsuario, idioma).subscribe(
      data => {    
        data;
        window.location.reload();
      },
      err => {
        this.message = err.error.message;
       
      });
  }

  SeleccionarIdi(idi:any) {
    this.ListIdi = idi;
    this.tokenService.saveIdi(this.ListIdi.idSkill);  
    this.nivelSkill = this.ListIdi.nivelSkill;
    this.nombreSkill = this.ListIdi.nombreSkill;  
  }

  updateIdioma(){     
    this.postulante = this.tokenService.getUser();

    if(this.chooseidioma){
      this.chooseidioma=this.chooseidioma
    }else{
      this.chooseidioma=this.nombreSkill
    }

    if(this.choosenivel){
      this.choosenivel=this.choosenivel
    }else{
      this.choosenivel=this.nivelSkill
    }

    var idioma: any = {
      nombreIdioma: this.chooseidioma,     
      nivelIdioma: this.choosenivel
    }
    
    this.IdiomasService.actualizarIdioma(this.postulante.idUsuario, this.ListIdi.idSkill, idioma).subscribe(
      data => {    
        window.location.reload();

    });

      
  }

  deleteIdi(){
    this.IdiomasService.borrarIdioma(this.ListIdi.idSkill).subscribe(
      data => {    
        window.location.reload();
      });
  }

}
