import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Servicio de seguridad — previene copia de código, inspección y uso no autorizado del sitio.
 */
@Injectable({ providedIn: 'root' })
export class SecurityService {
  private doc = inject(DOCUMENT);

  /** Inicializa todas las protecciones de seguridad */
  inicializar(): void {
    this.bloquearMenuContextual();
    this.bloquearAtajosTeclado();
    this.bloquearSeleccionTextoProtegido();
    // Nota: detección de DevTools deshabilitada para evitar falsos positivos
    // en entornos de preview y navegadores con paneles laterales abiertos.
  }

  /** Deshabilita el menú contextual (click derecho) en toda la página */
  private bloquearMenuContextual(): void {
    this.doc.addEventListener('contextmenu', (e: Event) => {
      e.preventDefault();
    });
  }

  /**
   * Bloquea atajos de teclado que permiten ver el código fuente o abrir DevTools:
   * F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
   */
  private bloquearAtajosTeclado(): void {
    this.doc.addEventListener('keydown', (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;

      // F12 → DevTools
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }

      // Ctrl+Shift+I → Herramientas de desarrollo
      if (ctrl && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        return;
      }

      // Ctrl+Shift+J → Consola de JavaScript
      if (ctrl && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return;
      }

      // Ctrl+U → Ver código fuente
      if (ctrl && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return;
      }

      // Ctrl+S → Guardar página
      if (ctrl && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return;
      }
    });
  }

  /** Aplica user-select: none en elementos marcados como protegidos */
  private bloquearSeleccionTextoProtegido(): void {
    // Los elementos con la clase 'no-select' ya están protegidos via CSS.
    // Este observer garantiza que elementos generados dinámicamente también queden protegidos.
    const observer = new MutationObserver(() => {
      this.doc.querySelectorAll('.no-select').forEach((el: Element) => {
        (el as HTMLElement).style.userSelect = 'none';
        (el as HTMLElement).style.webkitUserSelect = 'none';
      });
    });
    observer.observe(this.doc.body, { childList: true, subtree: true });
  }

  /**
   * Detecta si DevTools está abierto comparando el tamaño de la ventana con el tamaño interno.
   * Si se detecta, muestra un overlay de advertencia.
   */
  private detectarDevTools(): void {
    const UMBRAL = 200; // píxeles de diferencia que sugieren que DevTools está abierto
    let devToolsAbiertos = false;

    const verificar = () => {
      // Requiere que AMBAS dimensiones superen el umbral para evitar falsos positivos
      const diff =
        window.outerWidth - window.innerWidth > UMBRAL &&
        window.outerHeight - window.innerHeight > UMBRAL;

      if (diff && !devToolsAbiertos) {
        devToolsAbiertos = true;
        this.mostrarOverlayDevTools();
      } else if (!diff && devToolsAbiertos) {
        devToolsAbiertos = false;
        this.ocultarOverlayDevTools();
      }
    };

    setInterval(verificar, 1000);
  }

  /** Muestra un overlay cuando se detectan DevTools abiertos */
  private mostrarOverlayDevTools(): void {
    if (this.doc.getElementById('devtools-overlay')) return;

    const overlay = this.doc.createElement('div');
    overlay.id = 'devtools-overlay';
    overlay.innerHTML = `
      <div class="devtools-content">
        <p class="devtools-icon">⚠</p>
        <p class="devtools-titulo">Acceso restringido</p>
        <p class="devtools-msg">Este sitio está protegido. La inspección de código no está permitida.</p>
      </div>
    `;

    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(0,0,0,0.96)',
      zIndex: '99999',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#fff',
      fontFamily: 'var(--font-display, sans-serif)',
      backdropFilter: 'blur(20px)',
    });

    const style = this.doc.createElement('style');
    style.textContent = `
      #devtools-overlay .devtools-content { max-width: 380px; padding: 40px; }
      #devtools-overlay .devtools-icon { font-size: 48px; margin-bottom: 24px; }
      #devtools-overlay .devtools-titulo { font-size: 24px; font-weight: 600; margin-bottom: 12px; letter-spacing: -0.03em; }
      #devtools-overlay .devtools-msg { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.6; }
    `;

    this.doc.head.appendChild(style);
    this.doc.body.appendChild(overlay);
  }

  /** Oculta el overlay de DevTools */
  private ocultarOverlayDevTools(): void {
    this.doc.getElementById('devtools-overlay')?.remove();
  }
}
