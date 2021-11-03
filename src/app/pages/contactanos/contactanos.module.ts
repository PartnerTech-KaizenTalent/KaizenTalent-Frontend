import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactanosComponent} from './contactanos.component'
import { NavFooterModule } from '../nav-footer/nav-footer.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactanosComponent
  ],
  imports: [
    CommonModule,
    NavFooterModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class ContactanosModule { }
