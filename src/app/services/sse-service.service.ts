import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SseModel } from '../models/sse-model';

@Injectable({
  providedIn: 'root'
})
export class SseServiceService {

  getServerEvents(): Observable<SseModel> {
  return new Observable((observer) => {
    const eventSource = new EventSource('http://localhost:3001/events');

    eventSource.onmessage = (event) => {
      observer.next(JSON.parse(event.data) as SseModel);
    };

    eventSource.addEventListener('progress', (event: MessageEvent) => {
      console.log(event);
    });

    eventSource.onerror = (error) => {
      observer.error(error);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  });
}
}
