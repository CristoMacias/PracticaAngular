import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact',
  imports: [NavBarComponent, FooterComponent, ReactiveFormsModule, MatInputModule, MatButtonModule, TranslateModule],
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  mensaje = ""
  tl = gsap.timeline();

  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  enviar(){
    if(this.formulario.valid){
        this.mensaje = "MESSAGEACCEPT";
    }
    else{
      this.mensaje = "MESSAGEERROR";
      this.formulario.markAllAsTouched();
    }
  }

  ngAfterViewInit(){
    this.tl.from('.contact-header', {opacity: 0, y: -50, duration: 0.5, ease: 'power2.out'})
      .from('.contact-form', {opacity: 0, x: 100, duration: 0.5, ease: 'power2.out'},)
      .from('.button-row', {opacity: 0, y: 20, duration: 0.5, ease: 'power2.out'});
  }

}
