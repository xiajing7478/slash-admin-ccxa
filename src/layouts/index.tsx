import { useEffect, useCallback } from 'react'
import Watermark from '@/components/basic/Watermark'
import useGlobalStore from '@/store/global'
import useAuthStore from '@/store/authStore'
import Header from './components/Header'
// import MessageHandle from './components/MessageHandle'
import Slide from './components/Slide'
import Content from './components/Content'
// import SystemSetting from '@/layouts/common/SystemSetting'
import { getUserInfo, getMenu } from '@/api/login'
import { getResponseCode } from '@/utils'

const Layout = () => {
  const { lang } = useGlobalStore()
  const { setUserInfo, setDynamicMenu, setPermissions } = useAuthStore()
  // const { loading, disconnectWS } = useUserDetail()   todo
  // 如果没有token，则跳转到登录页面
  const token = useAuthStore(state => state.token)

  // 获取菜单
  const fetchMenu = useCallback(async () => {
    const { code, data } = await getMenu()
    // console.log('menu...', data)
    if (getResponseCode(code)) {
      setDynamicMenu(data)
    }
  }, [setDynamicMenu])

  // 获取用户信息
  const fetchUserInfo = useCallback(async () => {
    const { code, data } = await getUserInfo()
    if (getResponseCode(code)) {
      setUserInfo(data?.sysUser)
      setPermissions(data?.permissions)
    }
  }, [setUserInfo, setPermissions])

  // 根据token获取用户信息 & 菜单
  useEffect(() => {
    if (token) {
      fetchUserInfo()
      fetchMenu()
    }
  }, [fetchMenu, fetchUserInfo, token])

  if (!token) {
    console.log('no token, redirect to login')
    window.location.href = '/login'
    return null
  }

  return (
    <Watermark type="full">
      <div key={lang} className="overflow-hidden">
        {/* <MessageHandle /> 消息处理 todo */}
        <Header />
        <Slide /> {/* 侧边栏 todo */}
        <Content /> {/* 内容区 todo */}
        {/* {import.meta.env.DEV && <SystemSetting />} */}
      </div>
    </Watermark>
  )
}

export default Layout
