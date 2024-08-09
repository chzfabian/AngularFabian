import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../../../cursos/models';
import { Alumnos } from '../../../alumnos/models';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss']
})
export class AbmInscripcionesComponent implements OnInit {

  cursoControl = new FormControl([], [Validators.required]);
  alumnoControl = new FormControl([], [Validators.required]);

  public listaCursos: Curso[] = [];
  public listaAlumnos: Alumnos[] = [];

  inscripcionForm = new FormGroup({
    curso: this.cursoControl,
    alumno: this.alumnoControl,
  });


  constructor(
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private dialogRef: MatDialogRef<any>,
  ) {
  }

  ngOnInit(): void {
    this.alumnosService.obtenerAlumnos()
    .subscribe((alumnos) => {
      this.listaAlumnos = alumnos;
    });
    this.cursosService.obtenerCursos()
    .subscribe((cursos) => {
      this.listaCursos = cursos;
    })
  }

  guardar(): void {
    if (this.inscripcionForm.valid) {
      
      console.log(this.inscripcionForm.value)
      this.dialogRef.close(this.inscripcionForm.value)

    } else {
      this.inscripcionForm.markAllAsTouched();
    }
  }

}