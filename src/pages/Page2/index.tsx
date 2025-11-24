import { useState, useCallback } from 'react'
import { Button } from 'antd'
import Child from './Components/Child'

// 参考 https://juejin.cn/post/7039256825656524807?searchId=20251117151758303C08CA87B9C9675950
const Page2 = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Child组件')

  const increment = () => {
    setCount(pre => pre + 1)
  }

  const getHandle = useCallback((name: string) => {
    setName(name)
  }, [])

  // const getHandle = (name: string) => {
  //   setName(name)
  // }

  return (
    <>
      <Button onClick={increment}>Count: {count}</Button>
      <p>count:{count}</p>
      <Child name={name} onClick={getHandle} />
      {/* <Child name={name} onClick={getHandle} /> */}
    </>
  )
}

export default Page2
