import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoHorizontal from '../assets/branding/logo-horizontal.svg'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/countries', label: t('nav.countries') },
    { to: '/datasets', label: t('nav.datasets') },
    { to: '/about', label: t('nav.about') },
  ]

  return (
    <header className="border-b border-sky-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          aria-label={t('header.home_link_label')}
          className="flex items-center"
        >
          <img
            src={logoHorizontal}
            alt={t('header.logo_alt')}
            className="h-9 w-auto"
          />
        </Link>
        <div className="flex items-center">
          <nav aria-label={t('nav.aria_label')} className="flex gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-md px-3 py-2 text-sm font-semibold text-sky-600 dark:text-sky-400'
                    : 'rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-sky-50 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400'
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
