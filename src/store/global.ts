import { create } from 'zustand'
import { defaultSetting } from '@/default-setting'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

interface GlobalState {
  darkMode: boolean
  collapsed: boolean
  lang: 'zh' | 'en' | string
  token: string
  refreshToken: string
}

interface GlobalAction {
  // 设置方法
  setDarkMode: (darkMode: boolean) => void
  setCollapsed: (collapsed: boolean) => void
  setLang: (lang: GlobalState['lang']) => void
  setToken: (token: string) => void
  setRefreshToken: (refreshToken: string) => void

  // 获取方法
  getDarkMode: () => boolean
  getCollapsed: () => boolean
  getLang: () => GlobalState['lang']
  getToken: () => string
  getRefreshToken: () => string
}

type GlobalStore = GlobalState & GlobalAction

const useGlobalStore = create<GlobalStore>()(
  devtools(
    persist(
      (set, get) => ({
        // 状态
        darkMode: false,
        collapsed: false,
        lang: defaultSetting.defaultLang || 'zh',
        token: '',
        refreshToken: '',

        // 设置方法
        setDarkMode: (darkMode: boolean) => set({ darkMode }),
        setCollapsed: (collapsed: boolean) => set({ collapsed }),
        setLang: (lang: GlobalState['lang']) => set({ lang }),
        setToken: (token: string) => set({ token }),
        setRefreshToken: (refreshToken: string) => set({ refreshToken }),

        // 获取方法
        getDarkMode: () => get().darkMode,
        getCollapsed: () => get().collapsed,
        getLang: () => get().lang,
        getToken: () => get().token,
        getRefreshToken: () => get().refreshToken,
      }),
      {
        name: 'globalStore',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      name: 'globalStore',
    },
  ),
)

export default useGlobalStore
