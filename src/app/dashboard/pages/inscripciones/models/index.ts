import { Alumnos } from "../../alumnos/models";
import { Curso } from "../../cursos/models";

export interface Inscripcion {
    id: number;
    curso: Curso;
    alumno: Alumnos;
}

export interface CrearInscripcionPayload {
    curso: Curso;
    alumno: Alumnos;
  }  