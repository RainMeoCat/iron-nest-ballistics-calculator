import { createI18n } from 'vue-i18n'
import cs from './locales/cs'
import de from './locales/de'
import en from './locales/en'
import es from './locales/es'
import es419 from './locales/es-419'
import fr from './locales/fr'
import it from './locales/it'
import ja from './locales/ja'
import ko from './locales/ko'
import pl from './locales/pl'
import ptBR from './locales/pt-BR'
import ru from './locales/ru'
import tr from './locales/tr'
import uk from './locales/uk'
import zhCN from './locales/zh-CN'
import zhTW from './locales/zh-TW'

export interface LanguageOption {
  code: LocaleCode
  name: string
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español (España)' },
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'uk', name: 'Українська' },
  { code: 'ja', name: '日本語' },
  { code: 'ru', name: 'Русский' },
  { code: 'ko', name: '한국어' },
  { code: 'cs', name: 'Čeština' },
  { code: 'pl', name: 'Polski' },
  { code: 'it', name: 'Italiano' },
  { code: 'es-419', name: 'Español (Latinoamérica)' },
  { code: 'tr', name: 'Türkçe' },
]

const STORAGE_KEY = 'iron-nest-locale'

const messages = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  en,
  fr,
  de,
  es,
  'pt-BR': ptBR,
  uk,
  ja,
  ru,
  ko,
  cs,
  pl,
  it,
  'es-419': es419,
  tr,
}

export type LocaleCode = keyof typeof messages

function detectInitialLocale(): LocaleCode {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && saved in messages) return saved as LocaleCode
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectInitialLocale(),
  fallbackLocale: 'en',
  messages,
})

export function setLocale(code: LocaleCode) {
  i18n.global.locale.value = code
  localStorage.setItem(STORAGE_KEY, code)
}
