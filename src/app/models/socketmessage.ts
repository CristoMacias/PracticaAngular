export interface SocketMessage {
    tipo: 'system' | 'typing' | 'chat' |'error';
    mensaje: string;
    autor?: string;
}