import {
  Component,
  OnDestroy,
  OnInit,
  HostListener,
  ElementRef,
  NgZone,
  inject,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../i18n.service';
import { MagneticDirective } from '../../directives/magnetic.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MagneticDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  private el   = inject(ElementRef);
  private zone = inject(NgZone);

  // Texto del typewriter como signal para evitar NG0100
  displayText = signal('');

  // Letras del nombre animadas individualmente
  nombreLetras = signal<{ char: string; visible: boolean }[]>([]);

  // Posición del orbe cursor
  orbeX = signal(0);
  orbeY = signal(0);

  // Parallax del fondo
  parallaxY = signal(0);

  private timeout: any;
  private charIndex = 0;
  private roleIndex = 0;
  private deleting = false;
  private generation = 0;
  private animFrameId?: number;

  constructor() {
    effect(() => {
      this.i18n.lang(); // rastrear señal de idioma
      // Reiniciar typewriter al cambiar idioma
      clearTimeout(this.timeout);
      this.charIndex = 0;
      this.roleIndex = 0;
      this.deleting = false;
      this.displayText.set('');
      this.generation++;
      this.typeLoop(this.generation);
    });
  }

  ngOnInit(): void {
    // Animar letras del nombre una por una con delay de 80ms entre cada una
    const nombre = 'Julian Cancelo.';
    const letras = nombre.split('').map((char) => ({ char, visible: false }));
    this.nombreLetras.set(letras);

    letras.forEach((_, i) => {
      setTimeout(() => {
        const actuales = [...this.nombreLetras()];
        actuales[i].visible = true;
        this.nombreLetras.set([...actuales]);
      }, 300 + i * 80);
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
    cancelAnimationFrame(this.animFrameId!);
  }

  /** Mueve el orbe de luz hacia la posición del cursor */
  @HostListener('mousemove', ['$event'])
  onMouseMove(evento: MouseEvent): void {
    this.orbeX.set(evento.clientX);
    this.orbeY.set(evento.clientY);
  }

  /** Parallax al hacer scroll */
  @HostListener('window:scroll')
  onScroll(): void {
    const scrollY = window.scrollY;
    this.parallaxY.set(scrollY * 0.3);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  private typeLoop(gen: number): void {
    if (gen !== this.generation) return;

    const roles = this.i18n.t().hero.roles;
    const current = roles[this.roleIndex];

    // Ejecutar los setTimeout FUERA de la zona de Angular para evitar NG0100
    // y solo actualizar el signal (que re-entra a la zona) cuando cambia el texto
    if (!this.deleting && this.charIndex <= current.length) {
      this.zone.run(() => this.displayText.set(current.substring(0, this.charIndex++)));
      this.zone.runOutsideAngular(() => {
        this.timeout = setTimeout(() => this.typeLoop(gen), 60);
      });
    } else if (!this.deleting && this.charIndex > current.length) {
      this.zone.runOutsideAngular(() => {
        this.timeout = setTimeout(() => { this.deleting = true; this.typeLoop(gen); }, 2200);
      });
    } else if (this.deleting && this.charIndex >= 0) {
      this.zone.run(() => this.displayText.set(current.substring(0, this.charIndex--)));
      this.zone.runOutsideAngular(() => {
        this.timeout = setTimeout(() => this.typeLoop(gen), 35);
      });
    } else {
      this.deleting = false;
      this.roleIndex = (this.roleIndex + 1) % roles.length;
      this.charIndex = 0;
      this.zone.runOutsideAngular(() => {
        this.timeout = setTimeout(() => this.typeLoop(gen), 300);
      });
    }
  }
}
