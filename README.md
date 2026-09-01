# Binith Jayasinghe Portfolio

A component-based React and TypeScript portfolio built with Vite.

## Development

```bash
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run lint` for static analysis.

## Structure

- `src/components` contains a dedicated component and stylesheet for each page section.
- `src/data/portfolio.ts` contains repeatable portfolio content.
- `src/context` owns the persisted dark/light theme.
- `src/styles/theme.css` defines design tokens; `global.css` contains the base layout and shared utilities.
- `src/hooks` contains reduced-motion-aware reveal behavior.

The downloadable CV is sourced from `src/assets/CV/Binith_Jayasinghe.pdf` and bundled by Vite.
