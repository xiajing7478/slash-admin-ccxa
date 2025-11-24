import { Outlet } from 'react-router-dom'
import { defaultSetting } from '@/default-setting'
import useGlobalStore from '@/store/global'
import useSettingStore from '@/store/setting'
import { Suspense } from 'react'
import Watermark from '@/components/basic/Watermark'
import TabsLayout from '@/layouts/common/TabsLayout'

const Content = () => {
  const { collapsed } = useGlobalStore()
  const { showKeepAliveTab } = useSettingStore()
  const isPC = true
  const marginLeft = isPC ? (collapsed ? defaultSetting.collapsedSlideWidth : defaultSetting.slideWidth) : defaultSetting.mobileMargin
  return (
    <div
      className="transition-all mt-header bg-[var(--ant-color-bg-container)]  rounded-lg"
      style={{
        marginLeft,
        minHeight: `calc(100vh - ${defaultSetting.headerHeight}px)`,
        width: `calc(100vw - ${isPC ? (collapsed ? defaultSetting.collapsedSlideWidth : defaultSetting.slideWidth) : defaultSetting.mobileMargin * 2}px)`,
      }}
    >
      <div className="m-0 rounded-md z-1 p-[10px]">
        <Suspense fallback={<div>loading....</div>}>
          {showKeepAliveTab ? (
            <TabsLayout />
          ) : (
            <Watermark type="content">
              <Outlet />
            </Watermark>
          )}
        </Suspense>
      </div>
    </div>
  )
}
export default Content
