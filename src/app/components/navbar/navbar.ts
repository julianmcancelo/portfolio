import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit {
  i18n = inject(I18nService);
  scrolled = false;
  lightBg = false;
  menuOpen = false;

  ngOnInit() { this.onScroll(); }

  @HostListener('window:scroll')
  onScroll() {
    const y = window.scrollY;
    this.scrolled = y > 60;
    const about  = document.getElementById('about');
    const skills = document.getElementById('skills');
    let inLight = false;
    [about, skills].forEach(el => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 60 && rect.bottom >= 60) inLight = true;
    });
    this.lightBg = inLight;
  }

  scrollTo(href: string) {
    this.menuOpen = false;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
