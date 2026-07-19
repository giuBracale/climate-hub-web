import { ApiError } from '../types'

export type FeedbackVariant =
  | 'not-found'
  | 'network-error'
  | 'backend-unavailable'
  | 'database-unavailable'
  | 'rate-limited'
  | 'empty'
  | 'error'

export function classifyApiError(err: unknown): FeedbackVariant {
  if (!(err instanceof ApiError)) return 'error'

  switch (err.code) {
    case 'INVALID_COUNTRY':
    case 'COUNTRY_NOT_FOUND':
    case 'YEAR_NOT_FOUND':
      return 'not-found'
    case 'NETWORK_ERROR':
      return 'network-error'
    case 'BACKEND_UNAVAILABLE':
      return 'backend-unavailable'
    case 'DATABASE_UNAVAILABLE':
      return 'database-unavailable'
    case 'RATE_LIMIT_EXCEEDED':
      return 'rate-limited'
    default:
      return 'error'
  }
}

type Translate = (key: string) => string

export function getFeedbackCopy(
  variant: FeedbackVariant,
  t: Translate,
): { title: string; description: string } {
  switch (variant) {
    case 'not-found':
      return {
        title: t('country.error.unavailable_title'),
        description: t('country.error.unavailable_desc'),
      }
    case 'network-error':
      return {
        title: t('country.error.network_title'),
        description: t('country.error.network_desc'),
      }
    case 'backend-unavailable':
      return {
        title: t('country.error.service_title'),
        description: t('country.error.service_desc'),
      }
    case 'database-unavailable':
      return {
        title: t('country.error.database_title'),
        description: t('country.error.database_desc'),
      }
    case 'rate-limited':
      return {
        title: t('country.error.rate_limit_title'),
        description: t('country.error.rate_limit_desc'),
      }
    default:
      return {
        title: t('country.error.generic_title'),
        description: t('country.error.generic_desc'),
      }
  }
}
