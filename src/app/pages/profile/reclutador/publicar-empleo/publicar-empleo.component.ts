import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PublicarEmpleoService} from './publicar-empleo.service';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { Ciudades, Categorias, TipoPostulacion, Experiencia,Publicacion, Remoto} from '../../../tools/data-lists';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicar-empleo',
  templateUrl: './publicar-empleo.component.html',
  styleUrls: []
})
export class PublicarEmpleoComponent implements OnInit {

   //Variables
   currentUser: any;
   message: any;

   //Datalist
   Categorias = Categorias;
   TipoPostulacion =TipoPostulacion;
   Experiencia = Experiencia;
   Publicacion = Publicacion;
   Remoto = Remoto;
 
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

   //Formulario que conecta con el HTML
   public puestostrabajoform = this.fb.group({     
     
     nombrePuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
     ])), 
      
     ciudadPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])), 
     categoriaPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])), 
     trabajoremotoPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])),        
     tipojornadaPuestoTrabajo: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9)
    ])),       
     sueldoPuestoTrabajo: new FormControl('', Validators.compose([ 
      Validators.min(1)           
     ])), 
     experienciaPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ])), 
     descripcionPuestoTrabajo: new FormControl('', Validators.compose([
     ])),
     periodopublicacionPuestoTrabajo: new FormControl('', Validators.compose([
       Validators.required
     ]))
   });
  expPuestoTrabajo: any;
  pPublicacion: any;
  eleccioncity: any;
  eleccionjornada: any;
  eleccioncat: any;
  elecciontime: any;
  eleccionper: any;
  eleccionmod: any;
  msgerrorcity: any;
  msgerrorjor: any;
  msgerrorcat: any;
  msgerrortime: any;
  msgerrorper: any;
  msgerrormod: any;
  Datalistcity: any;
  Datalistjor: any;
  Datalistcat: any;
  Datalisttime: any;
  Datalistper: any;
  Datalistmod: any;
  msgerror: any;
  message2: any;
 

  constructor(private fb: FormBuilder,
              private PublicarEmpleoService: PublicarEmpleoService,
              private token: TokenStorageService, private route:Router,
              private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  ngAfterContentChecked(){
    this.cd.detectChanges();
    this.message = this.token.getCont();
  }

  

  Publicarempleo(): void {  

    this.expPuestoTrabajo = this.puestostrabajoform.controls['experienciaPuestoTrabajo'].value;      

    switch (this.expPuestoTrabajo) {
      case 'Sin Experiencia' :
        this.expPuestoTrabajo = 0;
        break;
      case '3 Meses de Experiencia' :
        this.expPuestoTrabajo = 3;
        break;
      case '6 Meses de Experiencia' :
        this.expPuestoTrabajo = 6;
        break;
      case '1 A??o de Experiencia' :
        this.expPuestoTrabajo = 12;
        break;
      case '3 A??os de Experiencia' :
        this.expPuestoTrabajo = 36;
        break;
      case '5 A??os de Experiencia' :
        this.expPuestoTrabajo = 60;
        break;     

      default:
        break;
    }


    this.pPublicacion = this.puestostrabajoform.controls['periodopublicacionPuestoTrabajo'].value;

    switch (this.pPublicacion) {
      case 'Semanal' :
        this.pPublicacion = 7;
        break;
      case 'Quincenal' :
        this.pPublicacion = 15;
        break;
      case 'Mensual' :
        this.pPublicacion = 30;
        break;            
      default:
        break;
    }

    var puestowork: any = {
      nombrePuestoTrabajo: this.puestostrabajoform.controls['nombrePuestoTrabajo'].value,
      ciudadPuestoTrabajo: this.puestostrabajoform.controls['ciudadPuestoTrabajo'].value,
      categoriaPuestoTrabajo: this.puestostrabajoform.controls['categoriaPuestoTrabajo'].value,
      modalidadPuestoTrabajo: this.puestostrabajoform.controls['trabajoremotoPuestoTrabajo'].value,
      tipojornadaPuestoTrabajo: this.puestostrabajoform.controls['tipojornadaPuestoTrabajo'].value,
      sueldoPuestoTrabajo: this.puestostrabajoform.controls['sueldoPuestoTrabajo'].value,
      experienciaPuestoTrabajo: this.expPuestoTrabajo,
      descripcionPuestoTrabajo: this.puestostrabajoform.controls['descripcionPuestoTrabajo'].value,
      periodoinicioPuestoTrabajo: this.pPublicacion
    }

      this.PublicarEmpleoService.Publicar(this.currentUser.idUsuario, puestowork).subscribe(
        data => {
          this.message2 = data.message;
         window.location.href='/reclutador/'+this.currentUser.idUsuario+'/publicaciones'
      },
      err => {
        this.message2 = err.error.message;
       
      });
    
  }

  cerrar(){
    window.location.reload();
  }
}
