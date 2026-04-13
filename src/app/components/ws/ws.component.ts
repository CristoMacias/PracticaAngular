import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatWebsocketService } from '../../services/ws-service.service';
import { SocketMessage } from '../../models/SocketMessage';
import { gsap } from 'gsap';

interface MensajeChat {
  texto: string;
  tipo: 'bot' | 'usuario' | 'system' | 'typing';
  autor?: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ws.component.html',
  styleUrl: './ws.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('contenedorMensajes') contenedorMensajes!: ElementRef<HTMLDivElement>;

  private chatService = inject(ChatWebsocketService);
  private sub!: Subscription;

  mensajes: MensajeChat[] = [];
  nuevoMensaje: string = '';
  estadoConexion: 'conectando' | 'conectado' | 'desconectado' = 'desconectado';

  ngOnInit(): void {
  this.estadoConexion = this.chatService.estadoConexion;

  const observable = this.chatService.connect();

  this.estadoConexion = this.chatService.estadoConexion;

  this.sub = observable.subscribe({
    next: (msg: SocketMessage) => {
      this.procesarMensajeServidor(msg);
      this.estadoConexion = this.chatService.estadoConexion;
    },
    error: (err) => {
      this.estadoConexion = 'desconectado';
      console.error('Error en WebSocket:', err);
      this.mensajes.push({
        texto: 'Se ha producido un error en la conexión.',
        tipo: 'system'
      });
    },
    complete: () => {
      this.estadoConexion = 'desconectado';
      console.log('Conexión WebSocket cerrada');
      this.mensajes.push({
        texto: 'La conexión se ha cerrado.',
        tipo: 'system'
      });
    }
  });
}

  ngAfterViewInit():void {
    gsap.to('.estado', {
      opacity: 0.5,
      repeat: -1,
      yoyo: true,
      duration:2,
      ease: 'power2.out',
    })
  }

  enviarMensaje(): void {
    const texto = this.nuevoMensaje.trim();

    if (!texto) return;

    this.mensajes.push({
      texto,
      tipo: 'usuario'
    });

    this.chatService.sendMessage(texto);
    this.nuevoMensaje = '';
  }

  private procesarMensajeServidor(msg: SocketMessage): void {
    if (msg.tipo === 'typing') {
      this.eliminarTyping();

      this.mensajes.push({
        texto: msg.mensaje,
        tipo: 'typing'
      });

      return;
    }

    if (msg.tipo === 'chat') {
      this.eliminarTyping();

      this.mensajes.push({
        texto: msg.mensaje,
        tipo: 'bot',
        autor: msg.autor
      });

      return;
    }

    if (msg.tipo === 'system' || msg.tipo === 'error') {
      this.eliminarTyping();

      this.mensajes.push({
        texto: msg.mensaje,
        tipo: 'system'
      });
    }
  }

  private eliminarTyping(): void {
    this.mensajes = this.mensajes.filter(m => m.tipo !== 'typing');
  }

  ngAfterViewChecked(): void {
    this.scrollAlFinal();
  }

  private scrollAlFinal(): void {
    if (this.contenedorMensajes) {
      const el = this.contenedorMensajes.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.chatService.closeConnection();
  }
}