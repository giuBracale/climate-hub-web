import { useTranslation } from 'react-i18next'

export function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 dark:text-sky-400">
          {t('privacy.badge')}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
          {t('privacy.title')}
        </h1>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          {t('privacy.updated')}
        </p>
      </div>

      <div className="space-y-10 text-base leading-relaxed text-gray-600 dark:text-gray-400">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('privacy.overview.title')}
          </h2>
          <p className="mt-3">{t('privacy.overview.body')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('privacy.no_account.title')}
          </h2>
          <p className="mt-3">{t('privacy.no_account.body')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('privacy.no_data.title')}
          </h2>
          <p className="mt-3">{t('privacy.no_data.p1')}</p>
          <p className="mt-3">{t('privacy.no_data.p2')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('privacy.no_ads.title')}
          </h2>
          <p className="mt-3">{t('privacy.no_ads.body')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('privacy.cookies.title')}
          </h2>
          <p className="mt-3">{t('privacy.cookies.body')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('privacy.external_links.title')}
          </h2>
          <p className="mt-3">{t('privacy.external_links.body')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('privacy.analytics.title')}
          </h2>
          <p className="mt-3">{t('privacy.analytics.body')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('privacy.contact.title')}
          </h2>
          <p className="mt-3">
            {t('privacy.contact.body_prefix')}{' '}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
            >
              {t('privacy.contact.github_label')}
            </a>
            {t('privacy.contact.body_suffix')}
          </p>
        </section>

      </div>
    </div>
  )
}
