# Junior Developer Learning Lab

A project-based path from TypeScript fundamentals to a deployed, tested, full-stack portfolio app — and the habits needed to work as a junior web developer.

## Start here

1. Read [`docs/ROADMAP.md`](docs/ROADMAP.md) for the full 12-phase plan.
2. Open [`docs/lessons/01-typescript-foundations.md`](docs/lessons/01-typescript-foundations.md) and complete the first mission.
3. Tick things off in [`docs/PROGRESS.md`](docs/PROGRESS.md) as you go.

The main project is [`devtrack/`](devtrack/) — a job-application tracker. It starts small and grows into the app you will deploy and put on your CV.

```bash
cd devtrack
npm install
npm run dev
```

## The learning contract

This works best if we treat it like a junior job, not a video course.

- **Build first, theory second.** Every concept appears because the project needs it.
- **One milestone at a time.** Do not jump ahead to auth or deployment because they sound exciting.
- **Type it yourself.** No copy-paste without retyping and explaining it.
- **Use AI as a reviewer, not an answer machine.** Try for 20 minutes, ask for a hint, then ask for an explanation — not a full solution.
- **Every session ends with a green check and a commit.** `npm run test:run`, `npm run build`, then `git commit`.
- **Explain it back.** If you cannot explain a line in plain language, you do not own it yet.
- **Ship imperfect work.** A deployed simple app beats a perfect local one.

### The weekly loop

| Activity | Share of time |
| --- | --- |
| Reading docs / short lessons | 20% |
| Building and debugging | 60% |
| Testing, reviewing, explaining | 20% |

Each session:

1. **Recall** — explain last session's code without looking.
2. **Learn** — one focused concept, with official docs.
3. **Build** — apply it to DevTrack.
4. **Verify** — tests, type-check, manual browser check.
5. **Reflect** — write one sentence in the progress log and commit.

## The stack

Chosen because it is common in junior job adverts, has excellent docs, and teaches transferable ideas.

| Layer | Tools |
| --- | --- |
| Language | TypeScript |
| UI | React + Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Server state | TanStack Query |
| Forms | React Hook Form + Zod |
| Backend | Node.js + Express |
| Database | PostgreSQL + Drizzle ORM |
| Auth | Session cookies (learn the mechanics), then Better Auth |
| Testing | Vitest, Testing Library, Playwright |
| Delivery | GitHub Actions, Vercel, Render/Fly.io, Neon |

Versions move fast. Use the official docs for the current setup rather than memorising versions from this repo.

## What "competent junior" means

Not knowing everything. Being able to:

- Build a small feature end-to-end without hand-holding.
- Read an error, form a hypothesis, and debug systematically.
- Read official documentation and adapt an example.
- Write clear TypeScript and simple tests.
- Use Git and pull requests without fear.
- Ask a precise question with context and a reproduction.
- Communicate trade-offs and admit what you do not know.

The roadmap targets those outcomes. It does not cover every library or every computer-science topic — that is a career-long project.

## Workspace

```text
Junior Developer/
  README.md                 This file
  docs/
    ROADMAP.md              Full curriculum and phase outcomes
    PROGRESS.md             Checklist and session log
    RESOURCES.md            Trusted docs and practice sites
    lessons/
      01-typescript-foundations.md
  devtrack/                 The app you will grow
```

## Current milestone

**Phase 1 — TypeScript foundations.** DevTrack renders typed seed data and passes five unit tests. The next step is to extend the domain functions and then make the UI interactive.
