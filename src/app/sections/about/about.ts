import { Component, inject, effect, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  i18n = inject(I18nService);
  private observer?: IntersectionObserver;

  constructor() {
    effect(() => {
      this.i18n.lang(); // track signal
      // Wait for DOM to update after lang change
      setTimeout(() => this.observeReveals(), 0);
    });
  }

  private observeReveals() {
    this.observer?.disconnect();
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('#about .reveal').forEach(el => this.observer!.observe(el));
  }
}
