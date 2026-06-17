import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FeedbackState } from '../components/FeedbackState'

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <FeedbackState
      variant="not-found"
      title={t('feedback.not_found.title')}
      description={t('feedback.not_found.description')}
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
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
