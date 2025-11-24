import { create } from 'zustand'
import { defaultSetting } from '@/default-setting'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

interface GlobalState {
  darkMode: boolean
  collapsed: boolean
  lang: 'zh' | 'en' | string
}

interface GlobalAction {
  // 设置方法
  setDarkMode: (darkMode: boolean) => void
  setCollapsed: (collapsed: boolean) => void
  setLang: (lang: GlobalState['lang']) => void

  // 获取方法
  getDarkMode: () => boolean
  getCollapsed: () => boolean
  getLang: () => GlobalState['lang']
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

        // 设置方法
        setDarkMode: (darkMode: boolean) => set({ darkMode }),
        setCollapsed: (collapsed: boolean) => set({ collapsed }),
        setLang: (lang: GlobalState['lang']) => set({ lang }),

        // 获取方法
        getDarkMode: () => get().darkMode,
        getCollapsed: () => get().collapsed,
        getLang: () => get().lang,
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
