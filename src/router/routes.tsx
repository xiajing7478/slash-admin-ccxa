import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'

const Login = lazy(() => import('@/pages/Login'))
const Layout = lazy(() => import('@/layouts'))
const ErrorPage = lazy(() => import('@/components/basic/Exception/500'))
const About = lazy(() => import('@/pages/About'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const NotFound = lazy(() => import('@/components/basic/Exception/404'))

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
        path: '*',
        element: <NotFound />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]
