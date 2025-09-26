import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { defaultSetting } from '@/default-setting'

import en from '@/i18n/en.json'
import zh from '@/i18n/zh.json'

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
}

i18n
  .use(LanguageDetector) // 添加语言检测器
  .use(initReactI18next) // 将 i18n 传递给 react-i18next
  .init({
    resources,
    lng: defaultSetting.defaultLang || 'zh',
    fallbackLng: defaultSetting.defaultLang || 'zh',
    interpolation: {
      escapeValue: false,
    },
  })

export const t = (key: string) => {
  return i18n.t(key) || key
}

export { i18n }
