import { useEffect, useState } from 'react'
import { App as AntdApp, ConfigProvider, type ThemeConfig } from 'antd'
import { generateDarkTheme } from '@/theme/dark'
import { generateLightTheme } from '@/theme/light'
import useGlobalStore from '@/store/global'
import useSettingStore from '@/store/setting'

import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import { i18n } from '@/i18n'
import { configResponsive } from 'ahooks'
import NProgress from 'nprogress'

import RootRouterProvider from '@/router/provider'

configResponsive({
  // pc: 992,
  // mobile: 576,
  // tablet: 768,
  md: 768,
  lg: 1024,
})

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  trickleSpeed: 200,
  parent: '#root',
})

const App: React.FC = () => {
  const { darkMode, lang } = useGlobalStore()
  const { primaryColor } = useSettingStore()
  console.log('App.tsx...', darkMode, lang, primaryColor)

  const [theme, setTheme] = useState<ThemeConfig>(() => {
    return darkMode ? generateDarkTheme('') : generateLightTheme('')
  })

  const applyTheme = (darkMode: boolean, primaryColor: string) => {
    const theme = darkMode ? generateDarkTheme(primaryColor) : generateLightTheme(primaryColor)
    const themeMode = darkMode ? 'dark' : 'light'
    document.body.classList.remove(darkMode ? 'light' : 'dark')
    document.body.classList.add(themeMode)
    document.body.style.backgroundColor = theme.token?.colorBgLayout || ''
    setTheme(theme)
    setTimeout(() => {
      document.body.style.transition = 'all 0.5s ease-in-out'
    }, 300)
  }

  useEffect(() => {
    applyTheme(darkMode, primaryColor)
  }, [darkMode, primaryColor])

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  return (
    <ConfigProvider theme={theme} locale={lang === 'zh' ? zhCN : enUS} componentSize="middle">
      <AntdApp>
        <RootRouterProvider />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
