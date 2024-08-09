import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from './services/alumnos.service';
import { Alumnos } from './models';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {
  
  estudiantes: Alumnos[] = [
    {
      id: 1,
      nombre: 'Emiliano',
      apellido: 'Martinez',
      fecha_nacimiento: new Date('1992-09-02'),
      email: 'dibu@gmail.com',
    },
    {
      id: 2,
      nombre: 'Paulo',
      apellido: 'Dybala',
      fecha_nacimiento: new Date('1993-11-15'),
      email: 'pdybala@gmail.com',
    },
    {
      id: 3,
      nombre: 'Lionel',
      apellido: 'Messi',
      fecha_nacimiento: new Date('1987-06-24'),
      email: 'lmessi10@mail.com',
    },
  ];

  dataSource = new MatTableDataSource<Alumnos>();

  displayedColumns: string[] = ['id', 'nombreCompleto', 'fecha_nacimiento', 'email', 'ver_detalle', 'eliminar', 'editar'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
  ) {
    this.alumnosService.obtenerAlumnos()
      .subscribe((alumnos) => {
        this.dataSource.data = alumnos;
      })
  }

  irAlDetalle(alumnoId: number): void {
    this.router.navigate([alumnoId], {
      relativeTo: this.activatedRoute,
    });
  }

  crearAlumno(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent)
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,
          // AGREGANDO NUEVO ELEMENTO:
          {
            ...valor, // { nombre: 'xxxxxx', apellido: 'xxxxx' }
            fecha_registro: new Date(),
            id: this.dataSource.data.length + 1,
          }
        ];
      }
    })
  }

  borrarAlumno(fila: Alumnos){
    let index = this.dataSource.data.findIndex(elemento => elemento.id === fila.id) ;
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = this.dataSource.data;
  }

  editarAlumno(alumnoParaEditar: Alumnos): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent, {
      data: {
        alumnoParaEditar
      }
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.dataSource.data = this.dataSource.data.map(
          (alumnoActual) => alumnoActual.id === alumnoParaEditar.id
            ? ({ ...alumnoActual, ...valorDelFormulario}) // { nombre: 'xxxxxx', apellido: 'xxxxx' }
            : alumnoActual,
        );
      }
    })
  }


}
