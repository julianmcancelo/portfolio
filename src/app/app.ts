import { Component, HostListener, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent }    from './components/navbar/navbar';
import { FooterComponent }    from './components/footer/footer';
import { HeroComponent }      from './sections/hero/hero';
import { AboutComponent }     from './sections/about/about';
import { ProjectsComponent }  from './sections/projects/projects';
import { SkillsComponent }    from './sections/skills/skills';
import { EducationComponent } from './sections/education/education';
import { ContactComponent }   from './sections/contact/contact';
import { I18nService }        from './i18n.service';
import { SecurityService }    from './services/security.service';
import { ScrollAnimationService } from './services/scroll-animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent, FooterComponent,
    HeroComponent, AboutComponent,
    ProjectsComponent, SkillsComponent,
    EducationComponent, ContactComponent,
  ],
  template: `
    <!-- Barra de progreso con gradiente aurora animado -->
    <div
      class="scroll-progress"
      [style.width.%]="scrollProgress()"
      [class.oculta]="scrollProgress() === 0"
    ></div>

    <app-navbar></app-navbar>

    <!-- Overlay de transición de idioma -->
    <div class="lang-fade" [class.active]="langFading"></div>

    <main [class.fading]="langFading">
      <app-hero></app-hero>
      <app-about></app-about>
      <app-projects></app-projects>
      <app-skills></app-skills>
      <app-education></app-education>
      <app-contact></app-contact>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    /* Barra de progreso con degradado aurora */
    .scroll-progress {
      position: fixed;
      top: 0; left: 0;
      height: 2px;
      background: linear-gradient(
        90deg,
        #0071e3,
        #2997ff,
        #9333ea,
        #ec4899,
        #2997ff
      );
      background-size: 200% 100%;
      animation: aurora-barra 3s linear infinite;
      z-index: 2000;
      transition: width 0.1s linear;
      pointer-events: none;

      /* Glow debajo de la barra */
      &::after {
        content: '';
        position: absolute;
        bottom: -2px; left: 0; right: 0;
        height: 4px;
        background: inherit;
        filter: blur(4px);
        opacity: 0.6;
      }
    }

    .scroll-progress.oculta {
      opacity: 0;
    }

    @keyframes aurora-barra {
      0%   { background-position: 0% 0; }
      100% { background-position: 200% 0; }
    }

    main {
      display: block;
      transition: opacity 0.18s ease;
    }

    main.fading { opacity: 0; }

    .lang-fade {
      position: fixed;
      inset: 0;
      background: #000;
      opacity: 0;
      pointer-events: none;
      z-index: 500;
      transition: opacity 0.18s ease;
    }

    .lang-fade.active { opacity: 0.15; }
  `]
})
export class AppComponent implements OnInit {
  private i18n     = inject(I18nService);
  private seguridad   = inject(SecurityService);
  private scrollAnim  = inject(ScrollAnimationService);

  scrollProgress = signal(0);
  langFading = false;
  private prevLang = this.i18n.lang();

  ngOnInit(): void {
    // Inicializar protecciones de seguridad
    this.seguridad.inicializar();

    // Inicializar servicio de animaciones de scroll
    this.scrollAnim.inicializar();

    // Observar cambios de idioma y animar transición
    setInterval(() => {
      if (this.i18n.lang() !== this.prevLang) {
        this.prevLang = this.i18n.lang();
        this.langFading = true;
        setTimeout(() => {
          this.langFading = false;
          // Re-observar elementos tras cambio de idioma
          this.scrollAnim.reobservar();
        }, 220);
      }
    }, 50);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  }
}
