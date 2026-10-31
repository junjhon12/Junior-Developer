# Roadmap: from TypeScript to hired

This is a 12-phase, project-based path. At 10–15 focused hours per week it takes roughly 14–18 weeks to reach portfolio-ready. At 5 hours per week, expect 6–9 months. Speed matters less than finishing things.

The thread running through every phase is **DevTrack**, a job-application tracker. Each phase adds a real capability, not a toy exercise. By the end you will have a deployed full-stack app, tests, CI, and a story to tell in interviews.

> We are not starting with separate HTML/CSS/JavaScript courses. We will learn the browser, CSS, and JavaScript concepts that React and Tailwind require **just in time**, when the project makes them necessary.

---

## Phase 0 — Setup and developer habits (2–3 days)

**Outcome:** a working local environment and a repeatable way of learning.

- Terminal basics: paths, `cd`, running scripts.
- Node.js, npm, `package.json`, dependencies vs dev dependencies.
- VS Code, React DevTools, browser DevTools (Elements, Console, Network).
- Git basics: `status`, `diff`, `add`, `commit`, `log`; GitHub remote.
- How a Vite app starts: `index.html` → `main.tsx` → `App.tsx`.
- The session loop and how to ask for help.

**Project:** run DevTrack, add one seed application, make the first commit.

**Done when:** you can start the dev server, read a TypeScript error, and commit a change.

---

## Phase 1 — TypeScript foundations (Week 1)

**Outcome:** model a real domain in TypeScript and write testable functions.

- Inference vs annotations; when to use each.
- Primitives, arrays, objects, tuples, `readonly`.
- `type` aliases vs `interface`.
- Optional properties and `undefined`.
- Literal unions and `as const`.
- `Record`, `Partial`, `Pick`, `Omit`.
- Narrowing, `typeof`, discriminated unions.
- Functions, parameters, return types, callbacks.
- Generics: read them, use `Array<T>`, write one small generic.
- Modules and imports/exports.
- `satisfies` for validating data while keeping inference.
- `strict` mode and why `any` is a last resort.
- Runtime vs compile-time: TypeScript disappears at build time; validate external data at runtime.

**Project:** extend DevTrack's domain layer with `filterByStatus`, `sortByDate`, and `getActiveApplications`; add tests. Add a `source` field.

**Done when:** no `any`, tests pass, and you can explain why a runtime API response still needs validation.

---

## Phase 2 — React core (Week 2)

**Outcome:** build an interactive, accessible CRUD interface with local state.

- Components, JSX, fragments, props, composition.
- Lists and stable keys.
- Conditional rendering.
- Events and event handlers.
- `useState` and immutable updates.
- Controlled forms.
- Lifting state and derived values.
- Component purity and the rules of hooks.
- `useEffect` only for synchronising with external systems.
- React DevTools and the re-render mental model.

**Project:** add, edit, delete, and filter applications in memory. Stats update automatically. Add an empty state.

**Done when:** you can add an application, change its status, filter the list, and explain which component owns each piece of state.

---

## Phase 3 — Tailwind and interface craft (Week 3)

**Outcome:** a responsive, accessible UI that does not look like a template.

- Utility-first CSS and when to extract a component.
- Mobile-first breakpoints.
- Flexbox and grid for layout.
- Spacing, type scales, colour, contrast.
- Design tokens with Tailwind theme variables.
- Hover, focus-visible, disabled, and active states.
- Semantic HTML, labels, landmarks, alt text.
- Keyboard navigation and focus order.
- Empty, loading, and error states.
- Dark mode and `prefers-reduced-motion`.

**Project:** redesign DevTrack into a polished responsive dashboard. Add filter tabs, status colours, and an accessible mobile layout.

**Done when:** usable at 360 px and 1280 px, fully keyboard-operable, and no unlabelled controls.

---

## Phase 4 — Routing, forms, and validation (Week 4)

**Outcome:** a multi-page app with shareable URLs and trustworthy forms.

- React Router: routes, nested routes, layout routes, dynamic params.
- URL as state; back/forward behaviour; 404 routes.
- React Hook Form: registration, submission, field arrays.
- Zod schemas and schema inference.
- Client validation vs server validation.
- Error messages, focus management, and optimistic UI basics.

**Project:** `/applications`, `/applications/:id`, `/applications/new`, and `/applications/:id/edit`. Add search and status filters to the URL.

**Done when:** refreshing a detail page works, invalid forms are blocked with helpful messages, and filters survive a page reload.

---

## Phase 5 — Server state and async UI (Week 5)

**Outcome:** fetch, cache, mutate, and recover from failure like a production frontend.

- HTTP request/response, methods, status codes, headers, JSON.
- `fetch`, `async/await`, errors, and `AbortController`.
- Loading, empty, error, and success states.
- Race conditions and stale responses.
- TanStack Query: queries, mutations, cache keys, invalidation.
- Optimistic updates and rollback.
- Environment variables and API base URLs.
- Mocking a backend with MSW.

**Project:** move data behind a mock API. Replace local state with query hooks. Add retry, optimistic status changes, and error toasts.

**Done when:** you can explain what happens on a slow request, a 500 response, and a double-clicked mutation.

---

## Phase 6 — Testing and code quality (Week 6)

**Outcome:** change code without fear.

- The testing pyramid and what not to test.
- Vitest: arrange–act–assert, matchers, mocks.
- Testing Library: query by role/label, `user-event`.
- Testing async UI and network states with MSW.
- Playwright: one or two critical end-to-end journeys.
- Test isolation, fixtures, and deterministic data.
- Linting, formatting, and TypeScript as a quality gate.
- Reading a stack trace and debugging with breakpoints.

**Project:** unit tests for domain logic, component tests for the form and filter, one E2E test for “create an application”.

**Done when:** `npm run test:run`, `npm run typecheck`, and `npm run build` pass, and a refactor does not break behaviour.

---

## Phase 7 — Backend fundamentals (Week 7)

**Outcome:** design and build a small API you understand completely.

- Node.js runtime, modules, and environment variables.
- Express: routing, middleware, controllers, services.
- REST resource design and naming.
- Request validation with Zod.
- Status codes and a consistent error shape.
- Logging, CORS, and security headers.
- API testing with Supertest.
- Pagination, filtering, and sorting.
- Reading API docs and testing with `curl` / an HTTP client.

**Project:** a `devtrack-api` with in-memory CRUD endpoints. Connect the React app to it.

**Done when:** the frontend no longer imports seed data, and every endpoint has a documented request/response and at least one test.

---

## Phase 8 — PostgreSQL and persistence (Week 8)

**Outcome:** durable data with a schema you can migrate and query.

- Relational modelling: tables, keys, relationships.
- SQL: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `JOIN`, `GROUP BY`.
- PostgreSQL locally (Docker) or hosted (Neon).
- Drizzle schema, queries, and migrations.
- Constraints, indexes, and transactions.
- Seed scripts and test databases.
- N+1 queries and query plans.
- Connecting the API to the database.

**Project:** replace in-memory storage with PostgreSQL. Add pagination and server-side search. Write a repeatable migration and seed workflow.

**Done when:** dropping the database and re-running migrations + seed restores a working app.

---

## Phase 9 — Authentication and security (Week 9)

**Outcome:** users own their data, and you can explain the threats.

- Authentication vs authorisation.
- Password hashing with Argon2.
- Sessions, cookies, `HttpOnly`, `Secure`, `SameSite`.
- CSRF, XSS, SQL injection, and the OWASP Top 10.
- Input validation and output encoding.
- Rate limiting and brute-force protection.
- Secrets management and safe logging.
- Protected routes on client and server.
- Ownership checks on every resource.

**Project:** sign up, log in, log out. Each user sees only their own applications. Add protected routes and server-side ownership checks.

**Done when:** user A cannot read or mutate user B's data, even by calling the API directly.

---

## Phase 10 — Deployment and CI/CD (Week 10)

**Outcome:** a public app with automated checks and a rollback plan.

- Production builds and environment-specific configuration.
- Deploy frontend (Vercel), API (Render/Fly.io), database (Neon).
- DNS, HTTPS, and custom domains.
- GitHub Actions: install, typecheck, test, build.
- Running migrations during deployment.
- Logs, error tracking, uptime checks, and backups.
- Rollbacks and incident notes.

**Project:** deploy DevTrack publicly. Add a CI workflow and a short operations README.

**Done when:** a push to `main` runs CI and deploys, and you can explain where secrets live and how to roll back.

---

## Phase 11 — Performance, accessibility, and capstone (Week 11)

**Outcome:** a portfolio centrepiece that holds up under scrutiny.

- Core Web Vitals and Lighthouse.
- Bundle analysis and code splitting.
- Image optimisation and caching.
- Measuring before memoising.
- Accessibility audit with keyboard and screen reader basics.
- SEO fundamentals and metadata.
- Architecture diagrams and README storytelling.
- Scope control and finishing.

**Project:** polish DevTrack or build a second capstone using a public API. Write a technical README, record a 2-minute demo, and do a self-review.

**Done when:** the app is deployed, documented, tested, and you can discuss three trade-offs you made.

---

## Phase 12 — Job readiness (Week 12+)

**Outcome:** you can find, apply for, and interview for junior roles.

- CV and LinkedIn focused on projects and impact.
- GitHub profile and pinned repositories.
- Portfolio site (simple and fast).
- STAR stories for teamwork, conflict, failure, and learning.
- Take-home assignment strategy and timeboxing.
- Mock interviews: JavaScript/TypeScript, React, debugging, API design.
- Code review and open-source contribution.
- Consistent application pipeline and follow-ups.

**Done when:** you have two strong projects, one deployed full-stack app, a rehearsed demo, and a weekly application routine.

---

## Parallel fundamentals track

Thirty minutes a week, alongside the project. These topics make interviews and debugging easier.

- Big-O and common structures: arrays, hash maps, sets, stacks, queues.
- Recursion and iteration.
- The event loop, promises, and task queues.
- HTTP, DNS, TLS, and how a browser loads a page.
- The DOM, rendering, reflow, and repaint.
- Git branching, rebasing, and resolving conflicts.
- Basic system design: client, API, database, cache, queue.
- Reading RFCs and official docs.

Do not let this track delay the project. It is supporting material, not a prerequisite.

---

## What to build after DevTrack

Pick one, not five:

1. **Team collaboration app** — real-time updates, roles, invitations.
2. **E-commerce storefront** — catalogue, cart, checkout (mock payments), admin.
3. **Data dashboard** — public API, charts, filters, saved views.
4. **Booking app** — availability, time zones, conflict handling.
5. **Open-source contribution** — a real issue in a library you use.

The goal is depth: auth, tests, deployment, docs, and a clear problem statement. A finished small app beats an unfinished ambitious one.

---

## Anti-patterns

- Tutorial hopping without shipping.
- Adding libraries before understanding the problem.
- Learning auth, Docker, and GraphQL in the same week.
- Building a private “perfect” app that nobody can use.
- Copying AI output without tests or explanation.
- Waiting until you feel ready to apply for jobs.

Ship, review, repeat.
