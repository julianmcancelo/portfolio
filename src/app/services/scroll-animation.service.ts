import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Servicio centralizado de animaciones al hacer scroll.
 * Reemplaza los IntersectionObserver individuales en cada sección,
 * provee animaciones estilo Apple con curvas spring y stagger automático.
 */
@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
  private doc = inject(DOCUMENT);
  private observer?: IntersectionObserver;

  /** Inicializa el observer global que detecta elementos .reveal en toda la página */
  inicializar(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entrada) => {
          if (entrada.isIntersecting) {
            this.animar(entrada.target as HTMLElement);
            // Una vez visible, dejar de observar (mejor performance)
            this.observer?.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    this.observarElementos();
  }

  /** Observa todos los elementos .reveal actuales y futuros (via MutationObserver) */
  observarElementos(): void {
    // Observar elementos ya presentes en el DOM
    this.doc.querySelectorAll('.reveal').forEach((el) => {
      this.observer?.observe(el);
    });

    // Observar nuevos elementos que se agregan dinámicamente (cambio de idioma)
    const mutationObserver = new MutationObserver(() => {
      this.doc.querySelectorAll('.reveal:not([data-animado])').forEach((el) => {
        this.observer?.observe(el);
      });
    });

    mutationObserver.observe(this.doc.body, { childList: true, subtree: true });
  }

  /** Aplica la animación de entrada a un elemento */
  private animar(el: HTMLElement): void {
    el.setAttribute('data-animado', 'true');

    // Obtener tipo de animación del atributo data-animation (o usar fadeUp por defecto)
    const tipo = el.dataset['animation'] ?? 'fadeUp';

    // Aplicar clase visible con el tipo de animación
    el.classList.add('visible', `anim-${tipo}`);

    // Si tiene hijos con [data-stagger], animarlos con delay escalonado
    const hijos = el.querySelectorAll('[data-stagger]');
    hijos.forEach((hijo, i) => {
      (hijo as HTMLElement).style.transitionDelay = `${i * 60}ms`;
      (hijo as HTMLElement).classList.add('stagger-visible');
    });
  }

  /** Fuerza re-observación de todos los elementos (útil al cambiar idioma) */
  reobservar(): void {
    this.doc.querySelectorAll('.reveal').forEach((el) => {
      // Si ya estaba visible, no volver a animar
      if (!el.classList.contains('visible')) {
        this.observer?.observe(el);
      }
    });
  }
}
