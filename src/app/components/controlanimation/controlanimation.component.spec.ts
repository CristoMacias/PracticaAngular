import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationControlComponent } from './controlanimation.component';

describe('AnimationControlComponent', () => {
  let component: AnimationControlComponent;
  let fixture: ComponentFixture<AnimationControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationControlComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
