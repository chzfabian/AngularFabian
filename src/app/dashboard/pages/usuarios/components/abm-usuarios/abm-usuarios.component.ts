import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.scss'],
})
export class AbmUsuariosComponent {
  nombreControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  apellidoControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  tokenControl = new FormControl('', [Validators.required]);
  roleControl = new FormControl('', [Validators.required]);

  usuarioForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    email: this.emailControl,
    password: this.passwordControl,
    token: this.tokenControl,
    role: this.roleControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      const usuarioParaEditar = data.usuario;
      this.nombreControl.setValue(usuarioParaEditar.nombre);
      this.apellidoControl.setValue(usuarioParaEditar.apellido);
      this.emailControl.setValue(usuarioParaEditar.email);
      this.passwordControl.setValue(usuarioParaEditar.password);
      this.tokenControl.setValue(usuarioParaEditar.token);
      this.roleControl.setValue(usuarioParaEditar.role);
    }
  }

  guardar(): void {
    if (this.usuarioForm.valid) {
      this.dialogRef.close(this.usuarioForm.value);
    } else {
      this.usuarioForm.markAllAsTouched();
    }
  }
}
