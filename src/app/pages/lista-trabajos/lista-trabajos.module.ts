import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ListaTrabajosComponent } from './lista-trabajos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavFooterModule } from '../nav-footer/nav-footer.module';
import { PalabraClavePipe } from './pipe/palabra-clave.pipe';
import { CiudadPipe } from './pipe/ciudad.pipe';
import { CategoriaPipe } from './pipe/categoria.pipe';
import { FechaPublicacionPipe } from './pipe/fecha-publicacion.pipe';
import { ExperienciaPipe } from './pipe/experiencia.pipe';

@NgModule({
  declarations: [
    ListaTrabajosComponent,
    PalabraClavePipe,
    CiudadPipe,
    CategoriaPipe,
    FechaPublicacionPipe,
    ExperienciaPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    NavFooterModule
  ]
})
export class ListaTrabajosModule { 


  
}
