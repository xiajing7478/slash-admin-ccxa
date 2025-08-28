import { lazy, type JSX, type ReactNode } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import {
  DashboardOutlined,
  TableOutlined,
  UserOutlined,
  ApartmentOutlined,
  AccountBookOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { authTokenLoader } from '@/utils/auth'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Login = lazy(() => import('@/pages/Login'))
const Department = lazy(() => import('@/pages/Department'))
const User = lazy(() => import('@/pages/User'))
const App = lazy(() => import('@/App'))
const UserList = lazy(() => import('@/pages/UserList'))
const Order = lazy(() => import('@/pages/Order'))
const OrderDetail = lazy(() => import('@/pages/OrderDetail'))
const MenuData = lazy(() => import('@/pages/MenuData'))

// 使用类型交叉来扩展 RouteObject
export type CustomRouteObject = RouteObject & {
  title?: string
  icon?: JSX.Element | ReactNode
  redirect?: string
  element?: JSX.Element | ReactNode | string | any
  children?: CustomRouteObject[]
}

const lazyLoad = (name: string) => {
  return lazy(() => import(`@/pages/${name}`))
}

// 获取动态路由的函数
const getDynamicRoutes = () => {
  return [
    {
      path: 'order',
      title: '订单管理',
      icon: <HomeOutlined />,
      children: [
        {
          path: 'order-list',
          title: '订单列表',
          element: <Order />,
          icon: <UserOutlined />,
        },
        {
          path: 'order-detail/:id',
          title: '订单详情',
          element: <OrderDetail />,
          icon: <TableOutlined />,
        },
      ],
    },
  ]
}

const staticRoutes: CustomRouteObject[] = [
  {
    path: '/',
    loader: authTokenLoader,
    element: <App />,
    children: [
      {
        errorElement: <div>404</div>,
        children: [
          {
            index: true,
            title: '首页',
            icon: <DashboardOutlined />,
            element: <Dashboard />,
          },
          {
            path: 'user-list',
            title: '用户列表',
            icon: <AccountBookOutlined />,
            element: <UserList />,
          },
          {
            path: 'menu-data',
            title: '菜单路由',
            icon: <SettingOutlined />,
            element: <MenuData />,
          },
          {
            path: 'system',
            title: '系统管理',
            icon: <ApartmentOutlined />, // 父菜单图标
            children: [
              { title: '用户管理', path: '/system/user', element: <User />, icon: <UserOutlined /> },
              { title: '部门管理', path: '/system/department', element: <Department />, icon: <TableOutlined /> },
              { title: '部门管理1', path: '/system/department-list', element: <Order />, icon: <UserOutlined /> },
            ],
          },
          {
            path: 'order',
            title: '订单管理',
            icon: <HomeOutlined />,
            children: [
              {
                path: '/order/order-list',
                title: '订单列表',
                element: lazyLoad('Order') as any,
                icon: <UserOutlined />,
              },
              {
                path: '/order/order-detail',
                title: '订单详情',
                element: <OrderDetail />,
                icon: <TableOutlined />,
              },
              { title: '部门管理12', path: '/order/department-list', element: <Order />, icon: <UserOutlined /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]

export { staticRoutes, getDynamicRoutes }

const router = createBrowserRouter(staticRoutes)
export default router
