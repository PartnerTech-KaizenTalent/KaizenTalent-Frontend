import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { ContactanosService } from './contactanos.service'
@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: []
})
export class ContactanosComponent implements OnInit {
  message: any;
  verificar = false;

  constructor(private cd:ChangeDetectorRef,
              private tokens: TokenStorageService,
              private ContactanosService:ContactanosService,
              private fb:FormBuilder ) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }

  public contactanosModalForm = this.fb.group({    

    nombreUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)")
    ])),

     emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
     ])), 

     asuntoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2)
     ])), 

     mensajeUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3)
     ]))

  });


  EnviarMensaje(){
    var mensaje: any = {
      nombreUsuario : this.contactanosModalForm.controls['nombreUsuario'].value,
      emailUsuario : this.contactanosModalForm.controls['emailUsuario'].value,
      asuntoUsuario : this.contactanosModalForm.controls['asuntoUsuario'].value,
      mensajeUsuario : this.contactanosModalForm.controls['mensajeUsuario'].value,
    }

    this.ContactanosService.Contactanos(mensaje).subscribe(
        data => {    
          data;
          this.verificar = true;
          this.message= data.message;  

        },
        err => {
          this.message = err.error.message;
          this.verificar = true;

        });   
    }       

}
