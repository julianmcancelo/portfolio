import { Component, OnDestroy, inject, effect } from '@angular/core';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnDestroy {
  i18n = inject(I18nService);
  displayText = '';
  private timeout: any;
  private charIndex = 0;
  private roleIndex = 0;
  private deleting = false;
  private generation = 0; // prevents stale loops from running

  constructor() {
    effect(() => {
      this.i18n.lang(); // track signal
      // Reset state for new language
      clearTimeout(this.timeout);
      this.charIndex = 0;
      this.roleIndex = 0;
      this.deleting = false;
      this.displayText = '';
      this.generation++;
      this.typeLoop(this.generation);
    });
  }

  ngOnDestroy() { clearTimeout(this.timeout); }

  private typeLoop(gen: number) {
    // Stop if a newer loop was started
    if (gen !== this.generation) return;

    const roles = this.i18n.t().hero.roles;
    const current = roles[this.roleIndex];

    if (!this.deleting && this.charIndex <= current.length) {
      this.displayText = current.substring(0, this.charIndex++);
      this.timeout = setTimeout(() => this.typeLoop(gen), 60);
    } else if (!this.deleting && this.charIndex > current.length) {
      this.timeout = setTimeout(() => { this.deleting = true; this.typeLoop(gen); }, 2200);
    } else if (this.deleting && this.charIndex >= 0) {
      this.displayText = current.substring(0, this.charIndex--);
      this.timeout = setTimeout(() => this.typeLoop(gen), 35);
    } else {
      this.deleting = false;
      this.roleIndex = (this.roleIndex + 1) % roles.length;
      this.charIndex = 0;
      this.timeout = setTimeout(() => this.typeLoop(gen), 300);
    }
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
