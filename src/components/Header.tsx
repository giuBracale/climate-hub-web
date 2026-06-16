import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/countries', label: 'Countries' },
  { to: '/datasets', label: 'Datasets' },
  { to: '/about', label: 'About' },
]

export function Header() {
  return (
    <header className="border-b border-sky-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-sky-700 dark:text-sky-400"
        >
          🌍 Climate Hub
        </Link>
        <nav aria-label="Main navigation" className="flex gap-1">
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
      </div>
    </header>
  )
}
