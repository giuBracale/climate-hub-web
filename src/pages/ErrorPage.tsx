import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FeedbackState } from '../components/FeedbackState'
import type { FeedbackVariant } from '../utils/feedbackUtils'

export function ErrorPage() {
  const { t } = useTranslation()
  const error = useRouteError()
  const is404 = isRouteErrorResponse(error) && error.status === 404

  const variant: FeedbackVariant = is404 ? 'not-found' : 'error'

  const title = is404
    ? t('feedback.not_found.title')
    : isRouteErrorResponse(error)
      ? t('feedback.error.with_status', { status: error.status })
      : t('feedback.error.title')

  const description = is404
    ? t('feedback.not_found.description')
    : t('feedback.error.description')

  return (
    <FeedbackState
      variant={variant}
      title={title}
      description={description}
      className="flex min-h-screen flex-col items-center justify-center bg-sky-50 px-6 text-center dark:bg-gray-950"
      actions={
        <Link
          to="/"
          className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
        >
          {t('common.return_home')}
        </Link>
      }
    />
  )
}
