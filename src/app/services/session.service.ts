import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { UserDB } from '../models/userdb';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  estaLogeado: boolean = false;

  constructor(private dbService: DbService) { }

  login(usuario: string, password: string, rememberMe: boolean): Observable<boolean> {
    if (usuario === "Admin") {
      console.log("Intentando iniciar sesión como Admin");
      return this.dbService.getAdmin().pipe(map(users => {
        const user = users.find(u =>
          u.name === usuario && u.password === password
        );
        if (user) {
          this.estaLogeado = true;
          if (rememberMe) {
            localStorage.setItem('token', "token-" + `${user.name}`);
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('estaLogeado', 'true');
          } else {
            localStorage.setItem('token', "token-" + `${user.name}`);
            localStorage.removeItem('usuario');
            localStorage.setItem('rememberMe', 'false');
            localStorage.setItem('estaLogeado', 'false');
          }
        } else {
          this.estaLogeado = false;
        }
        return this.estaLogeado;
      })
      );
    }

    else {
      return this.dbService.getUsers().pipe(map(users => {
        const user = users.find(u =>
          u.name === usuario && u.password === password
        );
        if (user) {
          this.estaLogeado = true;
          if (rememberMe) {
            localStorage.setItem('token', "token-" + `${user.name}`);
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('estaLogeado', 'true');
          } else {
            localStorage.setItem('token', "token-" + `${user.name}`);
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('rememberMe', 'false');
            localStorage.setItem('estaLogeado', 'false');
          }
        } else {
          this.estaLogeado = false;
        }
        return this.estaLogeado;
      })
      );
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.setItem('rememberMe', 'false');
    localStorage.setItem('estaLogeado', 'false');
    this.estaLogeado = false;
  }

  isLoggedIn(): boolean {
    return this.estaLogeado || localStorage.getItem('estaLogeado') === 'true';
  }
}
