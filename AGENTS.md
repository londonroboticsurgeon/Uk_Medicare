# Repository Guidelines

## Project Structure & Module Organization
This is a Vite, React, and TypeScript website for Prof. Hemant Sheth. App composition starts in `src/main.tsx`, `src/App.tsx`, `src/entry-client.tsx`, and `src/entry-server.tsx`. Reusable UI sections live in `src/components/`, routed pages in `src/pages/`, route definitions in `src/routes/`, SEO helpers in `src/seo/`, and structured content in `src/data/`. Static assets are in `public/`, fonts in `fonts/`, automation scripts in `scripts/`, and audits or registers in `docs/`.

## Build, Test, and Development Commands
- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite dev server on port `3000`.
- `npm run typecheck`: run TypeScript validation with `noEmit`.
- `npm run test`: run the Vitest suite once.
- `npm run test:coverage`: run Vitest with V8 coverage thresholds.
- `npm run build`: typecheck, test, build client and SSR bundles, prerender, and run SEO checks.
- `npm run preview`: serve the production build locally.
- `npm run check:seo`: validate SEO output after prerendering.

## Coding Style & Naming Conventions
Use TypeScript, React functional components, and 2-space indentation. Component files use PascalCase, such as `HeroSection.tsx`; data and utility modules use camelCase, such as `contactInfo.ts`. Prefer adding verified content to `src/data/` instead of hardcoding copy in components. Use Tailwind utilities and theme values from `tailwind.config.js`; match nearby layout patterns before introducing new styles. There is no separate lint script, so rely on typecheck, tests, and review.

## Testing Guidelines
Vitest is configured in `vitest.config.ts`. Existing tests use `*.test.ts` and `*.test.tsx` near the code they validate, for example `src/seo/seo.test.ts` and `src/entry-server.test.tsx`. Coverage applies to config, routes, SEO helpers, and server entry code, with 80% thresholds. Run `npm run test` for focused changes and `npm run build` before release or deployment.

## Commit & Pull Request Guidelines
Recent history uses short, descriptive subjects, often imperative, such as `Add evidence-led AEO and GEO content` and `Fix Linux deployment dependencies`. Keep the first line concise and specific. Pull requests should summarize the user-facing change, list verification commands, link relevant issues or source documents, and include screenshots for visual changes. Call out SEO, structured data, clinic detail, or medical-claim edits.

## Security & Configuration Tips
Use `.env.example` as the template for local environment variables. Do not commit secrets, patient-identifying information, or unverified medical claims. Treat generated feedback-card JSON and images as public-facing only after review.
