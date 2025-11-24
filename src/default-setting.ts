interface SystemSettingType {
  title: string
  headerHeight: number
  slideWidth: number
  collapsedSlideWidth: number
  mobileMargin: number
  showKeepAliveTab: boolean
  primaryColor: string
  filterType: 'light' | 'query'
  showFormType: 'modal' | 'drawer'
  showWatermark: boolean
  watermarkPos: 'full' | 'content'
  languages: {
    key: string
    name: string
  }[]
  defaultLang: string
}

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
