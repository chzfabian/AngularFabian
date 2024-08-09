import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InscripcionesComponent,
    AbmInscripcionesComponent
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
    MatOptionModule,
    MatSelectModule,
    RouterModule.forChild([
      {
        path: '',
        component: InscripcionesComponent
      }
    ])
  ],
})
export class InscripcionesModule { }
