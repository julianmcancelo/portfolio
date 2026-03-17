import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent {
  i18n = inject(I18nService);
  private observer?: IntersectionObserver;

  constructor() {
    effect(() => {
      this.i18n.lang();
      setTimeout(() => this.observeReveals(), 0);
    });
  }

  private observeReveals() {
    this.observer?.disconnect();
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('#skills .reveal').forEach(el => this.observer!.observe(el));
  }
}
