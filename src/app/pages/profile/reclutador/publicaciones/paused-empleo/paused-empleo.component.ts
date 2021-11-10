import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { PausedEmpleoService } from './paused-empleo.service';


@Component({
  selector: 'app-paused-empleo',
  templateUrl: './paused-empleo.component.html',
  styleUrls: ['./paused-empleo.component.css']
})
export class PausedEmpleoComponent implements OnInit {
  ListPaused: any;
  ids: any;
  ListEmpleoCurrent: any;
  p : number =1 ;

  constructor(private PausedEmpleoService:PausedEmpleoService,
              private token: TokenStorageService,
              private route:Router) { }

  ngOnInit(): void {
    this.ids = this.token.getUser();

    this.getEmpleoPaused();
  }

  //get Tabla de empleo pausados con su respectivo API
  getEmpleoPaused(){
    this.PausedEmpleoService.getPublicacionPaused(this.ids.idUsuario).subscribe(data => {
      this.ListPaused = data;
    })
  }

  //Seleccionar un empleo de las listas de empleos (lista) -> es el parametro q se tomara del html
  Seleccionarempleo(lista:any) {
    this.ListEmpleoCurrent = lista;
  }

  //Ir a publicacion del trabajo
  verDetalle(){
    this.token.saveTokenjob(this.ListEmpleoCurrent.idPuestoTrabajo);
    this.route.navigate(['puestotrabajo/'+this.ListEmpleoCurrent.idPuestoTrabajo+'/detail']);
  }

  //guardar el token para ver la lista de canditatos
  verPostulantes(){
    this.token.saveTokenjob(this.ListEmpleoCurrent.idPuestoTrabajo);
    this.route.navigate(['/listacandidatos']);
  }

  
  //Reanudar empleo seleccionado
  ActivarEmpleo(){
    var trabajo:any = {
      idPuestoTrabajo: this.ListEmpleoCurrent.idPuestoTrabajo
    }
    this.PausedEmpleoService.putPublicacionactivar(trabajo.idPuestoTrabajo).subscribe(data => {
      data;
      window.location.reload();

    });
  }

  EliminarEmpleo(){
    this.PausedEmpleoService.deleteEmpleo(this.ListEmpleoCurrent.idPuestoTrabajo).subscribe(data => {
      data;
      window.location.reload(); 

    });
  }

}
