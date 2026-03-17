import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  i18n  = inject(I18nService);
  http  = inject(HttpClient);
  private observer?: IntersectionObserver;

  form    = { name: '', email: '', message: '' };
  status: 'idle' | 'sending' | 'sent' | 'error' = 'idle';

  private FORMSPREE = 'https://formspree.io/f/mqeygpoy';

  links = [
    { icon: '@',  label: 'julianmcancelo@gmail.com',     href: 'mailto:julianmcancelo@gmail.com' },
    { icon: 'in', label: 'linkedin.com/in/juliancancelo', href: 'https://linkedin.com/in/juliancancelo' },
    { icon: 'gh', label: 'github.com/julianmcancelo',     href: 'https://github.com/julianmcancelo' },
    { icon: '↗',  label: 'juliancancelo.com.ar',          href: 'https://juliancancelo.com.ar' },
  ];

  constructor() {
    effect(() => {
      this.i18n.lang();
      setTimeout(() => this.observeReveals(), 0);
    });
  }

  send() {
    if (this.status === 'sending') return;
    this.status = 'sending';

    this.http.post(this.FORMSPREE, this.form, {
      headers: { Accept: 'application/json' }
    }).subscribe({
      next: () => {
        this.status = 'sent';
        this.form = { name: '', email: '', message: '' };
        setTimeout(() => this.status = 'idle', 4000);
      },
      error: () => {
        this.status = 'error';
        setTimeout(() => this.status = 'idle', 4000);
      }
    });
  }

  get btnLabel() {
    const t = this.i18n.t().contact;
    if (this.status === 'sending') return t.sending;
    if (this.status === 'sent')    return t.sent;
    return t.send;
  }

  private observeReveals() {
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('#contact .reveal').forEach(el => this.observer!.observe(el));
  }
}
