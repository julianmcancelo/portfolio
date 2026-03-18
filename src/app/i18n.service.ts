import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'es';

const translations = {
  en: {
    nav: {
      about: 'About', projects: 'Projects', skills: 'Skills',
      education: 'Education', contact: 'Contact', downloadCv: 'Download CV',
    },
    hero: {
      location: 'Buenos Aires, Argentina',
      roles: ['Full Stack Developer', 'Mobile Engineer', 'SaaS Builder', 'Systems Analyst'],
      desc: 'Building real products — mobile apps, SaaS platforms\nand web systems that work.',
      cta: 'See my work', ctaContact: 'Get in touch',
    },
    about: {
      eyebrow: 'About me',
      headline1: 'Developer by passion.',
      headline2: 'Student by day.',
      p1: `I'm <strong>Julian Cancelo</strong>, a Full Stack Developer based in Buenos Aires. I build across the full stack — Flutter mobile apps, Angular and Svelte web platforms, PHP backends — always focused on clean code and real usability.`,
      p2: `I'm currently pursuing two degrees simultaneously: <strong>Systems Analysis</strong> at Instituto Tecnológico Beltrán and a <strong>Bachelor's in Cyber Defense</strong> at UNDEF — FADENA. That gives me a perspective on both building and securing systems.`,
      p3: `Looking for my first formal role. I bring real projects, a self-taught mindset, and the drive to keep growing fast in a professional environment.`,
      downloadEn: '↓ Download CV (EN)', downloadEs: '↓ Descargar CV (ES)',
      stats: [
        { number: '4',  label: 'Personal projects built' },
        { number: '2',  label: 'Degrees in progress' },
        { number: '3+', label: 'Years building software' },
      ],
    },
    projects: {
      eyebrow: 'Projects', headline: "What I've built.",
      privateLabel: 'Private repo',
      viewRepo: 'View repo', viewDemo: 'Live demo', verDemo: 'Live demo',
      items: [
        {
          name: 'Bitácora Docente', status: 'In development', statusClass: 'dev',
          year: '2026', index: '01',
          desc: 'Cross-platform app for teachers. Centralizes attendance, grades, activities and calendar with real-time sync across Android, iOS and web.',
          stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Web Panel'],
          repo: null, demo: null,
          demoType: 'mobile' as const, youtubeId: '',
        },
        {
          name: 'Stock AR', status: 'Closed beta', statusClass: 'dev',
          year: '2026', index: '02',
          desc: 'Inventory control app with integrated barcode scanner. Built for small businesses to digitize stock management — no server needed.',
          stack: ['Flutter', 'Dart', 'Google Sheets API', 'ZXing'],
          repo: null, demo: null,
          demoType: 'mobile' as const, youtubeId: '',
        },
        {
          name: 'Cartita Digital', status: 'Closed beta', statusClass: 'dev',
          year: '2025', index: '03',
          desc: 'SaaS platform for bars and restaurants. Multi-tenant architecture with real-time configurable digital menus per business.',
          stack: ['Svelte', 'SvelteKit', 'JavaScript', 'Tailwind CSS'],
          repo: null, demo: 'https://cartita.digital',
          demoType: 'web' as const, youtubeId: '',
        },
        {
          name: 'E-Commerce + Virtual Card', status: 'Completed', statusClass: 'done',
          year: '2024', index: '04',
          desc: 'Full e-commerce platform with virtual card balance system, shopping cart, admin panel and complete product CRUD.',
          stack: ['Angular', 'TypeScript', 'PHP', 'MySQL', 'Tailwind CSS'],
          repo: null, demo: null,
          demoType: 'video' as const, youtubeId: '',
        },
      ],
    },
    skills: {
      eyebrow: 'Skills', headline: 'What I work with.',
      groups: [
        { label: 'Mobile',      items: ['Flutter', 'Dart'] },
        { label: 'Frontend',    items: ['Angular', 'Svelte', 'SvelteKit', 'HTML5', 'CSS3', 'Tailwind', 'Bootstrap'] },
        { label: 'Backend',     items: ['PHP', 'Laravel'] },
        { label: 'Languages',   items: ['JavaScript', 'TypeScript', 'Dart', 'PHP'] },
        { label: 'Databases',   items: ['MySQL', 'Firebase Firestore', 'SQLite', 'Google Sheets'] },
        { label: 'Tools',       items: ['Git', 'GitHub', 'Firebase', 'Figma', 'Postman', 'VS Code'] },
        { label: 'APIs & Libs', items: ['REST', 'JWT', 'Google Maps API', 'PHPMailer', 'DOMPDF', 'ZXing'] },
        { label: 'Methods',     items: ['MVC', 'Clean Code', 'Scrum', 'Reactive Programming'] },
      ],
    },
    education: {
      eyebrow: 'Education', headline: 'Where I study.',
      items: [
        {
          degree: "Bachelor's in Cyber Defense",
          school: 'Universidad de la Defensa Nacional (UNDEF) — FADENA',
          period: '2026 — Present', mode: 'Online',
          desc: 'University-level program focused on cybersecurity, digital defense strategies, network security and information systems protection.',
        },
        {
          degree: 'Higher Technical Degree in Systems Analysis',
          school: 'Instituto Tecnológico Beltrán · Avellaneda, Buenos Aires',
          period: '2023 — Present', mode: 'In-person',
          desc: 'Training in software architecture, databases, object-oriented programming, agile methodologies and systems design.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact', headline1: "Let's work", headline2: 'together',
      sub: 'Open to junior positions, freelance projects and any opportunity to collaborate.',
      labelName: 'Name', labelEmail: 'Email', labelMessage: 'Message',
      placeholderName: 'Your name', placeholderEmail: 'your@email.com',
      placeholderMessage: 'Tell me about your project or opportunity...',
      send: 'Send message →', sent: 'Message sent ✓', sending: 'Sending...',
      errorMsg: 'Something went wrong. Try emailing me directly.',
    },
    footer: { copy: '© 2026 Julian Cancelo' },
  },

  es: {
    nav: {
      about: 'Sobre mí', projects: 'Proyectos', skills: 'Habilidades',
      education: 'Educación', contact: 'Contacto', downloadCv: 'Descargar CV',
    },
    hero: {
      location: 'Buenos Aires, Argentina',
      roles: ['Desarrollador Full Stack', 'Ingeniero Mobile', 'Creador de SaaS', 'Analista de Sistemas'],
      desc: 'Construyo productos reales — apps móviles, plataformas SaaS\ny sistemas web que funcionan.',
      cta: 'Ver proyectos', ctaContact: 'Contactarme',
    },
    about: {
      eyebrow: 'Sobre mí',
      headline1: 'Desarrollador por pasión.',
      headline2: 'Estudiante de día.',
      p1: `Soy <strong>Julian Cancelo</strong>, Desarrollador Full Stack radicado en Buenos Aires. Construyo en todo el stack — apps móviles con Flutter, plataformas web con Angular y Svelte, backends en PHP — siempre con foco en código limpio y usabilidad real.`,
      p2: `Actualmente curso dos carreras en paralelo: <strong>Análisis de Sistemas</strong> en el Instituto Tecnológico Beltrán y la <strong>Licenciatura en Ciberdefensa</strong> en UNDEF — FADENA. Esa combinación me da perspectiva tanto en desarrollo como en seguridad de sistemas.`,
      p3: `Busco mi primera experiencia laboral formal. Traigo proyectos reales, mentalidad autodidacta y muchas ganas de crecer rápido en un entorno profesional.`,
      downloadEn: '↓ Download CV (EN)', downloadEs: '↓ Descargar CV (ES)',
      stats: [
        { number: '4',  label: 'Proyectos personales construidos' },
        { number: '2',  label: 'Carreras en curso' },
        { number: '3+', label: 'Años construyendo software' },
      ],
    },
    projects: {
      eyebrow: 'Proyectos', headline: 'Lo que construí.',
      privateLabel: 'Repo privado',
      viewRepo: 'Ver repo', viewDemo: 'Ver demo', verDemo: 'Ver demo',
      items: [
        {
          name: 'Bitácora Docente', status: 'En desarrollo', statusClass: 'dev',
          year: '2026', index: '01',
          desc: 'App multiplataforma para docentes. Centraliza asistencia, calificaciones, actividades y agenda con sincronización en tiempo real en Android, iOS y web.',
          stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Panel Web'],
          repo: null, demo: null,
          demoType: 'mobile' as const, youtubeId: '',
        },
        {
          name: 'Stock AR', status: 'Beta cerrada', statusClass: 'dev',
          year: '2026', index: '02',
          desc: 'App móvil de control de inventario con lector de código de barras. Para negocios que quieren digitalizar su stock sin infraestructura de servidor.',
          stack: ['Flutter', 'Dart', 'Google Sheets API', 'ZXing'],
          repo: null, demo: null,
          demoType: 'mobile' as const, youtubeId: '',
        },
        {
          name: 'Cartita Digital', status: 'Beta cerrada', statusClass: 'dev',
          year: '2025', index: '03',
          desc: 'Plataforma SaaS para bares y restaurantes. Arquitectura multitenancy con cartas de menú digitales configurables en tiempo real por negocio.',
          stack: ['Svelte', 'SvelteKit', 'JavaScript', 'Tailwind CSS'],
          repo: null, demo: 'https://cartita.digital',
          demoType: 'web' as const, youtubeId: '',
        },
        {
          name: 'E-Commerce + Tarjeta Virtual', status: 'Completado', statusClass: 'done',
          year: '2024', index: '04',
          desc: 'Plataforma de e-commerce con sistema de tarjeta virtual, carrito de compras, panel de administración y CRUD completo de productos.',
          stack: ['Angular', 'TypeScript', 'PHP', 'MySQL', 'Tailwind CSS'],
          repo: null, demo: null,
          demoType: 'video' as const, youtubeId: '',
        },
      ],
    },
    skills: {
      eyebrow: 'Habilidades', headline: 'Con qué trabajo.',
      groups: [
        { label: 'Mobile',         items: ['Flutter', 'Dart'] },
        { label: 'Frontend',       items: ['Angular', 'Svelte', 'SvelteKit', 'HTML5', 'CSS3', 'Tailwind', 'Bootstrap'] },
        { label: 'Backend',        items: ['PHP', 'Laravel'] },
        { label: 'Lenguajes',      items: ['JavaScript', 'TypeScript', 'Dart', 'PHP'] },
        { label: 'Bases de datos', items: ['MySQL', 'Firebase Firestore', 'SQLite', 'Google Sheets'] },
        { label: 'Herramientas',   items: ['Git', 'GitHub', 'Firebase', 'Figma', 'Postman', 'VS Code'] },
        { label: 'APIs y Libs',    items: ['REST', 'JWT', 'Google Maps API', 'PHPMailer', 'DOMPDF', 'ZXing'] },
        { label: 'Metodologías',   items: ['MVC', 'Clean Code', 'Scrum', 'Prog. Reactiva'] },
      ],
    },
    education: {
      eyebrow: 'Educación', headline: 'Dónde estudio.',
      items: [
        {
          degree: 'Licenciatura en Ciberdefensa',
          school: 'Universidad de la Defensa Nacional (UNDEF) — FADENA',
          period: '2026 — Presente', mode: 'Virtual',
          desc: 'Carrera universitaria orientada a ciberseguridad, defensa digital, seguridad en redes y protección de sistemas de información.',
        },
        {
          degree: 'Tecnicatura Superior en Análisis de Sistemas',
          school: 'Instituto Tecnológico Beltrán · Avellaneda, Buenos Aires',
          period: '2023 — Presente', mode: 'Presencial',
          desc: 'Formación en arquitectura de software, bases de datos, programación orientada a objetos, metodologías ágiles y diseño de sistemas.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto', headline1: 'Trabajemos', headline2: 'juntos',
      sub: 'Abierto a posiciones junior, proyectos freelance y cualquier oportunidad de colaborar.',
      labelName: 'Nombre', labelEmail: 'Email', labelMessage: 'Mensaje',
      placeholderName: 'Tu nombre', placeholderEmail: 'tu@email.com',
      placeholderMessage: 'Contame sobre tu proyecto u oportunidad...',
      send: 'Enviar mensaje →', sent: 'Mensaje enviado ✓', sending: 'Enviando...',
      errorMsg: 'Algo salió mal. Escribime directamente por email.',
    },
    footer: { copy: '© 2026 Julian Cancelo' },
  },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  lang = signal<Lang>('es');

  constructor() {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved === 'en' || saved === 'es') this.lang.set(saved);
  }

  toggle() {
    const next: Lang = this.lang() === 'en' ? 'es' : 'en';
    this.lang.set(next);
    localStorage.setItem('lang', next);
  }

  t() { return translations[this.lang()]; }
}
