import { useParams } from 'react-router-dom'

export function CountryOverviewPage() {
  const { country } = useParams<{ country: string }>()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {country}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Country climate data — coming soon.
      </p>
    </div>
  )
}
