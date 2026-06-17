import { useTranslation } from 'react-i18next'

const STACK_KEYS = [
  { key: 'frontend', value: 'React 19, TypeScript, Vite, Tailwind CSS v4' },
  { key: 'charts', value: 'Recharts' },
  { key: 'data_fetching', value: 'TanStack Query, Axios' },
  { key: 'routing', value: 'React Router v7' },
  { key: 'backend', value: 'Node.js, Express 5, TypeScript' },
  { key: 'database', value: 'PostgreSQL via Prisma ORM' },
  { key: 'icons', value: 'Lucide React' },
]

export function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400">
          {t('about.badge')}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          {t('about.title')}
        </h1>
      </div>

      <div className="space-y-10 text-base leading-relaxed text-gray-600 dark:text-gray-400">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('about.what.title')}
          </h2>
          <p className="mt-3">{t('about.what.p1')}</p>
          <p className="mt-3">{t('about.what.p2')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('about.goal.title')}
          </h2>
          <p className="mt-3">{t('about.goal.body')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('about.data_sources.title')}
          </h2>
          <p className="mt-3">
            {t('about.data_sources.body_prefix')}{' '}
            <a
              href="/methodology"
              className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
            >
              {t('about.data_sources.methodology_link')}
            </a>
            {t('about.data_sources.body_suffix')}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('about.stack.title')}
          </h2>
          <div className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-100 dark:divide-gray-700 dark:border-gray-700">
            {STACK_KEYS.map(({ key, value }) => (
              <div
                key={key}
                className="flex items-start justify-between gap-6 px-5 py-3"
              >
                <span className="shrink-0 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t(`about.stack.${key}`)}
                </span>
                <span className="text-right text-sm text-gray-500 dark:text-gray-400">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
