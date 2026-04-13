import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-animation-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './controlanimation.component.html',
  styleUrls: ['./controlanimation.component.scss']
})
export class AnimationControlComponent implements AfterViewInit {

  @ViewChild('box') box!: ElementRef<HTMLDivElement>;
  @ViewChild('stage') stage!: ElementRef<HTMLDivElement>;

  timeline!: gsap.core.Timeline;
  setPosition!: (value: number) => void;
  axis: 'x' | 'y' = 'x';

  ngAfterViewInit(): void {
    const boxEl = this.box.nativeElement;
    const stageEl = this.stage.nativeElement;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      this.axis = 'x';

      const maxX = stageEl.clientWidth - boxEl.offsetWidth;

      gsap.set(boxEl, { x: 0, y: 0 });

      this.timeline = gsap.timeline({ paused: true });
      this.timeline.to(boxEl, {
        x: maxX,
        duration: 2,
        ease: 'power2.inOut'
      });

      this.setPosition = gsap.quickSetter(boxEl, 'x', 'px') as (value: number) => void;
    });

    mm.add('(max-width: 768px)', () => {
      this.axis = 'y';

      const maxY = stageEl.clientHeight - boxEl.offsetHeight;

      gsap.set(boxEl, { x: 0, y: 0 });

      this.timeline = gsap.timeline({ paused: true });
      this.timeline.to(boxEl, {
        y: maxY,
        duration: 2,
        ease: 'power2.inOut'
      });

      this.setPosition = gsap.quickSetter(boxEl, 'y', 'px') as (value: number) => void;
    });
  }

  play(): void {
    this.timeline.play();
  }

  pause(): void {
    this.timeline.pause();
  }

  reverse(): void {
    this.timeline.reverse();
  }

  moverConRaton(event: MouseEvent): void {
    const stageEl = this.stage.nativeElement;
    const boxEl = this.box.nativeElement;
    const rect = stageEl.getBoundingClientRect();

    let nuevaPos = 0;
    let max = 0;

    if (this.axis === 'x') {
      const mouseX = event.clientX - rect.left;
      nuevaPos = mouseX - boxEl.offsetWidth / 2;
      max = stageEl.clientWidth - boxEl.offsetWidth;
    } else {
      const mouseY = event.clientY - rect.top;
      nuevaPos = mouseY - boxEl.offsetHeight / 2;
      max = stageEl.clientHeight - boxEl.offsetHeight;
    }

    if (nuevaPos < 0) {
      nuevaPos = 0;
    }

    if (nuevaPos > max) {
      nuevaPos = max;
    }

    this.setPosition(nuevaPos);
  }

  resetRaton(): void {
    this.setPosition(0);
  }
}