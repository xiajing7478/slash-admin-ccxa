import { defaultSetting } from '@/default-setting'
import { useResponsive, useUpdateEffect } from 'ahooks'
import useGlobalStore from '@/store/global'
import SlideMenu from '@/layouts/components/SlideMenu'

const Slide = () => {
  const { pc } = useResponsive()
  const { collapsed, setCollapsed } = useGlobalStore()
  // console.log('lg, pc...', lg, pc)

  useUpdateEffect(() => {
    setCollapsed(pc ? false : true)
  }, [pc])

  return (
    <div
      style={{ width: collapsed ? defaultSetting.collapsedSlideWidth : defaultSetting.slideWidth }}
      className="menu-slide bg-transparent transition-all top-header fixed box-border left-0 bottom-0 overflow-y-auto px-[16px] max-md:hidden"
    >
      <SlideMenu />
    </div>
  )
}

export default Slide
