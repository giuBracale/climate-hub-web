import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { FeedbackState } from './FeedbackState'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
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
      return (
        <FeedbackState
          variant="error"
          title="Something went wrong"
          description="An unexpected error occurred while loading this view."
          className="flex min-h-screen flex-col items-center justify-center bg-sky-50 px-6 text-center dark:bg-gray-950"
          actions={
            <>
              <button
                onClick={this.handleReset}
                className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
              >
                Try Again
              </button>
              {/* <a> not <Link> — ErrorBoundary wraps the Router */}
              <a
                href="/"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Return Home
              </a>
            </>
          }
        />
      )
    }
    return this.props.children
  }
}
