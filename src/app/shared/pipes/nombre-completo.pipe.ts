import { Pipe, PipeTransform } from '@angular/core';
import { Alumnos } from 'src/app/dashboard/pages/alumnos/models';


@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: Alumnos, ...args: unknown[]): unknown {
    const newValue = `${value.nombre} ${value.apellido}`;
    switch (args[0]) {
      case 'mayuscula':
        return newValue.toUpperCase();
      case 'minuscula':
        return newValue.toLowerCase();
      default:
        return newValue;
    }
  }

}
