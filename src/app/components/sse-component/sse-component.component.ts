import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { SseServiceService } from "../../services/sse-service.service";
import { CommonModule } from '@angular/common';
import { SseModel } from '../../models/sse-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sse-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './sse-component.component.html',
  styleUrl: './sse-component.component.scss'
})
export class SseComponentComponent {

  progreso: number = 0;
  mensaje: string = '';
  acceder: boolean = false;

  eventos: WritableSignal<SseModel[]> = signal([])

  private sseService = inject(SseServiceService);
  private subscription?: Subscription;


  ngOnInit() {
    this.subscription = this.sseService.getServerEvents().subscribe({
      next: (data: SseModel) => {
        this.progreso = data.progreso;
        this.mensaje = data.mensaje;

        this.eventos.update((eventosActuales) => [...eventosActuales, {
          progreso: this.progreso,
          mensaje: this.mensaje
        }
        ]);

        console.log('Evento recibido:', data);
      },
      error: (err) => {
        console.error('Error en la conexión SSE:', err);
      }
    });
  }

  accederChatBot(){
    this.acceder = true;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
