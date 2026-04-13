import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterOutlet, RouterLink, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  private translate = inject(TranslateService);
  private sessionService = inject(SessionService);
  private router = inject(Router);

  idioma: string = 'es';

  ngOnInit() {
    const idiomaGuardado = localStorage.getItem('lang');

    if(idiomaGuardado){
      this.idioma = idiomaGuardado;
    }

    this.translate.use(this.idioma);
  }

  cambiarIdioma(event: Event){
    const valor = (event.target as HTMLSelectElement).value;
    this.idioma = valor;
    this.translate.use(valor);

    localStorage.setItem('lang', valor);
  }

  ngAfterViewInit(){
    gsap.to('.login-box', {
      opacity: 0.7,
      repeat: -1,
      yoyo: true,
      duration:0.5,
      ease: 'power2.out',
    })

  }

  get estaLogeado(): boolean {
    return this.sessionService.estaLogeado;
  }

  cerrarSesion(){
    this.sessionService.cerrarSesion();
    this.router.navigate(['/']);
  }

}
