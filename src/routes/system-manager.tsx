import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const User = lazy(() => import('@/pages/User'))
const Department = lazy(() => import('@/pages/Department'))

const SystemManagerRoutes: RouteObject[] = [
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/department',
    element: <Department />,
  },
]

export default SystemManagerRoutes
