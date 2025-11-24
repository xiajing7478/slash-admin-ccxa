import React, { useCallback } from 'react'
import { Modal, Rate } from 'antd'
import SubmitForm from '@/components/Business/SubmitForm'
import { type FieldsProps, type BtnActionProps } from '@/components/Business/SubmitForm/type'
import useOrderListData from '../../useOrderListData'
interface AddUserProps {
  open: boolean
  onOk?: () => void
  onCancel?: () => void
  centered?: boolean
  title: string
  okText?: string
  cancelText?: string
  footer?: React.ReactNode
}
const AddUser: React.FC<AddUserProps> = ({ open, onOk, onCancel, centered = false, okText = '确认', cancelText = '取消', title = 'Add User' }) => {
  // const onCreate = (values: any) => {
  //   console.log('Received values of form: ', values)
  //   // Here you can handle the form submission, e.g., send data to the server
  //   onOk?.()
  // }

  const { companyList, planList, getPlanList, setPlanList } = useOrderListData()

  const handleCompanyChange = async (tenantId: string, form: any) => {
    form.setFieldValue('planBid', undefined) // 重置所属计划字段的值
    setPlanList([]) // 清空所属计划选项
    if (tenantId) {
      await getPlanList(tenantId)
    }
  }

  // form 布局
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  }

  const fields: FieldsProps[] = [
    {
      label: '所属公司',
      name: 'tenantId',
      type: 'select',
      options: companyList,
      rules: [{ required: true, message: '请选择所属公司' }],
      onChange: handleCompanyChange,
    },
    {
      name: 'planBid',
      label: '所属计划',
      type: 'select',
      options: planList,
      rules: [{ required: true, message: '请选择所属计划' }],
    },
    {
      label: '评分',
      name: 'score',
      render: (value, onChange) => <Rate allowHalf value={value || 0} onChange={onChange} />,
    },
    {
      label: '用户名',
      name: 'username',
      type: 'input',
      required: false,
    },
    {
      label: '婚姻状况',
      name: 'maritalStatus',
      type: 'select',
      options: [
        { label: '单身', value: 'single' },
        { label: '已婚', value: 'married' },
        { label: '离异', value: 'divorced' },
      ],
      rules: [{ required: true, message: '请选择婚姻状况' }],
    },
    {
      label: '家庭关系',
      name: 'familyRelationship',
      type: 'radio',
      options: [
        { label: '父母', value: 'parent' },
        { label: '配偶', value: 'spouse' },
        { label: '子女', value: 'child' },
      ],
      rules: [{ required: true, message: '请选择家庭关系' }],
    },
    {
      label: '爱好',
      name: 'hobby',
      type: 'checkbox',
      options: [
        { label: '阅读', value: 'reading' },
        { label: '旅行', value: 'traveling' },
        { label: '运动', value: 'sports' },
        { label: '音乐', value: 'music' },
      ],
      rules: [{ required: true, message: '请选择爱好' }],
    },
    {
      label: '开关',
      name: 'switch',
      type: 'switch',
      required: false,
      rules: [{ required: true, message: '请选择开关' }],
      valuePropName: 'checked',
    },
    {
      label: '出生年月',
      name: 'birthday',
      type: 'datePicker',
      rules: [{ required: true, message: '请输入出生年月' }],
    },
    {
      label: '备注',
      name: 'remark',
      type: 'textarea',
      required: false,
    },
    {
      label: '邮箱',
      name: 'email',
      type: 'input',
      // required: false,
      rules: [{ type: 'email', message: '请输入有效的邮箱地址' }],
    },
  ]

  const btnActions: BtnActionProps[] = [
    {
      text: '取消',
      key: 'cancel',
      onClick: () => {
        onCancel?.()
      },
    },
    {
      text: '提交',
      key: 'submit',
      type: 'primary',
      onClick: () => {
        // onSubmit()
      },
    },
  ]

  const cbSubmit = useCallback(() => {
    console.log('提交表单')
  }, [])

  return (
    <Modal
      title={title}
      okText={okText}
      cancelText={cancelText}
      maskClosable={false}
      style={{ top: 20 }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      centered={centered}
      destroyOnHidden
    >
      <SubmitForm fields={fields} formItemLayout={formItemLayout} btnActions={btnActions} submitText="提交" onSubmit={cbSubmit} />
    </Modal>
  )
}

export default AddUser
