import { lazy, Suspense } from 'react'
import dayjs from 'dayjs'
import { ConfigProvider, Spin } from 'antd'
import { useGlobalStore } from '@/store/index'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'

dayjs.locale('zh-cn')

const BasicLayout = lazy(() => import('@/layout/index'))

const App: React.FC = () => {
  const { primaryColor } = useGlobalStore()
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      <Suspense fallback={<Spin size="large" className="app-loading" />}>
        <BasicLayout />
      </Suspense>
    </ConfigProvider>
  )
}

export default App
