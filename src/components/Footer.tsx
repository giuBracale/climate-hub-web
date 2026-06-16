export function Footer() {
  return (
    <footer className="mt-auto border-t border-sky-100 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-base font-bold text-sky-700 dark:text-sky-400">
            🌍 Climate Hub
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Explore climate and economic indicators across countries.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built with React · TypeScript · TanStack Query · Recharts
          </p>
          <p className="mt-1 text-xs text-gray-300 dark:text-gray-600">
            &copy; {new Date().getFullYear()} Climate Hub
          </p>
        </div>
      </div>
    </footer>
  )
}
