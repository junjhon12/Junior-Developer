import { seedApplications } from './data'
import {
  countByStatus,
  formatDate,
  formatSalary,
  getInitials,
  statusLabels,
} from './lib/applications'
import type { ApplicationStatus } from './types'

const statusStyles: Record<ApplicationStatus, string> = {
  wishlist: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
  applied: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
  interviewing: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  offer: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  rejected: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
}

function App() {
  const counts = countByStatus(seedApplications)
  const activeCount = counts.applied + counts.interviewing

  const stats = [
    {
      label: 'Total applications',
      value: seedApplications.length,
      detail: 'Across all stages',
    },
    {
      label: 'In progress',
      value: activeCount,
      detail: 'Applied or interviewing',
    },
    {
      label: 'Interviews',
      value: counts.interviewing,
      detail: 'Conversations happening',
    },
    {
      label: 'Offers',
      value: counts.offer,
      detail: 'Decision time',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.12),_transparent_32%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-cyan-400 font-bold text-slate-950 shadow-lg shadow-cyan-400/20">
              DT
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">DevTrack</p>
              <p className="text-sm text-slate-400">Job application workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 sm:self-auto">
            <span className="size-2 rounded-full bg-emerald-400" />
            Milestone 1 · TypeScript foundations
          </div>
        </header>

        <main>
          <section className="py-10 sm:py-14">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">
              Your search, organised
            </p>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Keep every opportunity moving.
                </h1>
                <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
                  A focused dashboard for tracking applications, interviews, and
                  offers. This first version is powered by typed seed data and
                  small, testable functions.
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] px-5 py-4 text-sm">
                <p className="font-medium text-cyan-200">Next up</p>
                <p className="mt-1 max-w-xs text-slate-400">
                  Add state and a form so the dashboard becomes interactive.
                </p>
              </div>
            </div>
          </section>

          <section aria-label="Application statistics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
              </div>
            ))}
          </section>

          <section className="py-10 sm:py-14" aria-labelledby="applications-heading">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="applications-heading"
                  className="text-xl font-semibold tracking-tight text-white"
                >
                  Recent applications
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Rendered from a typed array — no database yet.
                </p>
              </div>
              <p className="text-sm text-slate-500">
                {seedApplications.length} records
              </p>
            </div>

            <div className="space-y-3">
              {seedApplications.map((application) => (
                <article
                  key={application.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition-colors hover:border-white/20 hover:bg-slate-900"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-slate-200">
                        {getInitials(application.company)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-white">
                          {application.role}
                        </h3>
                        <p className="mt-0.5 text-sm text-slate-400">
                          {application.company}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`self-start rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[application.status]}`}
                    >
                      {statusLabels[application.status]}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/5 pt-4 text-sm text-slate-400">
                    <span>{application.location}</span>
                    <span className="capitalize">{application.workMode}</span>
                    <span>{formatSalary(application.salary)}</span>
                    <span>
                      {application.status === 'wishlist' ? 'Saved' : 'Applied'}{' '}
                      {formatDate(application.appliedOn)}
                    </span>
                  </div>

                  {application.notes ? (
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {application.notes}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="mission-heading"
            className="mb-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              Your Day 1 mission
            </p>
            <h2
              id="mission-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-white"
            >
              Read, change, verify.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  number: '01',
                  title: 'Trace the types',
                  body: 'Open src/types.ts, then follow JobApplication into data.ts and App.tsx.',
                },
                {
                  number: '02',
                  title: 'Make a change',
                  body: 'Add a sixth application and give it a new note. Let TypeScript guide you.',
                },
                {
                  number: '03',
                  title: 'Run the checks',
                  body: 'Run npm run test:run and npm run build. Fix anything that turns red.',
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="rounded-2xl border border-white/5 bg-slate-950/50 p-5"
                >
                  <p className="font-mono text-xs text-cyan-400">{item.number}</p>
                  <h3 className="mt-3 font-medium text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 py-6 text-sm text-slate-500">
          DevTrack · Built step by step with React, TypeScript, and Tailwind CSS.
        </footer>
      </div>
    </div>
  )
}

export default App
