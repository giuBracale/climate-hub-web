import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { HomePage } from '../pages/HomePage'
import { CountriesPage } from '../pages/CountriesPage'
import { CountryOverviewPage } from '../pages/CountryOverviewPage'
import { DatasetsPage } from '../pages/DatasetsPage'
import { AboutPage } from '../pages/AboutPage'
import { PrivacyPage } from '../pages/PrivacyPage'
import { MethodologyPage } from '../pages/MethodologyPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ErrorPage } from '../pages/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'countries', element: <CountriesPage /> },
      { path: 'countries/:country', element: <CountryOverviewPage /> },
      { path: 'datasets', element: <DatasetsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'methodology', element: <MethodologyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
