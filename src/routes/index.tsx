import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import SystemManagerRoutes from './system-manager' // 系统管理路由
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Login = lazy(() => import('@/pages/Login'))
const About = lazy(() => import('@/pages/About'))
const Home = lazy(() => import('@/pages/Home'))

const Routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />, // 默认跳转到仪表盘
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  ...SystemManagerRoutes, // 系统管理路由
  {
    path: '*', // 通配符路由，匹配所有未定义的路径
    element: <div>404 - 页面未找到</div>,
  },
]

export default Routes
