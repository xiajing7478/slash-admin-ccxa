import { defaultSetting } from '@/default-setting'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface SettingState {
  primaryColor: string
  showKeepAliveTab: boolean
  filterType: 'light' | 'query'
  showFormType: 'drawer' | 'modal'
  showWatermark: boolean
  watermarkPos: 'full' | 'content'
}

interface SettingAction {
  setPrimaryColor: (primaryColor: string) => void
  getPrimaryColor: () => string
  setShowKeepAliveTab: (collapsed: SettingState['showKeepAliveTab']) => void
  setFilterType: (type: SettingState['filterType']) => void
  setShowFormType: (type: SettingState['showFormType']) => void
  setShowWatermark: (showWatermark: SettingState['showWatermark']) => void
  setWatermarkPos: (pos: SettingState['watermarkPos']) => void
  reset: () => void
}

type SettingStore = SettingState & SettingAction

const useSettingStore = create<SettingStore>()(
  devtools(
    persist(
      (set, get) => {
        return {
          primaryColor: defaultSetting.primaryColor,
          setPrimaryColor: (primaryColor: string) => set({ primaryColor }),
          getPrimaryColor: () => get().primaryColor,
          showKeepAliveTab: defaultSetting.showKeepAliveTab,
          setShowKeepAliveTab: collapsed => set({ showKeepAliveTab: collapsed }),
          filterType: defaultSetting.filterType,
          setFilterType: type => set({ filterType: type }),
          showFormType: defaultSetting.showFormType,
          setShowFormType: type => set({ showFormType: type }),
          showWatermark: defaultSetting.showWatermark,
          setShowWatermark: showWatermark => set({ showWatermark }),
          watermarkPos: defaultSetting.watermarkPos,
          setWatermarkPos: pos => set({ watermarkPos: pos }),
          reset: () => {
            set({
              primaryColor: defaultSetting.primaryColor,
              showKeepAliveTab: defaultSetting.showKeepAliveTab,
              filterType: defaultSetting.filterType,
              showFormType: defaultSetting.showFormType,
            })
          },
        }
      },
      {
        name: 'settingStore',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'settingStore' },
  ),
)

export default useSettingStore
