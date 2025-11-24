export interface ISubmitFormProps {
  /**提交按钮文字*/
  submitText?: string
  /**提交按钮loading状态 */
  loading?: boolean
  /** 提交按钮是否禁用 */
  disabled?: boolean
  /** 提交按钮点击事件 */
  onSubmit?: () => void
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right' | 'top'
  /** 标签宽度 */
  labelCol?: number
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /** 表单项布局 */
  formItemLayout?: {
    labelCol: { span: number }
    wrapperCol: { span: number }
  }
  /** 字段配置 */
  fields: FieldsProps[]
  /** 自定义样式类名 */
  className?: string
  /** 表单按钮组 */
  btnActions?: BtnActionProps[]
  onSubSubmit?: (values: any) => void
}

export interface FieldsProps {
  key?: string
  name: string
  label: string
  required?: boolean
  type?: 'input' | 'select' | 'datePicker' | 'radio' | 'checkbox' | 'switch' | string
  placeholder?: string
  options?: Array<{ label: string; value: string | number }>
  rules?: Array<{ required?: boolean; message?: string } | { type?: string; message?: string } | any>
  /** 自定义渲染函数 */
  render?: (value: any, onChange: (value: any) => void) => React.ReactNode
  valuePropName?: string
  onChange?: (value: any, form: any) => void
  allowClear?: boolean
}

export interface BtnActionProps {
  text: string
  key: string
  onClick: () => void
  icon?: React.ReactNode
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
}

export interface SubmitFormRef {
  validateFields: () => Promise<any>
  getFieldsValue: () => any
  resetFields: () => void
  form: any
}
