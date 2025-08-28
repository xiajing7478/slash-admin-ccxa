import React, { Suspense, useState, useEffect } from 'react'
import { useNavigate, Outlet, useLocation, type RouteObject } from 'react-router-dom'
import { Layout, Menu, theme, Spin } from 'antd'
import { staticRoutes as routes } from '@/config/router'
import HeaderCom from '@/layout/components/Header'

const { Header, Content, Sider } = Layout

type RouteType = RouteObject & {
  title?: string
  icon?: React.ReactElement
}

interface MenuItem {
  key: string
  label?: string
  icon?: React.ReactElement
  children?: MenuItem[] | null
}

const BasicLayout: React.FC = () => {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [openKey, setOpenKey] = useState<string[]>([])
  const navigate = useNavigate()

  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  /**
   * 获取菜单项
   * @param children 路由配置
   * @returns
   */
  const getItems = (children: RouteType[]): MenuItem[] => {
    return children.map(item => ({
      key: item.index ? '/' : item.path?.startsWith('/') ? item.path : `/${item.path}`,
      label: item.title,
      icon: item.icon,
      children: item.children ? getItems(item.children) : null,
    }))
  }

  // 获取所有父级路径
  const getParentPaths = (path: string, routes: RouteType[]): string[] => {
    const result: string[] = []

    const findPath = (currentPath: string, currentRoutes: RouteType[], parentPath = ''): boolean => {
      for (const route of currentRoutes) {
        const routePath = route.path?.startsWith('/') ? route.path : `/${route.path}`
        const fullPath = parentPath + routePath

        if (fullPath === currentPath) {
          result.unshift(fullPath)
          return true
        }

        if (route.children && findPath(currentPath, route.children, fullPath)) {
          result.unshift(fullPath)
          return true
        }
      }

      return false
    }

    findPath(path, routes)
    return result
  }

  // 获取展开的菜单项
  const renderOpenKeys = (): string[] => {
    const pathParts = pathname.split('/').filter(Boolean)
    const result = pathParts.map((_, index) => `/${pathParts.slice(0, index + 1).join('/')}`)
    return result
  }

  // // 菜单展开/收起处理
  const onOpenChange = (keys: string[]) => {
    // 如果侧边栏已折叠，则不处理展开/收起
    if (collapsed) {
      return
    }

    // 获取最新的keys
    const latestOpenKey = keys.find(key => !openKey.includes(key))
    const latestCloseKey = openKey.find(key => !keys.includes(key))

    let nextOpenKeys = [...keys]

    // 如果有展开的菜单项
    if (latestOpenKey) {
      // 获取当前展开菜单项的所有父级路径
      const parentPaths = getParentPaths(latestOpenKey, routes[0]?.children?.[0]?.children || [])
      // 添加所有父级路径到展开列表
      nextOpenKeys = [...nextOpenKeys, ...parentPaths]
    }

    // 如果有收起的菜单项
    if (latestCloseKey) {
      // 获取当前收起菜单项的所有子路径
      const getChildrenPaths = (path: string, routes: RouteType[]): string[] => {
        const result: string[] = []

        const findChildren = (currentPath: string, currentRoutes: RouteType[], parentPath = '') => {
          for (const route of currentRoutes) {
            const routePath = route.path?.startsWith('/') ? route.path : `/${route.path}`
            const fullPath = parentPath + routePath

            if (fullPath.startsWith(currentPath) && fullPath !== currentPath) {
              result.push(fullPath)

              if (route.children) {
                findChildren(currentPath, route.children, fullPath)
              }
            }
          }
        }

        findChildren(path, routes)
        return result
      }

      // 获取所有子路径
      const childrenPaths = getChildrenPaths(latestCloseKey, routes[0]?.children?.[0]?.children || [])
      // 从展开列表中移除所有子路径
      nextOpenKeys = nextOpenKeys.filter(key => !childrenPaths.includes(key))
    }

    setOpenKey(nextOpenKeys)
  }

  // 监听路由变化，更新展开的菜单项
  useEffect(() => {
    if (!collapsed) {
      const openKeys = renderOpenKeys()
      setOpenKey(openKeys)
    }
  }, [pathname, collapsed])

  // 监听折叠状态变化
  useEffect(() => {
    if (collapsed) {
      // 折叠时清空展开的菜单项
      setOpenKey([])
    } else {
      // 展开时恢复当前路径的父级菜单项
      const openKeys = renderOpenKeys()
      setOpenKey(openKeys)
    }
  }, [collapsed])

  const handleChange = (value: boolean) => {
    setCollapsed(value)
  }

  const menuItems: any[] = getItems(routes[0]?.children?.[0]?.children?.filter(item => item.path !== '*') || [])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout>
      <Sider style={{ overflow: 'auto', height: '100vh' }} collapsible collapsed={collapsed} trigger={null}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={renderOpenKeys()}
          mode="inline"
          items={menuItems}
          onClick={onMenuClick}
          openKeys={openKey}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout className="site-layout123">
        <Header style={{ padding: '0 10px', background: colorBgContainer }}>
          <HeaderCom collapsed={collapsed} setCollapsed={handleChange} />
        </Header>

        <Content
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            padding: '24px',
            margin: '16px 0px 16px 16px',
            overflow: 'auto',
            height: 'calc(100vh - 64px - 24px - 16px)', // 减去 Header 和 Footer 的高度
          }}
        >
          <Suspense
            fallback={
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Spin size="large" tip="loading..." />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
