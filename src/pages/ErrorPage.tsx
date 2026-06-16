import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError()

  const is404 =
    isRouteErrorResponse(error) && error.status === 404

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sky-50 px-6 text-center dark:bg-gray-950">
      <p className="text-6xl font-extrabold text-sky-600 dark:text-sky-400">
        {isRouteErrorResponse(error) ? error.status : 'Error'}
      </p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        {is404 ? 'Page not found' : 'Something went wrong'}
      </h1>
      <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
        {isRouteErrorResponse(error)
          ? error.statusText
          : error instanceof Error
            ? error.message
            : 'An unexpected error occurred.'}
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
      >
        Go home
      </Link>
    </div>
  )
}
