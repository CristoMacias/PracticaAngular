import { AfterViewInit, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SessionService } from '../../services/session.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NavBarComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {

  private sessionService = inject(SessionService);
  private router = inject(Router);

  usuario: string = '';
  password: string = '';
  rememberMe: boolean = false;
  estaLogeado: boolean = false;

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario') || '';
    this.rememberMe = localStorage.getItem('rememberMe') === 'true';
    this.sessionService.estaLogeado = localStorage.getItem('estaLogeado') === 'true';
  }

  login() {
    this.sessionService.login(this.usuario, this.password, this.rememberMe).subscribe(ok => {
      if (ok) {
        this.animarLogin();
      } else {
        this.estaLogeado = false;
        alert('Usuario o contraseña incorrectos');
      }
    });
  }

  ngAfterViewInit(): void {
    const tl = gsap.timeline();

    tl.addLabel('inicio')
      .from('.login-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        onStart: () => {console.log('Animación de login iniciada');},
        onUpdate: () => {console.log('Animación de login en progreso');}
      }, 'inicio')

      .addLabel('titulo')
      .from('.login-title-block', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => {console.log('Animación de login en progreso');}
      }, 'titulo')

      .addLabel('campos')
      .from('.login-field', {
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power2.out',
        onUpdate: () => {console.log('Animación de login en progreso');}
      }, 'campos')

      .addLabel('boton')
      .from('.login-button-wrap', {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'back.out(1.7)',
        onUpdate: () => {console.log('Animación de login en progreso');}
      }, 'boton')
      .addLabel('crearCuenta')
      .from('.crear-cuenta', {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'back.out(1.7)',
        onComplete: () => {console.log('Animación de login completada');}
      }, 'crearCuenta');
  }

  animarLogin(): void {
  const tl = gsap.timeline({
    onComplete: () => {
      this.estaLogeado = true;
      this.router.navigate(['/']); // 👈 AQUÍ, cuando termina la animación
    }
  });

  tl.to('.login-card', {
    scale: 0.9,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in'
  });

  tl.to('.login-page', {
    opacity: 0,
    duration: 0.3
  });
}

  cerrarSesion() {
    this.sessionService.cerrarSesion();
    this.router.navigate(['/']);
  }
}