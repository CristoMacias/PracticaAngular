import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { SocketMessage } from '../models/SocketMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatWebsocketService {

  private socket$: WebSocketSubject<SocketMessage> | null = null;
  estadoConexion: 'conectado' | 'conectando' | 'desconectado' = 'desconectado';

  connect(): Observable<SocketMessage> {
    if (!this.socket$ || this.socket$.closed) {
      this.estadoConexion = 'conectando';
      this.socket$ = webSocket<SocketMessage>({
        url: 'ws://localhost:3002',

        deserializer: ({ data }) => JSON.parse(data),

        serializer: (value) => JSON.stringify(value),

        openObserver: {
          next: () => {
            console.log('Conexión WebSocket abierta');
            this.estadoConexion = 'conectado';
          }
        },

        closeObserver: {
          next: () => {
            console.log('Conexión WebSocket cerrada');
            this.estadoConexion = 'desconectado';
          }
        }
      });
    }

    return this.socket$.asObservable();
  }

  sendMessage(mensaje: string): void {
    if (!this.socket$ || this.socket$.closed) {
      console.error('No hay conexión WebSocket activa');
      return;
    }

    this.socket$.next({
      tipo: 'chat',
      mensaje: mensaje
    });
  }

  closeConnection(): void {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.complete();
      this.socket$ = null;
    }

    this.estadoConexion = 'desconectado';
  }
}