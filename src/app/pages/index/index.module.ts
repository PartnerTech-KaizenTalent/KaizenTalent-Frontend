import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { RouterModule} from '@angular/router';

import { NavFooterModule} from '../nav-footer/nav-footer.module';
import { TipoJornadaPipe } from './filtro-index/tipo-jornada.pipe'



@NgModule({
  declarations: [
    IndexComponent,
    TipoJornadaPipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    RouterModule,
    FormsModule,
    NavFooterModule,
    
   
  ]
})
export class IndexModule { }
