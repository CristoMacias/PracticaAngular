import { TestBed } from '@angular/core/testing';

import { ChatWebsocketService } from './ws-service.service';

describe('ChatWebsocketService', () => {
  let service: ChatWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
