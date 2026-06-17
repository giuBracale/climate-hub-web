import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

const LANGUAGES = ['it', 'en'] as const
type Lang = (typeof LANGUAGES)[number]

const LANG_LABELS: Record<Lang, string> = {
  it: 'Italiano',
  en: 'English',
}

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current: Lang = i18n.language?.startsWith('it') ? 'it' : 'en'

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="ml-2 flex items-center rounded-md border border-gray-200 p-0.5 dark:border-gray-700"
    >
      {LANGUAGES.map((lang, idx) => (
        <Fragment key={lang}>
          {idx > 0 && (
            <span
              aria-hidden="true"
              className="select-none text-xs text-gray-300 dark:text-gray-600"
            >
              |
            </span>
          )}
          <button
            onClick={() => i18n.changeLanguage(lang)}
            aria-label={LANG_LABELS[lang]}
            aria-pressed={current === lang}
            className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
              current === lang
                ? 'bg-sky-600 text-white'
                : 'text-gray-500 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
