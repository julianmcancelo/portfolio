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
    <!-- Scroll progress bar -->
    <div class="scroll-progress" [style.width.%]="scrollProgress()"></div>

    <app-navbar></app-navbar>

    <!-- Lang transition overlay -->
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
    .scroll-progress {
      position: fixed;
      top: 0; left: 0;
      height: 2px;
      background: linear-gradient(90deg, #0071e3, #2997ff);
      z-index: 2000;
      transition: width 0.1s linear;
      pointer-events: none;
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
  i18n = inject(I18nService);
  scrollProgress = signal(0);
  langFading = false;
  private prevLang = this.i18n.lang();

  ngOnInit() {
    // Watch lang changes and animate fade
    setInterval(() => {
      if (this.i18n.lang() !== this.prevLang) {
        this.prevLang = this.i18n.lang();
        this.langFading = true;
        setTimeout(() => this.langFading = false, 220);
      }
    }, 50);
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  }
}
