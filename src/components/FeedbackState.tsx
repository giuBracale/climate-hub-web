import { SearchX, CloudOff, Database, AlertTriangle, type LucideProps } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import type { FeedbackVariant } from '../utils/feedbackUtils'

const ICONS: Record<FeedbackVariant, ComponentType<LucideProps>> = {
  'not-found':     SearchX,
  'network-error': CloudOff,
  'empty':         Database,
  'error':         AlertTriangle,
}

const ICON_COLOR: Record<FeedbackVariant, string> = {
  'not-found':     'text-gray-400 dark:text-gray-500',
  'network-error': 'text-amber-400 dark:text-amber-500',
  'empty':         'text-sky-400 dark:text-sky-500',
  'error':         'text-red-400 dark:text-red-500',
}

interface Props {
  variant: FeedbackVariant
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}

export function FeedbackState({ variant, title, description, actions, className }: Props) {
  const Icon = ICONS[variant]
  return (
    <div
      className={
        className ??
        'flex flex-col items-center justify-center py-20 px-6 text-center'
      }
    >
      <Icon
        className={`h-10 w-10 ${ICON_COLOR[variant]}`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h2 className="mt-5 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      {actions && (
        <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
      )}
    </div>
  )
}

