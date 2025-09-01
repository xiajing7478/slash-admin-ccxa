import { useEffect } from 'react'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

nprogress.configure({
  showSpinner: false, // 不显示加载图标
  minimum: 0.1, // 最小百分比
  easing: 'ease', // 动画效果
  speed: 500, // 速度
  trickleSpeed: 300, // 滴流速度
})

const Loading = () => {
  useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  }, [])

  return null
}

export default Loading
