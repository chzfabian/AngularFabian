import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, of, take, tap } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { enviroment } from 'src/environments/environments';
import { CrearUsuarioPayload } from '../models';

const USUARIO_MOCK: Usuario = {
  id: 1,
  apellido: 'apellidotest',
  email: 'test@mail.com',
  nombre: 'nombretest',
  role: 'admin',
  token: 'Mmy8UP3EnFbLMM7kZxN3pdeL44wmDYCSGYRiMEFm',
  password: '123456',
};


@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usuarios$ = new BehaviorSubject<Usuario[]>(
    []
  );

  constructor(
    private httpClient: HttpClient
  ) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios`)
      .pipe(
        tap((usuarios) => this.usuarios$.next(usuarios)),
        mergeMap(() => this.usuarios$.asObservable())
      );
  }

  getUsuarioById(usuarioId: number): Observable<Usuario | undefined> {
    return this.httpClient.get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios`)
      .pipe(
        map((usuarios) => usuarios.find((c) => c.id === usuarioId))
      )
  }

  crearUsuario(payload: CrearUsuarioPayload): Observable<Usuario[]> {
    this.usuarios$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (usuarios) => {
          this.usuarios$.next([
            ...usuarios,
            {
              id: usuarios.length + 1,
              ...payload,
            },
          ]);
        },
        complete: () => {},
        error: () => {}
      });
    return this.usuarios$.asObservable();
  }  

  editarUsuario(usuarioId: number, actualizacion: Partial<Usuario>): Observable<Usuario[]> {
    this.usuarios$
      .pipe(
        take(1),
      )
       .subscribe({
         next: (usuarios) => {
           const usuariosActualizados = usuarios.map((usuarios) => {
             if (usuarios.id === usuarioId) {
               return {
                 ...usuarios,
                 ...actualizacion,
               }
             } else {
               return usuarios;
             }
           })

           this.usuarios$.next(usuariosActualizados);
         },
         complete: () => {},
         error: () => {}
       });

    return this.usuarios$.asObservable();
  }


  eliminarUsuario(usuarioId: number): Observable<Usuario[]> {
    this.usuarios$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (usuarios) => {
        const usuariosActualizados = usuarios.filter((usuarios) => usuarios.id !== usuarioId)
        this.usuarios$.next(usuariosActualizados);
      },
      complete: () => {},
      error: () => {}
    });

    return this.usuarios$.asObservable();
  }

}
