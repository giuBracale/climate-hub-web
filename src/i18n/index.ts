import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import it from './it.json'
import en from './en.json'
import es from './es.json'

i18n.on('languageChanged', (lng: string) => {
  if (lng.startsWith('it')) document.documentElement.lang = 'it'
  else if (lng.startsWith('es')) document.documentElement.lang = 'es'
  else document.documentElement.lang = 'en'
})

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: it },
      en: { translation: en },
      es: { translation: es },
    },
    supportedLngs: ['it', 'en', 'es'],
    nonExplicitSupportedLngs: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nLng',
    },
  })

export default i18n
