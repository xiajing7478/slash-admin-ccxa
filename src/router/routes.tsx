import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'

const Login = lazy(() => import('@/pages/Login'))
const Layout = lazy(() => import('@/layouts'))
const ErrorPage = lazy(() => import('@/components/basic/Exception/500'))
const About = lazy(() => import('@/pages/About'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const NotFound = lazy(() => import('@/components/basic/Exception/404'))
const Page1 = lazy(() => import('@/pages/Page1'))
const Page2 = lazy(() => import('@/pages/Page2'))
const Page3 = lazy(() => import('@/pages/Page3'))

const AdminLog = lazy(() => import('@/pages/admin/Log'))
const AdminDict = lazy(() => import('@/pages/admin/Dict'))

const OrderManagerOrderList = lazy(() => import('@/pages/OrderManager/OrderList'))
const OrderManagerCustomerReple = lazy(() => import('@/pages/OrderManager/CustomerReple'))

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'page1',
        element: <Page1 />,
      },
      {
        path: 'page2',
        element: <Page2 />,
      },
      {
        path: 'page3',
        element: <Page3 />,
      },
      {
        path: 'admin',
        children: [
          { path: 'log', element: <AdminLog /> },
          {
            path: 'dict',
            element: <AdminDict />,
          },
        ],
      },
      {
        path: 'orderManager',
        children: [
          { path: 'orderList', element: <OrderManagerOrderList /> },
          { path: 'customerReple', element: <OrderManagerCustomerReple /> },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]
