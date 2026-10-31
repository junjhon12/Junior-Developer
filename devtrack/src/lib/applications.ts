import type { ApplicationStatus, JobApplication } from '../types'

export const statusLabels: Record<ApplicationStatus, string> = {
  wishlist: 'Wishlist',
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Rejected',
}

export function countByStatus(
  applications: JobApplication[],
): Record<ApplicationStatus, number> {
  const counts: Record<ApplicationStatus, number> = {
    wishlist: 0,
    applied: 0,
    interviewing: 0,
    offer: 0,
    rejected: 0,
  }

  for (const application of applications) {
    counts[application.status] += 1
  }

  return counts
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${isoDate}T00:00:00`))
}

export function formatSalary(salary?: number): string {
  if (salary === undefined) return 'Salary not listed'

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(salary)
}

export function getInitials(company: string): string {
  return company
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
