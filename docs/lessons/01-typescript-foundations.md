# Lesson 1 — TypeScript foundations in DevTrack

**Time:** 3–5 hours, split over 2–3 sessions  
**Goal:** understand how TypeScript shapes a real feature, then extend DevTrack's domain layer without breaking the UI.

By the end you will have:

- traced a domain type from definition to screen;
- added a field to the data model;
- written and tested two pure functions;
- read a real TypeScript error and fixed it.

---

## 1. Start the app

From `E:\Junior Developer`:

```bash
cd devtrack
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

In a second terminal, run the checks:

```bash
cd devtrack
npm run test:run
npm run typecheck
```

Both should pass. If they do not, stop and fix the environment before continuing.

### What just happened?

```text
index.html
  └── loads src/main.tsx
        └── renders <App />
              └── imports seed data and helper functions
                    └── types check at build time
```

Vite serves the app and hot-reloads it when you save. TypeScript checks your code, but it is erased from the browser bundle. Types do not exist at runtime. That is why data arriving from an API still needs runtime validation later.

---

## 2. The core idea: types describe values

Open `src/types.ts`.

```ts
export type JobApplication = {
  id: string
  company: string
  role: string
  status: ApplicationStatus
  appliedOn: string
  location: string
  workMode: WorkMode
  salary?: number
  notes?: string
}
```

Read it as: “a job application has these properties, with these types.” The `?` means the property may be missing or `undefined`.

### Inference vs annotation

TypeScript can infer types:

```ts
const company = 'Northstar Labs' // string
const count = 5 // number
```

You annotate when the type is not obvious or when you want to enforce a contract:

```ts
function formatSalary(salary?: number): string {
  // ...
}
```

**Rule of thumb:** let TypeScript infer local variables; annotate function boundaries and exported data shapes.

### Literal unions

`ApplicationStatus` is not just `string`:

```ts
export const APPLICATION_STATUSES = [
  'wishlist',
  'applied',
  'interviewing',
  'offer',
  'rejected',
] as const

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]
```

`as const` makes the array readonly and preserves the exact strings. Indexing it with `[number]` produces the union:

```ts
type ApplicationStatus =
  | 'wishlist'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected'
```

Why bother? If you type `application.status === 'intervewing'`, TypeScript catches the typo. If `status` were `string`, it would not.

### `satisfies`

Open `src/data.ts`:

```ts
export const seedApplications = [
  // ...
] satisfies JobApplication[]
```

`satisfies` checks that the value fits `JobApplication[]` **without widening** the inferred type. You get validation now, and precise autocomplete later. A type annotation (`: JobApplication[]`) would also validate, but it would throw away the specific literal information.

### `Record`

Open `src/lib/applications.ts`:

```ts
export const statusLabels: Record<ApplicationStatus, string> = {
  wishlist: 'Wishlist',
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Rejected',
}
```

`Record<K, V>` means “an object whose keys are every member of `K`, and whose values are `V`.” Because the key type is the full union, TypeScript forces you to include every status. Add a new status and this object becomes an error until you handle it.

That is the theme: **make invalid states hard to represent.**

---

## 3. Guided code tour

Spend 15 minutes following these files without changing anything.

1. `src/types.ts` — the domain vocabulary.
2. `src/data.ts` — values that satisfy the vocabulary.
3. `src/lib/applications.ts` — pure functions that transform the data.
4. `src/App.tsx` — renders the result.
5. `src/lib/applications.test.ts` — proves the functions behave.

Answer these before moving on:

- Where is the `JobApplication` type used?
- Which function computes the stats?
- What happens if `salary` is missing?
- Why is `countByStatus` easy to test?

### Pure functions

`countByStatus` takes data in and returns a new value. It does not read the DOM, call an API, or mutate its argument. Pure functions are the easiest part of an app to test and reuse. Aim for a thick layer of them.

---

## 4. Exercises

Do these in order. After each one, save, check the browser, and run the tests.

### Exercise A — Add an application

Add a sixth object to `seedApplications`:

- company: `Orbit Systems`
- role: `Junior Web Developer`
- status: `applied`
- appliedOn: a date this week
- location: `Remote`
- workMode: `remote`
- salary: `70000`
- notes: one sentence about why you applied

The dashboard should show six records. The existing test expecting one application per status will fail — that is correct. Update the test to match the new data. This is not “breaking tests”; it is changing a specification.

### Exercise B — Add a `source` field

Add an optional `source` property to `JobApplication`:

```ts
source?: 'linkedin' | 'referral' | 'company-site' | 'other'
```

Then:

1. Give a few seed applications a source.
2. Display it in the card metadata in `App.tsx`.
3. Handle the missing case (`source ?? 'Unknown source'` is one option).
4. Run `npm run typecheck`.

Notice how the compiler tells you where the type is consumed. That is the value of a shared domain type.

### Exercise C — Write `filterByStatus`

In `src/lib/applications.ts`, implement:

```ts
export function filterByStatus(
  applications: JobApplication[],
  status: ApplicationStatus | 'all',
): JobApplication[]
```

Requirements:

- `'all'` returns every application.
- Any specific status returns only matching applications.
- The original array must not be mutated.

Add these tests to `src/lib/applications.test.ts`:

```ts
test('filterByStatus returns everything for all', () => {
  expect(filterByStatus(seedApplications, 'all')).toHaveLength(
    seedApplications.length,
  )
})

test('filterByStatus returns only matching applications', () => {
  const offers = filterByStatus(seedApplications, 'offer')
  expect(offers.length).toBeGreaterThan(0)
  expect(offers.every((application) => application.status === 'offer')).toBe(true)
})

test('filterByStatus does not mutate the input', () => {
  const originalLength = seedApplications.length
  filterByStatus(seedApplications, 'rejected')
  expect(seedApplications).toHaveLength(originalLength)
})
```

`Array.prototype.filter` is the obvious tool. Do not reach for a loop unless you can explain why.

### Exercise D — Write `sortByDate`

Implement:

```ts
export function sortByDate(applications: JobApplication[]): JobApplication[]
```

Requirements:

- Newest `appliedOn` first.
- Do not mutate the input. Use `toSorted` or copy with `[...applications]` before `sort`.
- Dates are ISO `YYYY-MM-DD`, so lexical comparison works — but be ready to explain why.

Tests to add:

```ts
test('sortByDate returns newest first without mutating', () => {
  const originalFirst = seedApplications[0]
  const sorted = sortByDate(seedApplications)
  const dates = sorted.map((application) => application.appliedOn)

  expect(dates).toEqual([...dates].sort().reverse())
  expect(seedApplications[0]).toBe(originalFirst)
})
```

Then use `sortByDate` in `App.tsx` before rendering:

```ts
const orderedApplications = sortByDate(seedApplications)
```

Keep the stats based on the full list, not the sorted copy.

### Exercise E — Read an error on purpose

Delete the `status` line from one seed object and run:

```bash
npm run typecheck
```

Read the error out loud. It will mention a property being missing and list the expected type. Then restore the line.

Do this once more with a typo:

```ts
status: 'interviewingg'
```

Notice that the error is more specific because of the literal union. Put it back.

---

## 5. Verification

```bash
npm run test:run
npm run typecheck
npm run build
```

All three must pass. Then check the browser:

- six applications visible;
- source appears where present;
- newest application first;
- no console errors.

If you want an extra check, run `npm run lint`.

---

## 6. Commit

From the repository root:

```bash
git status
git diff
git add .
git commit -m "feat: extend DevTrack domain model and add filtering"
```

Read the diff before committing. If you see `node_modules`, stop — the `.gitignore` is wrong.

---

## 7. Self-check

Answer without looking at the code:

1. What is the difference between a type annotation and type inference?
2. Why does `as const` matter for `APPLICATION_STATUSES`?
3. What does `satisfies` do that a type annotation does not?
4. Why can TypeScript not protect you from a malformed API response?
5. Why is `countByStatus` easier to test than a React component?
6. What does “do not mutate the input” mean for `sortByDate`?
7. Where would you add a new status, and what breaks first?

If any answer is fuzzy, write it in your own words in `docs/PROGRESS.md` before moving on.

---

## 8. Next session

Phase 2 turns the static dashboard into an interactive app:

- component boundaries;
- `useState`;
- controlled forms;
- add/delete/filter in memory;
- derived stats.

Before then, make sure Exercise C and D are committed and tests are green.
