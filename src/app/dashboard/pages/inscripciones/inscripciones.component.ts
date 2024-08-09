import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InscripcionesService } from './services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { Inscripcion } from './models';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {

    dataSource = new MatTableDataSource();
  
    displayedColumns = [
      'id_curso',
      'nombre_curso',
      'id_alumno',
      'nombre_alumno',
      'apellido_alumno',
      'eliminar'
    ];
  
    constructor(
      private inscripcionesService: InscripcionesService,
      private dialog: MatDialog
    ) {}
  
    ngOnInit(): void {
      this.inscripcionesService.obtenerInscripciones().subscribe({
        next: (inscripciones) => {
          this.dataSource.data = inscripciones;
        },
      });
    }

    eliminarInscripcion(inscripcion: Inscripcion): void {
    if (confirm('Está seguro?')) {
      this.inscripcionesService.eliminarInscripciones(inscripcion.id);
    }
  }

  crearInscripciones(): void {
    const dialog = this.dialog.open(AbmInscripcionesComponent);
    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.inscripcionesService.crearInscripcion(formValue)
        }
      });
  }

}
