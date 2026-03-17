import { Component, OnInit, OnDestroy, inject, effect } from '@angular/core';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  displayText = '';
  private interval: any;
  private charIndex = 0;
  private roleIndex = 0;
  private deleting = false;

  constructor() {
    // Restart typewriter on language change
    effect(() => {
      this.i18n.lang();
      this.charIndex = 0;
      this.roleIndex = 0;
      this.deleting = false;
      this.displayText = '';
      clearTimeout(this.interval);
      this.typeLoop();
    });
  }

  ngOnInit() {}

  ngOnDestroy() { clearTimeout(this.interval); }

  typeLoop() {
    const roles = this.i18n.t().hero.roles;
    const current = roles[this.roleIndex];
    if (!this.deleting && this.charIndex <= current.length) {
      this.displayText = current.substring(0, this.charIndex++);
      this.interval = setTimeout(() => this.typeLoop(), 60);
    } else if (!this.deleting && this.charIndex > current.length) {
      this.interval = setTimeout(() => { this.deleting = true; this.typeLoop(); }, 2200);
    } else if (this.deleting && this.charIndex >= 0) {
      this.displayText = current.substring(0, this.charIndex--);
      this.interval = setTimeout(() => this.typeLoop(), 35);
    } else {
      this.deleting = false;
      this.roleIndex = (this.roleIndex + 1) % roles.length;
      this.charIndex = 0;
      this.interval = setTimeout(() => this.typeLoop(), 300);
    }
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
