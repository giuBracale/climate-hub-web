import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { FeedbackState } from '../components/FeedbackState'
import type { FeedbackVariant } from '../components/FeedbackState'

export function ErrorPage() {
  const error = useRouteError()
  const is404 = isRouteErrorResponse(error) && error.status === 404

  const variant: FeedbackVariant = is404 ? 'not-found' : 'error'

  const title = is404
    ? 'Page not found'
    : isRouteErrorResponse(error)
      ? `Error ${error.status}`
      : 'Something went wrong'

  const description = is404
    ? "The page you're looking for doesn't exist or may have been moved."
    : 'An unexpected error occurred while loading this view.'

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
          Return Home
        </Link>
      }
    />
  )
}
