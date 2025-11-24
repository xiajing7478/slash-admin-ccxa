import { useState, useRef, useEffect } from 'react'
import { Button, Input, type InputRef } from 'antd'
const Page1 = () => {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)
  const inputRef = useRef<InputRef>(null)
  const timeRef = useRef<NodeJS.Timeout>()

  // 使用 useState - 会触发重新渲染
  const increment = () => {
    setCount(pre => pre + 1)
  }

  // 使用useRef - 不会触发重新渲染
  const focusInput = () => {
    inputRef.current?.focus()
  }

  useEffect(() => {
    renderCount.current += 1
    console.log('组件渲染了', renderCount.current, '次')
  }, [])

  useEffect(() => {
    timeRef.current = setInterval(() => {
      console.log('定时器执行中...')
    }, 1000)
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current)
      }
    }
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <p>Renders: {renderCount.current}</p>
      <Button onClick={increment}>Increment</Button>
      <Input ref={inputRef} />
      <Button onClick={focusInput}>Focus Input</Button>
    </div>
  )
}

export default Page1
