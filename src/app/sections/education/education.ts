import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class EducationComponent implements AfterViewInit {
  i18n = inject(I18nService);

  ngAfterViewInit() {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('#education .reveal').forEach(el => obs.observe(el));
  }
}
