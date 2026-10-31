import { expect, test } from 'vitest'
import { seedApplications } from '../data'
import { countByStatus, formatSalary, getInitials } from './applications'

test('countByStatus counts every status in the seed data', () => {
  expect(countByStatus(seedApplications)).toEqual({
    wishlist: 1,
    applied: 1,
    interviewing: 1,
    offer: 1,
    rejected: 1,
  })
})

test('countByStatus returns zeroes for an empty list', () => {
  expect(countByStatus([])).toEqual({
    wishlist: 0,
    applied: 0,
    interviewing: 0,
    offer: 0,
    rejected: 0,
  })
})

test('formatSalary formats a salary as whole GBP', () => {
  expect(formatSalary(72000)).toBe('£72,000')
})

test('formatSalary handles a missing salary', () => {
  expect(formatSalary()).toBe('Salary not listed')
})

test('getInitials uses the first two words of a company name', () => {
  expect(getInitials('Cedar & Co')).toBe('C&')
  expect(getInitials('Northstar Labs')).toBe('NL')
})
