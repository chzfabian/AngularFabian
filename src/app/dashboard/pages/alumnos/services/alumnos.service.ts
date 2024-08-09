import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Alumnos } from '../models';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  // Subject
  private estudiantes2$ = new Subject<Alumnos[]>();

  // BehaviorSubject
  private estudiantes$ = new BehaviorSubject<Alumnos[]>([
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
  ])

  constructor() { }

  obtenerAlumnos(): Observable<Alumnos[]> {
    return this.estudiantes$.asObservable();
  }

  obtenerAlumnoPorId(id: number): Observable<Alumnos | undefined> {
    return this.estudiantes$.asObservable()
      .pipe(
        map((alumnos) => alumnos.find((a) => a.id === id))
      )
  }
}

