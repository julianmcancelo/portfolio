# Julian Cancelo — Portfolio

Angular 19 portfolio site. Apple-style aesthetics: alternating black/white sections, cinematic scroll animations, minimal typography.

## Stack
- Angular 19 (standalone components)
- SCSS
- Google Fonts: Figtree + DM Mono

## Setup

```bash
npm install
ng serve
```

Open http://localhost:4200

## Build for production

```bash
ng build
```

Output in `dist/portfolio/browser/` — deploy to any static host (Vercel, Netlify, GitHub Pages).

## Add your CV files

Place your CV files inside `src/assets/`:
- `CV_Julian_Cancelo_EN.docx`
- `CV_Julian_Cancelo_ATS.docx`

## Sections
- **Hero** — Full name, typewriter role, animated background
- **About** — Bio, stats, CV download (light bg)
- **Projects** — 4 projects in list format (dark bg)
- **Skills** — Grid grouped by category (light bg)
- **Contact** — Links + form (dark bg)
