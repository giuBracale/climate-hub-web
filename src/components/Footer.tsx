import { Link } from 'react-router-dom'
import logoHorizontal from '../assets/branding/logo-horizontal.svg'

const platformLinks = [
  { label: 'Home', to: '/' },
  { label: 'Countries', to: '/countries' },
  { label: 'Datasets', to: '/datasets' },
  { label: 'About', to: '/about' },
]

const resourceLinks = [
  { label: 'Data Sources', href: '/#data-sources', external: false },
  { label: 'Methodology', to: '/methodology', external: false },
  { label: 'Privacy Policy', to: '/privacy', external: false },
  { label: 'GitHub ↗', href: 'https://github.com', external: true },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src={logoHorizontal}
              alt="Climate Hub"
              className="h-8 w-auto"
            />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              An independent platform for exploring decades of climate and
              economic data from publicly available international sources.
            </p>
            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              Built with React · TypeScript · Recharts · TanStack Query
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5">
              {platformLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-500 transition-colors hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map(({ label, to, href, external }) => (
                <li key={label}>
                  {to ? (
                    <Link
                      to={to}
                      className="text-sm text-gray-500 transition-colors hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400"
                    >
                      {label}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-gray-500 transition-colors hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400"
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-100 pt-6 dark:border-gray-800">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              &copy; {new Date().getFullYear()} Climate Hub. Public data, freely available.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Data: World Bank · Our World in Data · EEA · Global Carbon Project
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
