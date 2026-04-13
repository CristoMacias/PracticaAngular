import { Component } from '@angular/core';
import { ChatComponent } from '../../components/ws/ws.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-ws-page',
  imports: [ChatComponent, NavBarComponent],
  standalone: true,
  templateUrl: './ws-page.component.html',
  styleUrl: './ws-page.component.scss'
})
export class WsPageComponent {

}
