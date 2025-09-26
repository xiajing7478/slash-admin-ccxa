import Watermark from '@/components/basic/Watermark'
import useGlobalStore from '@/store/global'
import Header from './components/Header'
// import MessageHandle from './components/MessageHandle'
import Slide from './components/Slide'
import Content from './components/Content'
import SystemSetting from '@/layouts/common/SystemSetting'

const Layout = () => {
  const { lang } = useGlobalStore()

  // const { loading, disconnectWS } = useUserDetail()   todo

  console.log('import.meta.env.DEV....', import.meta.env.DEV)

  return (
    <Watermark type="full">
      <div key={lang} className="overflow-hidden">
        {/* <MessageHandle /> 消息处理 todo */}
        <Header />
        <Slide /> {/* 侧边栏 todo */}
        <Content /> {/* 内容区 todo */}
        {import.meta.env.DEV && <SystemSetting />}
      </div>
    </Watermark>
  )
}

export default Layout
