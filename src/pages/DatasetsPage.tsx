import { useTranslation } from 'react-i18next'

export function DatasetsPage() {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t('datasets.title')}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {t('datasets.coming_soon')}
      </p>
    </div>
  )
}
