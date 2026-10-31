export const APPLICATION_STATUSES = [
  'wishlist',
  'applied',
  'interviewing',
  'offer',
  'rejected',
] as const

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]

export type WorkMode = 'remote' | 'hybrid' | 'onsite'

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
