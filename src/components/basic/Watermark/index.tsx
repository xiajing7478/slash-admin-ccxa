import useSettingStore from '@/store/setting'
import { Watermark as AntdWatermark } from 'antd'
import { type ReactNode } from 'react'

// import { useUserStore } from '@/stores/user'  // todo

interface WatermarkProps {
  children: ReactNode
  type: 'full' | 'content'
}

const Watermark = ({ children, type }: WatermarkProps) => {
  const { watermarkPos, showWatermark } = useSettingStore()
  return (
    <AntdWatermark height={!showWatermark || watermarkPos !== type ? 0 : undefined} content="Ant Design">
      {children}
    </AntdWatermark>
  )
}

export default Watermark
