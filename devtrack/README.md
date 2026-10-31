# DevTrack

A job-application tracker built as the main project in the **Junior Developer Learning Lab**.

The app grows one milestone at a time:

1. Typed data and pure functions
2. React components and interactivity
3. Tailwind design system and accessibility
4. Routing, forms, and validation
5. Real API and database
6. Authentication, testing, and deployment

## Run it

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Useful commands

```bash
npm run dev        # start the dev server
npm run test       # run tests in watch mode
npm run test:run   # run tests once
npm run typecheck  # check TypeScript without building
npm run build      # type-check and create a production build
npm run lint       # lint the code
```

## Where things live

```text
src/
  types.ts                  Domain types and status constants
  data.ts                   Seed data for the first milestone
  lib/applications.ts       Pure functions + tests
  App.tsx                   The dashboard UI
  index.css                 Tailwind import and global styles
```

## Milestone 1 mission

1. Open `src/types.ts`, then follow `JobApplication` into `data.ts` and `App.tsx`.
2. Add a sixth application to `seedApplications`.
3. Add a note to it, then run `npm run test:run` and `npm run build`.

The detailed lesson is in the repository root: `docs/lessons/01-typescript-foundations.md`.
