import { Component } from '@angular/core';
import { SseComponentComponent } from '../../components/sse-component/sse-component.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-events',
  imports: [SseComponentComponent, NavBarComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

}
