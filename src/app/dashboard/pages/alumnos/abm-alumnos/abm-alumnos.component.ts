import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss'],
})
export class AbmAlumnosComponent {
  nombreControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  apellidoControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  fecNacControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  alumnosForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    fecha_nacimiento: this.fecNacControl,
    email: this.emailControl,
  });

  constructor(private dialogRef: MatDialogRef<AbmAlumnosComponent>) {}

  guardar(): void {
    if (this.alumnosForm.valid) {
      this.dialogRef.close(this.alumnosForm.value);
    } else {
      this.alumnosForm.markAllAsTouched();
    }
  }
}
