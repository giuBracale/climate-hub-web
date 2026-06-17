export type FeedbackVariant = 'not-found' | 'network-error' | 'empty' | 'error'

export function classifyApiError(err: unknown): FeedbackVariant {
  if (!(err instanceof Error)) return 'error'
  const msg = err.message
  if (msg === 'Service unavailable. Please try again later.') return 'network-error'
  if (msg === 'Invalid country code') return 'not-found'
  if (msg.toLowerCase().includes('no data') || msg.toLowerCase().includes('not found'))
    return 'empty'
  return 'error'
}
