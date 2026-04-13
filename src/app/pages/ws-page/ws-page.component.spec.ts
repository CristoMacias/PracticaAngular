import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { WsPageComponent } from './ws-page.component';

describe('WsPageComponent', () => {
  let component: WsPageComponent;
  let fixture: ComponentFixture<WsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WsPageComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
