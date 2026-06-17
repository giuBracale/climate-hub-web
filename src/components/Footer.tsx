import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoHorizontal from '../assets/branding/logo-horizontal.svg'

export function Footer() {
  const { t } = useTranslation()

  const platformLinks = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.countries'), to: '/countries' },
    { label: t('nav.datasets'), to: '/datasets' },
    { label: t('nav.about'), to: '/about' },
  ]

  const resourceLinks = [
    { label: t('footer.links.data_sources'), to: null, href: '/#data-sources', external: false },
    { label: t('footer.links.methodology'), to: '/methodology', href: null, external: false },
    { label: t('footer.links.privacy'), to: '/privacy', href: null, external: false },
    { label: t('footer.links.github'), to: null, href: 'https://github.com', external: true },
  ]

  return (
    <footer className="mt-auto border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src={logoHorizontal}
              alt={t('header.logo_alt')}
              className="h-8 w-auto"
            />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {t('footer.tagline')}
            </p>
            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              {t('footer.tech_stack')}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {t('footer.platform_heading')}
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
              {t('footer.resources_heading')}
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
                      href={href ?? '#'}
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
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {t('footer.data_credits')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
