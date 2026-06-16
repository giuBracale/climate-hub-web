import { Link } from 'react-router-dom'
import { FeedbackState } from '../components/FeedbackState'

export function NotFoundPage() {
  return (
    <FeedbackState
      variant="not-found"
      title="Page not found"
      description="The page you're looking for doesn't exist or may have been moved."
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
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
