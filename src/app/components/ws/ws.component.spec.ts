/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ChatComponent } from './ws.component';
import { ChatWebsocketService } from '../../services/ws-service.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatServiceMock: jasmine.SpyObj<ChatWebsocketService>;

  beforeEach(() => {
    chatServiceMock = jasmine.createSpyObj<ChatWebsocketService>(
      'ChatWebsocketService',
      ['connect', 'sendMessage', 'closeConnection'],
      { estadoConexion: 'desconectado' }
    );

    chatServiceMock.connect.and.returnValue(of());
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComponent],
      providers: [
        { provide: ChatWebsocketService, useValue: chatServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
