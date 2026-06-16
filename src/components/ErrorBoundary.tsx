import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(err: unknown): State {
    const message =
      err instanceof Error ? err.message : 'An unexpected error occurred.'
    return { hasError: true, message }
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', err, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-sky-50 px-6 text-center dark:bg-gray-950">
          <p className="text-5xl font-extrabold text-sky-600 dark:text-sky-400">
            Oops
          </p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
            {this.state.message}
          </p>
          <button
            onClick={this.handleReset}
            className="mt-8 rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
