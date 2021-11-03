import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulanteSignupComponent } from './postulante/postulante-signup.component';
import { ReclutadorSignupComponent } from './reclutador/reclutador-signup.component';
import { PostulanteVerifyComponent } from './postulante/postulante-verify/postulante-verify.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReclutadorVerifyComponent } from './reclutador/reclutador-verify/reclutador-verify.component';

@NgModule({
  declarations: [
    PostulanteSignupComponent,
    ReclutadorSignupComponent,
    PostulanteVerifyComponent,
    ReclutadorVerifyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    NgbModule
  ]
})
export class SignupModule { }
