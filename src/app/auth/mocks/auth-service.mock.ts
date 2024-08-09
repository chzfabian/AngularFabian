import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginFormValue } from '../services/auth.service';
import { Usuario } from 'src/app/core/models';

export const USUARIO_ADMIN_MOCK: Usuario = {
  id: 1,
  apellido: 'apellidotest',
  email: 'test@mail.com',
  nombre: 'nombretest',
  role: 'admin',
  token: 'Mmy8UP3EnFbLMM7kZxN3pdeL44wmDYCSGYRiMEFm',
  password: '123456',
};

export class AuthServiceMock {
  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  login(formValue: LoginFormValue): void {
    this.authUser$.next(USUARIO_ADMIN_MOCK);
  }

  verificarToken(): Observable<boolean> {
    return of(true);
  }
}
