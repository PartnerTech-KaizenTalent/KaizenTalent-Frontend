import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadhuntingComponent } from './headhunting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PalabraClavePipe } from './filtros/palabraclave';
import { EdadInicioPipe } from './filtros/edad-inicio.pipe';
import { EdadFinPipe } from './filtros/edad-fin.pipe';
import { CiudadPipe } from './filtros/ciudad.pipe';
import { InstitucionEducativaPipe } from './filtros/institucion-educativa.pipe';
import { NavFooterModule} from '../nav-footer/nav-footer.module'
import { ConocimientoPipe } from './filtros/conocimiento.pipe'
import { IdiomaPipe } from './filtros/idioma.pipe'
import { HabilidadPipe } from './filtros/habilidad.pipe'
import { PostulanteDetailComponent } from './postulante-detail/postulante-detail.component';
import { PostulanteDetailPipe } from './postulante-detail/postulante-detail.pipe';
import { GeneralPipe } from './filtros/general.pipe';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HeadhuntingComponent,
    PalabraClavePipe,
    EdadInicioPipe,
    EdadFinPipe,
    CiudadPipe,
    InstitucionEducativaPipe,
    ConocimientoPipe,
    IdiomaPipe,
    HabilidadPipe,
    PostulanteDetailComponent,
    PostulanteDetailPipe,
    GeneralPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavFooterModule,
    NgxPaginationModule
  ]
})
export class HeadhuntingModule { }





