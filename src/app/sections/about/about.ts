import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent implements AfterViewInit {
  i18n = inject(I18nService);

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('#about .reveal').forEach(el => observer.observe(el));
  }
}
