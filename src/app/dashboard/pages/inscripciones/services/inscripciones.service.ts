import { BehaviorSubject, Observable, take } from "rxjs";
import { CrearInscripcionPayload, Inscripcion } from "../models";
import { Injectable } from "@angular/core";

const INSCRIPCIONES_MOCKS: Inscripcion[] = [
  {
    id:1,
    curso: {
      id: 1,
      nombre: 'Angular',
      fecha_fin: new Date(),
      fecha_inicio: new Date()
    },
    alumno: {
      id: 1,
      nombre: 'Emiliano',
      apellido: 'Martinez',
      fecha_nacimiento: new Date('1992-09-02'),
      email: 'dibu@gmail.com'
    }
  },
  {
    id:2,
    curso: {
      id: 2,
      nombre: 'Javascript',
      fecha_fin: new Date(),
      fecha_inicio: new Date()
    },
    alumno: {
      id: 2,
      nombre: 'Paulo',
      apellido: 'Dybala',
      fecha_nacimiento: new Date('1993-11-15'),
      email: 'pdybala@gmail.com',
    }
  },
  {
    id:3,
    curso: {
      id: 3,
      nombre: 'Desarrollo Web',
      fecha_fin: new Date(),
      fecha_inicio: new Date()
    },
    alumno: {
      id: 3,
      nombre: 'Lionel',
      apellido: 'Messi',
      fecha_nacimiento: new Date('1987-06-24'),
      email: 'lmessi10@mail.com',
    }
  }
];

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private inscripciones$ = new BehaviorSubject<Inscripcion[]>(
    []
  );

  constructor() {}

  obtenerInscripciones(): Observable<Inscripcion[]> {
    this.inscripciones$.next(INSCRIPCIONES_MOCKS);
    return this.inscripciones$.asObservable();
  }

  eliminarInscripciones(inscripcionId: number): Observable<Inscripcion[]> {
    this.inscripciones$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (inscripciones) => {
        const cursosActualizados = inscripciones.filter((inscripcion) => inscripcion.id !== inscripcionId)
        this.inscripciones$.next(cursosActualizados);
      },
      complete: () => {},
      error: () => {}
    });

    return this.inscripciones$.asObservable();
  }

  crearInscripcion(payload: CrearInscripcionPayload): Observable<Inscripcion[]> {
    this.inscripciones$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (inscripciones) => {
          this.inscripciones$.next([
            ...inscripciones,
            {
              id: inscripciones.length + 1,
              ...payload,
            },
          ]);
        },
        complete: () => {},
        error: () => {}
      });
    return this.inscripciones$.asObservable();
  }


}
