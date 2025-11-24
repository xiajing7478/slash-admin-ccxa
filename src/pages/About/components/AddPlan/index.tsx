import { Button } from 'antd'
import { forwardRef, useImperativeHandle } from 'react'
// const AddPlan: React.FC<any> = forwardRef(() => {
//   const onClick = () => {
//     // TODO: 添加计划
//     console.log('添加计划')
//   }
//   return (
//     <div className="flex flex-col items-center justify-center">
//       <Button type="primary" size="large" onClick={onClick}>
//         测试
//       </Button>
//     </div>
//   )
// }

interface AddPlanProps {
  source?: number
}
export interface AddPlanRef {
  addPlan: () => void
}

type Props = AddPlanProps & React.RefAttributes<AddPlanRef>

const AddPlan: React.FC<Props> = forwardRef(({ source }, ref) => {
  useImperativeHandle(ref, () => ({
    addPlan: () => {
      console.log('添加计划...')
    },
  }))

  const addPlan = () => {
    console.log('添加计划123...')
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <Button type="primary" size="large" onClick={addPlan}>
        测试{source}
      </Button>
    </div>
  )
})

export default AddPlan
