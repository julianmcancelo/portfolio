import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';

/**
 * Directiva [appMagnetic] — efecto magnético estilo Apple/Oppo.
 * El elemento se desplaza suavemente hacia la posición del cursor cuando el mouse lo ronda.
 *
 * Uso: <button appMagnetic>Ver proyectos</button>
 * Uso con fuerza personalizada: <button [appMagnetic]="0.4">Ver proyectos</button>
 */
@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective {
  private el = inject(ElementRef);

  /** Intensidad del efecto magnético (0 = nada, 1 = máximo). Por defecto: 0.3 */
  appMagnetic = input<number>(0.3);

  private animId?: number;

  @HostListener('mousemove', ['$event'])
  onMouseMove(evento: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const distX = evento.clientX - centroX;
    const distY = evento.clientY - centroY;

    const fuerza = this.appMagnetic();
    const dx = distX * fuerza;
    const dy = distY * fuerza;

    this.aplicarTransformacion(dx, dy);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // Volver al centro con animación spring suave
    this.animarAcentro();
  }

  private aplicarTransformacion(dx: number, dy: number) {
    cancelAnimationFrame(this.animId!);
    this.el.nativeElement.style.transform = `translate(${dx}px, ${dy}px)`;
    this.el.nativeElement.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
  }

  private animarAcentro() {
    this.el.nativeElement.style.transform = 'translate(0, 0)';
    this.el.nativeElement.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  }
}
