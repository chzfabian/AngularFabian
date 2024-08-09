import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.scss'],
})
export class UsuarioDetalleComponent implements OnDestroy {
  usuario: Usuario | undefined;

  private destroyed$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {
    this.usuariosService
      .getUsuarioById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((usuario) => (this.usuario = usuario));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
