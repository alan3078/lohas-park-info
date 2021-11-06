import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enTranslations from './translations/en'
import zhHkTranslations from './translations/zh-HK'

const EN = 'en'
const ZH_HK = 'zh-HK'

const defaultLanguage: string = EN

const resources = {
  [EN]: enTranslations,
  [ZH_HK]: zhHkTranslations
}

const languages = [ZH_HK, EN]
const namespaces = [...Object.keys(enTranslations)]

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: false,
    resources,
    ns: namespaces,
    supportedLngs: languages,
    fallbackLng: defaultLanguage,
    cleanCode: true,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export { languages }
export default i18n
