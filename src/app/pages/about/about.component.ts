import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-about',
  imports: [NavBarComponent, FooterComponent, UserListComponent, TranslateModule, SpinnerComponent],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
