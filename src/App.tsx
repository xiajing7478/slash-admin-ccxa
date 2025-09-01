import { lazy, useEffect, useState } from 'react'
import dayjs from 'dayjs'
// import { ConfigProvider, Spin } from 'antd'
// import { useGlobalStore } from '@/store/index'
// import zhCN from 'antd/locale/zh_CN'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { getUserMenu } from '@/service'
// import { RouterContextProvider } from './router-contxt'
import { RouterContextProvider } from '@/context/router-provider'
import 'antd/dist/reset.css'

dayjs.locale('zh-cn')

// const App: React.FC = () => {
//   const { primaryColor } = useGlobalStore()
//   return (
//     <ConfigProvider
//       locale={zhCN}
//       theme={{
//         token: {
//           colorPrimary: primaryColor,
//         },
//       }}
//     >
//       <Suspense fallback={<Spin size="large" className="app-loading" />}>
//         <BasicLayout />
//       </Suspense>
//     </ConfigProvider>
//   )
// }

// 动态导入组件
const modules: Record<string, () => Promise<{ default: React.ComponentType }>> = import.meta.glob('./pages/*/index.tsx')
console.log('modules...', modules)

// 创建组件映射
const componentMap: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {}
Object.keys(modules).forEach(path => {
  const componentName = path.replace('./pages/', '').replace('/index.tsx', '')
  // .replace(/^./, str => str.toUpperCase())
  componentMap[componentName] = lazy(modules[path])
})

console.log('componentMap...', componentMap)

const App: React.FC = () => {
  const [menus, setMenus] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [router, setRouter] = useState<any>(null)

  useEffect(() => {
    const initRouter = async () => {
      try {
        const adminMenus = (await getUserMenu()) as any[]
        setMenus(adminMenus)

        // 创建新的路由配置
        const routes = adminMenus
          .map((item: any) => {
            const LazyComponent = componentMap[item.component]
            if (!LazyComponent) {
              console.warn(`Component not found for path: ${item.component}`)
              return null
            }
            return {
              path: item.route,
              icon: item.icon,
              element: <LazyComponent />,
            }
          })
          .filter(Boolean)

        console.log('routes...', routes)

        // 创建路由器实例
        const newRouter = createBrowserRouter([
          {
            path: '/',
            Component: lazy(() => import('@/pages/Layout/index')),
            children: routes as any[],
          },
          {
            path: '*',
            element: <Navigate to="/dashboard" />,
          },
        ])
        setRouter(newRouter)
      } catch (error) {
        console.error('Failed to initialize router:', error)
      } finally {
        setLoading(false)
      }
    }

    initRouter()
  }, [])

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div className="App">
      <RouterContextProvider values={{ menus }}>
        <RouterProvider router={router} />
      </RouterContextProvider>
    </div>
  )
}

export default App
