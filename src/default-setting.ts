import type { SystemSettingType } from '@/interface'

export const defaultSetting: SystemSettingType = {
  primaryColor: 'rgb(24,144,255)',
  filterType: 'light',
  showFormType: 'modal',
  showKeepAliveTab: false,
  title: 'cxagroup-ui',
  headerHeight: 80,
  slideWidth: 240,
  collapsedSlideWidth: 112,
  mobileMargin: 16,
  showWatermark: true,
  watermarkPos: 'content',
  languages: [
    {
      key: 'zn',
      name: '中文',
    },
    {
      key: 'en',
      name: '英文',
    },
  ],
  defaultLang: 'zh',
}
