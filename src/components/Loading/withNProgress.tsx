import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

nprogress.configure({
  showSpinner: false,
  trickleSpeed: 300,
  minimum: 0.1,
})
const useNProgress = () => {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    // 当路由变化时启动进度条
    nprogress.start()

    // 使用 setTimeout 来模拟加载完成
    const timer = setTimeout(() => {
      nprogress.done()
    }, 300)

    return () => {
      clearTimeout(timer)
      nprogress.done()
    }
  }, [location, navigationType])
}

export const NProgressWrapper = ({ children }: { children: React.ReactNode }) => {
  useNProgress()
  return <>{children}</>
}
