import { redirect } from 'react-router-dom'

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken') || null
}

export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token)
}

export const clearAuthToken = () => {
  localStorage.removeItem('authToken')
}

export const isAuthenticated = (): boolean => {
  return !!getAuthToken()
}

export const authTokenLoader = () => {
  console.log('authTokenLoader called...', !isAuthenticated())
  if (!isAuthenticated()) {
    // 如果没有认证，重定向到登录页面
    const curPath = window.location.pathname
    const redirectUrl = `/login?redirect=${encodeURIComponent(curPath)}`
    return redirect(redirectUrl)
  }
  return null
}
