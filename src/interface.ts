export interface SystemSettingType {
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
