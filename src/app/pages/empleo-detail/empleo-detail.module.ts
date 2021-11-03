import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpleoDetailComponent } from './empleo-detail.component';
import { NavFooterModule} from '../nav-footer/nav-footer.module'




@NgModule({
  declarations: [ 
    EmpleoDetailComponent  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NavFooterModule
  ]
})
export class EmpleoDetailModule { }
