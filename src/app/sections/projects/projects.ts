import { Component, inject, effect, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  i18n = inject(I18nService);
  private elRef = inject(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    effect(() => {
      this.i18n.lang();
      setTimeout(() => this.observeReveals(), 0);
    });
  }

  ngAfterViewInit(): void {
    this.activarTilt();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private observeReveals(): void {
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll('#projects .reveal')
      .forEach((el) => this.observer!.observe(el));
  }

  /** Efecto 3D tilt al mover el mouse sobre cada fila de proyecto */
  private activarTilt(): void {
    const filas = this.elRef.nativeElement.querySelectorAll('.project-row');

    filas.forEach((fila: HTMLElement) => {
      fila.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = fila.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centroX = rect.width / 2;
        const centroY = rect.height / 2;

        const rotateX = ((y - centroY) / centroY) * -4; // máx 4°
        const rotateY = ((x - centroX) / centroX) * 4;  // máx 4°

        fila.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        fila.style.transition = 'transform 0.1s ease';
      });

      fila.addEventListener('mouseleave', () => {
        fila.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        fila.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }
}
