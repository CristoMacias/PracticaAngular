import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { CardComponent } from '../../components/card/card.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { SaludoPipe } from '../../pipes/saludo.pipe';
import { DoblePipe } from '../../pipes/doble.pipe';
import { ResaltarPipe } from '../../pipes/resaltar.pipe';
import { EdadPipe } from '../../pipes/edad.pipe';

@Component({
  selector: 'app-home',
  imports: [TitleComponent, CardComponent, NavBarComponent, FooterComponent, TranslateModule, SaludoPipe, DoblePipe, ResaltarPipe, EdadPipe],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  nombre = "Cristo";
  usuario = localStorage.getItem('usuario') || '';
  visitas = 240;
  texto = "Bienvenido a nuestra página de inicio. Aquí encontrarás toda la información que necesitas sobre nuestros productos y servicios. ¡Explora y disfruta de tu visita!";
  fecha_nacimiento: Date = new Date(1996, 0, 1);
  mostrarPipes = false;
}
