import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostulanteProfileComponent } from './postulante/postulante-profile.component';
import { ReclutadorProfileComponent } from './reclutador/reclutador-profile.component';
import { EstudiosComponent } from './postulante/estudios/estudios.component';
import { ExperienciaLaboralComponent } from './postulante/experiencia-laboral/experiencia-laboral.component';
import { PostulacionesComponent } from './postulante/postulaciones/postulaciones.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { PausedEmpleoComponent } from './reclutador/publicaciones/paused-empleo/paused-empleo.component';
import { ActiveEmpleoComponent } from './reclutador/publicaciones/active-empleo/active-empleo.component';
import { NoActiveEmpleoComponent } from './reclutador/publicaciones/no-active-empleo/no-active-empleo.component';
import { PublicarEmpleoComponent } from './reclutador/publicar-empleo/publicar-empleo.component';
import { ListaPostulantesComponent } from './reclutador/lista-postulantes/lista-postulantes.component';
import { ProfilePostulanteComponent } from './reclutador/profile-postulante/profile-postulante.component';
import { NavFooterModule } from '../nav-footer/nav-footer.module';
import { PublicacionesComponent } from './reclutador/publicaciones/publicaciones.component';
import { IdiomasComponent } from './postulante/idiomas/idiomas.component';
import { HabilidadesComponent } from './postulante/habilidades/habilidades.component';
import { ConocimientosComponent } from './postulante/conocimientos/conocimientos.component';
import { ExperienciaLaboralPipe } from './postulante/experiencia-laboral/experiencia-laboral.pipe';
import { EstudiosPipe } from './postulante/estudios/estudios.pipe';
import { ConocimientosPipe } from './postulante/conocimientos/conocimientos.pipe';
import { HabilidadesPipe } from './postulante/habilidades/habilidades.pipe';
import { IdiomasPipe } from './postulante/idiomas/idiomas.pipe';
import { ProfilePostulantePipe } from './reclutador/profile-postulante/profile-postulante.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    PostulanteProfileComponent,
    ReclutadorProfileComponent,
    EstudiosComponent,
    ExperienciaLaboralComponent,
    PostulacionesComponent,
    PausedEmpleoComponent,
    ActiveEmpleoComponent,
    NoActiveEmpleoComponent,
    PublicarEmpleoComponent,
    ListaPostulantesComponent,
    ProfilePostulanteComponent,
    PublicacionesComponent,
    IdiomasComponent,
    HabilidadesComponent,
    ConocimientosComponent,
    ExperienciaLaboralPipe,
    EstudiosPipe,
    ConocimientosPipe,
    HabilidadesPipe,
    IdiomasPipe,
    ProfilePostulantePipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    NavFooterModule,
    ImageCropperModule
  ]
})
export class ProfileModule { }

