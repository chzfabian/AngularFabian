import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AbmUsuariosComponent } from './components/abm-usuarios/abm-usuarios.component';
import { UsuarioDetalleComponent } from './pages/usuario-detalle/usuario-detalle.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    AbmUsuariosComponent,
    UsuarioDetalleComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DirectivesModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsuariosComponent
      },
      {
        path: ':id',
        component: UsuarioDetalleComponent       
      }
    ])
  ]
})
export class UsuariosModule { }
