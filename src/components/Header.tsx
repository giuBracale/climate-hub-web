import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/countries', label: 'Countries' },
  { to: '/datasets', label: 'Datasets' },
  { to: '/about', label: 'About' },
]

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          Climate Hub
        </Link>
        <nav className="flex gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-sm font-medium text-blue-600 dark:text-blue-400'
                  : 'text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
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
