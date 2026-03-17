import { Component, inject } from '@angular/core';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <span class="copy">{{ i18n.t().footer.copy }}</span>
      <div class="footer-links">
        <a href="https://github.com/julianmcancelo" target="_blank">GitHub</a>
        <a href="https://linkedin.com/in/juliancancelo" target="_blank">LinkedIn</a>
        <a href="assets/CV_Julian_Cancelo_EN.docx" download>CV</a>
        <button class="lang-btn" (click)="i18n.toggle()">
          {{ i18n.lang() === 'es' ? 'Switch to EN' : 'Cambiar a ES' }}
        </button>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: #000;
      border-top: 1px solid rgba(255,255,255,0.07);
      padding: 28px 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .copy {
      font-family: var(--font-mono);
      font-size: 12px;
      color: rgba(255,255,255,0.2);
      letter-spacing: 0.06em;
    }
    .footer-links {
      display: flex;
      align-items: center;
      gap: 28px;
      a {
        font-family: var(--font-mono);
        font-size: 12px;
        color: rgba(255,255,255,0.2);
        text-decoration: none;
        letter-spacing: 0.06em;
        transition: color 0.2s;
        &:hover { color: rgba(255,255,255,0.7); }
      }
    }
    .lang-btn {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.08em;
      color: rgba(255,255,255,0.2);
      background: transparent;
      border: 1px solid rgba(255,255,255,0.1);
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.3); }
    }
    @media (max-width: 768px) {
      footer { padding: 24px; flex-direction: column; gap: 16px; }
    }
  `]
})
export class FooterComponent {
  i18n = inject(I18nService);
}
