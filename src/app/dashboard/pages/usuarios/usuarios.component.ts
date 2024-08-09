import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UsuariosService } from './services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/core/models';
import { AbmUsuariosComponent } from './components/abm-usuarios/abm-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource();

  displayedColumns = [
    'id',
    'nombre',
    'apellido',
    'email',
    'detalle',
    'editar',
    'eliminar',
  ];

  usuariosSuscription: Subscription | null = null;

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.usuariosSuscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
      },
    });
  }

  crearUsuario(): void {
    const dialog = this.dialog.open(AbmUsuariosComponent);
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.usuariosService.crearUsuario(formValue);
      }
    });
  }

  editarUsuario(usuario: Usuario): void {
    const dialog = this.dialog.open(AbmUsuariosComponent, {
      data: {
        usuario,
      },
    });

    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.usuariosService.editarUsuario(usuario.id, formValue);
      }
    });
  }

  eliminarUsuario(usuario: Usuario): void {
    if (confirm('Está seguro?')) {
      this.usuariosService.eliminarUsuario(usuario.id);
    }
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  irAlDetalle(usuarioId: number): void {
    this.router.navigate([usuarioId], {
      relativeTo: this.activatedRoute,
    });
  }
}
