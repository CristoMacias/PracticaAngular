import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AnimationControlComponent } from '../../components/controlanimation/controlanimation.component';

import { DbService } from '../../services/db.service';
import { Producto } from '../../models/producto';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NavBarComponent,
    CommonModule,
    SpinnerComponent,
    FooterComponent,
    AnimationControlComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollBox') scrollBox!: ElementRef<HTMLDivElement>;

  nombre = '';
  claveSecreta = '';
  productos: Observable<Producto[]> = new Observable();
  horaActual: Date = new Date();
  objetivoProductos = 20;
  productosActuales$ = new Observable<number>();
  progreso$ = new Observable<number>();
  productoAbierto: number | null = null;
  private timerId: ReturnType<typeof setInterval> | null = null;

  dbService = inject(DbService);

  ngOnInit(): void {
    this.nombre = localStorage.getItem('usuario') || '';
    this.productos = this.dbService.getProductos();
    this.productosActuales$ = this.productos.pipe(
      map(productos => productos.length)
    );

    this.horaActual = new Date();
    this.timerId = setInterval(() => {
      this.horaActual = new Date();
    }, 1000);

    this.progreso$ = this.productosActuales$.pipe(
      map(actuales => this.objetivoProductos > 0 ? actuales / this.objetivoProductos : 0)
    );

    this.claveSecreta = 'abcdefghijklm1234567890';
  }

  ngAfterViewInit(): void {
    const tl = gsap.timeline();

    tl.from('.admin-header', {
      opacity: 0,
      x: 100,
      duration: 1,
      ease: 'power2.out'
    })
    .from('.info-card', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2
    })
    .from('.productos-grid', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from(this.scrollBox.nativeElement, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.scrollBox.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
        markers: false
      }
    });
  }

  marcarProducto(id: number): void {
    this.productoAbierto = this.productoAbierto === id ? null : id;
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}