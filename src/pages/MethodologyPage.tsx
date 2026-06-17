import { useTranslation } from 'react-i18next'

type MethodologySource = { name: string; url: string; metrics: string; coverage: string }

export function MethodologyPage() {
  const { t } = useTranslation()

  const sources = t('methodology.sources.list', { returnObjects: true }) as MethodologySource[]
  const limitationItems = t('methodology.limitations.items', { returnObjects: true }) as string[]

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400">
          {t('methodology.badge')}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          {t('methodology.title')}
        </h1>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          {t('methodology.subtitle')}
        </p>
      </div>

      <div className="space-y-12 text-base leading-relaxed text-gray-600 dark:text-gray-400">

        {/* Data Sources */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('methodology.sources.title')}
          </h2>
          <p className="mt-3">{t('methodology.sources.description')}</p>
          <div className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-100 dark:divide-gray-700 dark:border-gray-700">
            {sources.map(({ name, url, metrics, coverage }) => (
              <div key={name} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {name}
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
                  >
                    {t('methodology.sources.visit')}
                  </a>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {t('methodology.sources.metrics_label')}:
                  </span>{' '}
                  {metrics}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {t('methodology.sources.coverage_label')}:
                  </span>{' '}
                  {coverage}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Data ingestion */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('methodology.ingestion.title')}
          </h2>
          <p className="mt-3">{t('methodology.ingestion.p1')}</p>
          <p className="mt-3">{t('methodology.ingestion.p2')}</p>
        </section>

        {/* Aggregation */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('methodology.aggregation.title')}
          </h2>
          <p className="mt-3">{t('methodology.aggregation.description')}</p>
          <ul className="mt-3 space-y-2 pl-5 text-sm">
            <li className="list-disc">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {t('methodology.aggregation.pct_change_label')}:
              </span>{' '}
              {t('methodology.aggregation.pct_change_calculated_as')}{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono dark:bg-gray-800">
                ((end − start) / |start|) × 100
              </code>
              . {t('methodology.aggregation.pct_change_desc')}
            </li>
            <li className="list-disc">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {t('methodology.aggregation.trend_label')}:
              </span>{' '}
              {t('methodology.aggregation.trend_desc')}
            </li>
          </ul>
        </section>

        {/* Visualisation */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('methodology.visualisation.title')}
          </h2>
          <p className="mt-3">
            {t('methodology.visualisation.p1_prefix')}{' '}
            <a
              href="https://recharts.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
            >
              {t('methodology.visualisation.recharts_label')}
            </a>
            {t('methodology.visualisation.p1_suffix')}
          </p>
          <p className="mt-3">{t('methodology.visualisation.p2')}</p>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('methodology.limitations.title')}
          </h2>
          <ul className="mt-3 space-y-2 pl-5 text-sm">
            {limitationItems.map((item, i) => (
              <li key={i} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Disclaimer */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('methodology.disclaimer.title')}
          </h2>
          <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {t('methodology.disclaimer.body')}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
