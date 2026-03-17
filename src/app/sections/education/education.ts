import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class EducationComponent {
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
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('#education .reveal').forEach(el => this.observer!.observe(el));
  }
}
