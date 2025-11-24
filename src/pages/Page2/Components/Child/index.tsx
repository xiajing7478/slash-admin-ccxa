import { Button } from 'antd'
import { memo } from 'react'
interface ChildProps {
  name: string
  onClick?: (name: string) => void
}
const Child: React.FC<ChildProps> = ({ name, onClick }) => {
  console.log('子组件?')

  const setHandle = () => {
    // onClick?.(`我是子组件改变的name${Date.now()}`)
    onClick?.(`我是子组件改变的name`)
  }
  return (
    <>
      <div>我是一个子组件，父级传过来的数据：{name}</div>
      <Button onClick={setHandle}>改变name</Button>
      <h1>hello world....</h1>
    </>
  )
}

export default memo(Child)
