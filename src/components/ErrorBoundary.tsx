import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { FeedbackState } from './FeedbackState'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

interface FallbackProps {
  onReset: () => void
}

function ErrorFallback({ onReset }: FallbackProps) {
  const { t } = useTranslation()
  return (
    <FeedbackState
      variant="error"
      title={t('feedback.boundary.title')}
      description={t('feedback.boundary.description')}
      className="flex min-h-screen flex-col items-center justify-center bg-sky-50 px-6 text-center dark:bg-gray-950"
      actions={
        <>
          <button
            onClick={onReset}
            className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
          >
            {t('common.try_again')}
          </button>
          {/* <a> not <Link> — ErrorBoundary wraps the Router */}
          <a
            href="/"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {t('common.return_home')}
          </a>
        </>
      }
    />
  )
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', err, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={this.handleReset} />
    }
    return this.props.children
  }
}
