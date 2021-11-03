import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { PublicacionesService} from './publicaciones.service'

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: []
})
export class PublicacionesComponent implements OnInit {
  currentReclutador: any;
  idReclutador: any;
  basicinfoData: any = {};
  basicInfo: any = {};
  message: any;

  constructor( private tokenService:TokenStorageService,
               private PublicacionesService:PublicacionesService,
               private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.GetProfileBasicInfo();
  }

  ngAfterContentChecked(){
    this.cd.detectChanges();
    this.message = this.tokenService.getCont();
  }
  
  GetProfileBasicInfo() {

    this.currentReclutador = this.tokenService.getUser();
    this.idReclutador = this.currentReclutador.idReclutador;

    this.PublicacionesService.BasicInfo(this.currentReclutador.idReclutador).subscribe(
      data => {
        this.basicinfoData = data;
        this.basicInfo.nombreReclutador = this.basicinfoData.nombreReclutador,
        this.basicInfo.logoempresaReclutador = this.basicinfoData.logoempresaReclutador.urlImagen              

        console.log(this.basicInfo);
        if (this.basicInfo.descripcionReclutador){ 
          this.basicInfo.descripcionReclutador = this.basicInfo.descripcionReclutador.replace(/\n/g, '<br />');
        }
      }
    );
  }


}
