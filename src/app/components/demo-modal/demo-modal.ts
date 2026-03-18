import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  inject,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export type DemoTipo = 'web' | 'mobile' | 'video';

export interface DemoConfig {
  tipo: DemoTipo;
  url?: string;        // para tipo 'web' (iframe)
  youtubeId?: string;  // para tipo 'mobile' o 'video'
  nombre: string;
}

@Component({
  selector: 'app-demo-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-modal.html',
  styleUrl: './demo-modal.scss',
})
export class DemoModalComponent {
  private doc       = inject(DOCUMENT);
  private sanitizer = inject(DomSanitizer);

  /** Configuración de la demo a mostrar (null = modal cerrado) */
  config = input<DemoConfig | null>(null);

  /** Emite cuando el usuario cierra el modal */
  cerrar = output<void>();

  /** Controla la animación de entrada/salida */
  visible = signal(false);

  /** URL segura del iframe de YouTube con autoplay, loop y branding mínimo */
  youtubeUrl = computed<SafeResourceUrl | null>(() => {
    const id = this.config()?.youtubeId;
    if (!id) return null;
    const url = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1&modestbranding=1&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  /** URL segura del iframe para demos web */
  webUrl = computed<SafeResourceUrl | null>(() => {
    const url = this.config()?.url;
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  constructor() {
    // Reaccionar a cambios del input usando effect() (API signals de Angular 17+)
    effect(() => {
      const cfg = this.config();
      if (cfg) {
        // Delay mínimo para que el CSS de entrada se dispare correctamente
        setTimeout(() => this.visible.set(true), 10);
        this.doc.body.style.overflow = 'hidden';
      } else {
        this.visible.set(false);
        this.doc.body.style.overflow = '';
      }
    });
  }

  /** Cierra con animación de salida */
  onCerrar(): void {
    this.visible.set(false);
    this.doc.body.style.overflow = '';
    // Esperar a que termine la animación antes de emitir
    setTimeout(() => this.cerrar.emit(), 350);
  }

  /** Cierra al hacer clic en el overlay (fuera del mockup) */
  onOverlayClick(evento: MouseEvent): void {
    if ((evento.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onCerrar();
    }
  }
}
