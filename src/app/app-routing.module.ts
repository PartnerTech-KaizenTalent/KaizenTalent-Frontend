import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostulanteSigninComponent } from './pages/signin/postulante/postulante-signin.component';
import { ReclutadorSigninComponent } from './pages/signin/reclutador/reclutador-signin.component';

import { PostulanteSignupComponent } from './pages/signup/postulante/postulante-signup.component';
import { PostulanteVerifyComponent } from './pages/signup/postulante/postulante-verify/postulante-verify.component';
import { ReclutadorSignupComponent } from './pages/signup/reclutador/reclutador-signup.component';

import { IndexComponent } from './pages/index/index.component';
import { ReclutadorProfileComponent } from './pages/profile/reclutador/reclutador-profile.component';
import { PostulanteProfileComponent } from './pages/profile/postulante/postulante-profile.component';
import { PasswordRequestComponent } from './pages/reset_password/password-request/password-request.component';
import { PasswordUpdateComponent } from './pages/reset_password/password-update/password-update.component';

import { EmpleoDetailComponent } from './pages/empleo-detail/empleo-detail.component'
import { ListaTrabajosComponent } from './pages/lista-trabajos/lista-trabajos.component';
import { PostulacionesComponent } from './pages/profile/postulante/postulaciones/postulaciones.component';
import { PublicarEmpleoComponent } from './pages/profile/reclutador/publicar-empleo/publicar-empleo.component';
import { ListaPostulantesComponent } from './pages/profile/reclutador/lista-postulantes/lista-postulantes.component';
import { ProfilePostulanteComponent } from './pages/profile/reclutador/profile-postulante/profile-postulante.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { PublicacionesComponent } from './pages/profile/reclutador/publicaciones/publicaciones.component';
import { HeadhuntingComponent } from './pages/headhunting/headhunting.component';
import { PostulanteDetailComponent } from './pages/headhunting/postulante-detail/postulante-detail.component'
import { ReclutadorVerifyComponent } from './pages/signup/reclutador/reclutador-verify/reclutador-verify.component';
import { Error403Component } from './pages/error403/error403.component';
import { AuthGuard } from './pages/guard/auth.guard';
import { Auth2Guard } from './pages/guard/auth2.guard';

const routes: Routes = [
  { path: 'signin/postulante', component: PostulanteSigninComponent, data: { title: 'Iniciar Sesi??n ??? Kaizen Talent' } },
  { path: 'signin/reclutador', component: ReclutadorSigninComponent, data: { title: 'Iniciar Sesi??n  Reclutador ??? Kaizen Talent' } },

  { path: 'signup/postulante', component: PostulanteSignupComponent, data: { title: 'Reg??strate | Kaizen Talent' } },
  { path: 'signup/postulante/verify/:token', component: PostulanteVerifyComponent, data: { title: 'Verificar Registro | Kaizen Talent' } },

  { path: 'signup/reclutador', component: ReclutadorSignupComponent, data: { title: 'Registro Reclutador | Kaizen Talent' } },
  { path: 'signup/reclutador/verify/:token', component: ReclutadorVerifyComponent, data: { title: 'Verificar Registro | Kaizen Talent' } },

  { path: 'error/403', component: Error403Component, data: { title: 'Ocurri?? un Error | Kaizen Talent' } },



  { path: 'reclutador/:idReclutador/profile', component: ReclutadorProfileComponent, data: { title: 'Mi Perfil | Kaizen Talent'}, canActivate:[AuthGuard] },
  { path: 'postulante/:idPostulante/profile', component: PostulanteProfileComponent, data: { title: 'Mi Perfil | Kaizen Talent'}, canActivate:[Auth2Guard] },
  { path: 'index', component: IndexComponent, data: { title: 'Kaizen Talent' }},

  { path: 'password/request', component: PasswordRequestComponent, data: {title: 'Recupera tu contrase??a - Kaizen Talent '}},

  { path: 'restore/password/:token', component: PasswordUpdateComponent, data: {title: 'Recupera tu contrase??a - Kaizen Talent '}},
  
  
  { path: 'puestotrabajo/:idPuestoTrabajo/detail', component:EmpleoDetailComponent},
  { path: 'empleos', component:ListaTrabajosComponent },
  { path: 'postulante/:idPostulante/postulaciones', component:PostulacionesComponent, canActivate:[Auth2Guard]},
  { path: 'reclutador/:idReclutador/publicar', component:PublicarEmpleoComponent, canActivate:[AuthGuard]},
  { path: 'listacandidatos', component:ListaPostulantesComponent, canActivate:[AuthGuard]},
  { path: 'perfilcandidato', component:ProfilePostulanteComponent, canActivate:[AuthGuard]},
  { path: 'contactanos', component:ContactanosComponent },
  { path: 'reclutador/:idReclutador/publicaciones', component:PublicacionesComponent, canActivate:[AuthGuard]},
  { path: 'headhunting', component:HeadhuntingComponent, canActivate:[AuthGuard] },
  { path: 'headhunting/perfil', component:PostulanteDetailComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: 'index'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

