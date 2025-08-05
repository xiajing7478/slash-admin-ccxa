import { useState, Suspense, useEffect } from 'react'
import { Layout, Menu, Button, theme } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons'
import { useNavigate, BrowserRouter, useRoutes, useLocation, Navigate, Link } from 'react-router-dom'
import menuItems from './menus'
import routers from '@/routes'
import React from 'react'
import useUserInfoStore from '@/store/userInfo'
import type { MenuItemType } from 'antd/es/menu/interface'

const { Header, Content, Footer, Sider } = Layout

const AppRoutes = () => {
  return useRoutes(routers)
}

interface AppProps {
  collapsed?: boolean
  handleLogout?: () => void
}

interface MenuItem {
  key: string
  label: string
  path?: string
  children?: MenuItem[]
  icon?: any
  id?: string | number
  parentId?: number
}

const AppContent: React.FC<AppProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [allMenus, setAllMenus] = useState<MenuItem[]>([])
  const [selectKey, setSelectKey] = useState<string[]>(['1'])
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const getMenus = useUserInfoStore(state => state.getMenus)
  // const daynicMenus = useUserInfoStore(state => state.menus) || []
  // console.log('getMenusgetMenus', daynicMenus)

  // const menus = menuItems.concat(daynicMenus)
  // console.log('menus', menuItems)
  // console.log('daynicMenus', daynicMenus)

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/login', { replace: true })
  }

  const isLogin = localStorage.getItem('access_token')
  const isLoginPage = location.pathname === '/login'
  useEffect(() => {
    if (isLogin) {
      initMenus()
    }
  }, [isLogin])
  const initMenus = async () => {
    const daynicMenu = await getMenus()
    setAllMenus(menuItems.concat(daynicMenu))
  }

  useEffect(() => {
    allMenus.forEach((item: MenuItem) => {
      if (item.path === location.pathname) {
        setSelectKey([item.key])
      }
    })
  }, [location.pathname, allMenus])

  if (!isLogin && !isLoginPage) {
    return <Navigate to="/login" replace />
  }

  // 递归生成菜单项
  const renderMenuItems = (items: MenuItem[]): MenuItemType[] =>
    items.map((item: MenuItem) => {
      return {
        key: item.key,
        label: item.path ? <Link to={item.path}>{item.label}</Link> : item.label,
        icon: item.icon ? React.createElement(item.icon) : null,
        children: item.children ? renderMenuItems(item.children) : null,
      }
    })

  return isLoginPage ? (
    <AppRoutes />
  ) : (
    <Suspense fallback={<div>加载中...</div>}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} theme="dark" collapsible collapsed={collapsed}>
          <div style={{ color: '#fff', textAlign: 'center', padding: '16px' }}>React Admin</div>
          {/* <div className="demo-logo-vertical" /> */}
          <Menu
            theme="dark"
            mode="inline"
            style={{
              overflowY: 'auto',
              height: '100vh',
              // height: 'calc(100vh)',
            }}
            defaultSelectedKeys={selectKey}
            selectedKeys={selectKey}
            items={renderMenuItems(allMenus)}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              padding: '0 16px',
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: '64px', height: '64px' }}
            />
            <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
              退出登录
            </Button>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <AppRoutes />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Suspense>
  )
}
const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  )
}

export default App
