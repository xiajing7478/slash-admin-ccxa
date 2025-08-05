import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import type { JSX } from 'react/jsx-runtime'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Login = lazy(() => import('@/pages/Login'))
const About = lazy(() => import('@/pages/About'))

/**
 *  Navigate 确保Router上下文存在
 */

// 登录校验组件
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isLogin = localStorage.getItem('isLogin') === 'true'
  if (!isLogin) {
    return <Navigate to="/login" replace />
  }
  return children
}

const RouterIndex = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>加载中...</div>}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default RouterIndex
