import { useEffect, useRef } from 'react'
import CommonDialog from '@/components/basic/Dialog'
import SubmitForm from '@/components/Business/SubmitForm'
import { type FieldsProps, type SubmitFormRef } from '@/components/Business/SubmitForm/type'

interface AddPlanProps {
  visible: boolean
  onCancel: () => void
  onOk: () => void
}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
}

const AddPlan: React.FC<AddPlanProps> = ({ visible, onCancel, onOk }) => {
  const formRef = useRef<SubmitFormRef>(null)

  const fields: FieldsProps[] = [
    {
      label: '用户名',
      name: 'username',
      rules: [{ required: true, message: '请输入用户名' }],
    },
    {
      label: '年龄',
      name: 'age',
      rules: [{ required: true, message: '请输入年龄' }],
    },
  ]

  const onConfirm = async () => {
    try {
      // 调用表单验证
      const values = await formRef.current?.validateFields()
      console.log('表单验证通过，表单值：', values)

      // 验证通过后执行回调，传入表单值
      // 如果需要将表单值传递给父组件，可以修改 onOk 的类型为 (values: any) => void
      onOk()
    } catch (error) {
      console.log('表单验证失败：', error)
      // 验证失败时不执行回调
    }
  }

  useEffect(() => {
    // formRef.current?
    console.log('formRef', formRef)
    console.log('formRef.current', formRef.current)
    formRef.current?.form.setFieldsValue({ username: 'admin', age: 18 })
  }, [])

  return (
    <CommonDialog title="新增计划" visible={visible} onCancel={onCancel} onOk={onConfirm}>
      <SubmitForm ref={formRef} formItemLayout={formItemLayout} fields={fields} btnActions={[]} />
      {/* <SubmitForm fields={fields} btnActions={[]} onSubSubmit={setChildMethod} /> */}
    </CommonDialog>
  )
}

export default AddPlan
