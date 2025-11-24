import { type ISubmitFormProps, type FieldsProps, type SubmitFormRef } from './type'
// import { type BtnActionProps } from './type'
import React, { useCallback, useImperativeHandle, forwardRef } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, Space, Switch } from 'antd'
import styles from './index.module.less'

const SubmitForm = forwardRef<SubmitFormRef, ISubmitFormProps>(({ fields, formItemLayout, submitText, onSubmit, btnActions = [] }, ref) => {
  const [form] = Form.useForm()
  const Item = Form.Item
  const Option = Select.Option

  // 渲染表单字段
  const renderField = useCallback(() => {
    return fields.map((field: FieldsProps) => {
      const {
        name,
        label,
        render,
        type,
        rules,
        placeholder,
        options,
        valuePropName,
        required,
        allowClear = true,
        onChange: fieldOnChange,
        ...rest
      } = field
      // 自定义渲染
      if (render) {
        return (
          <Item key={name} name={name} label={label} rules={rules}>
            {render(form.getFieldValue(name), (value: any) => form.setFieldValue(name, value))}
          </Item>
        )
      }

      let ele: React.ReactNode = null

      const handleFieldChange = (value: any) => {
        if (fieldOnChange) {
          fieldOnChange(value, form)
        }
      }

      switch (type) {
        case 'input':
          ele = <Input placeholder={placeholder || `请输入${label}`} allowClear={allowClear} {...rest} />
          break
        case 'select':
          ele = (
            <Select
              allowClear={allowClear}
              showSearch
              optionFilterProp="label"
              placeholder={placeholder || `请选择${label}`}
              onChange={handleFieldChange}
              {...rest}
            >
              {options?.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )
          break
        case 'radio':
          ele = (
            <Radio.Group>
              {options?.map(option => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          )
          break
        case 'checkbox':
          ele = (
            <Checkbox.Group>
              {options?.map(option => (
                <Checkbox key={option.value} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
          )
          break
        case 'switch':
          ele = <Switch {...rest} />
          break
        case 'datePicker':
          ele = <DatePicker allowClear={allowClear} placeholder={placeholder || `请选择${label}`} style={{ width: '100%' }} {...rest} />
          break
        case 'textarea':
          ele = <Input.TextArea allowClear={allowClear} placeholder={placeholder || `请输入${label}`} {...rest} />
          break
        // 其他类型可以继续添加
        default:
          ele = <Input placeholder={placeholder || `请输入${label}`} allowClear={allowClear} {...rest} />
      }

      return (
        <>
          {type === 'switch' ? (
            <Item key={name} name={name} label={label} rules={rules} valuePropName={valuePropName} {...rest}>
              {ele}
            </Item>
          ) : (
            <Item key={name} name={name} label={label} rules={rules} required={required} {...rest}>
              {ele}
            </Item>
          )}
        </>
      )
    })
  }, [fields, form])

  // 统一处理按钮行为：支持 validate（先校验再回调）、reset（清空表单）和直接回调
  // const handleActionClick = useCallback(
  //   (btn: BtnActionProps) => {
  //     const meta = btn as any // 兼容可能的扩展字段 validate/reset 等
  //     // reset 优先：清空表单并回调（如果有）
  //     if (meta.reset) {
  //       form.resetFields()
  //       if (typeof meta.onClick === 'function') {
  //         meta.onClick()
  //       }
  //       return
  //     }

  //     // 需要校验：校验通过再回调并传入表单值
  //     if (meta.validate) {
  //       form
  //         .validateFields()
  //         .then(values => {
  //           if (typeof meta.onClick === 'function') {
  //             meta.onClick(values)
  //           }
  //         })
  //         .catch(() => {
  //           // 校验未通过，按需处理（此处静默）
  //         })
  //       return
  //     }

  //     // 默认直接回调（不校验、不重置）
  //     if (typeof meta.onClick === 'function') {
  //       meta.onClick()
  //     }
  //   },
  //   [form],
  // )

  // 表单按钮
  // const renderActions = () => {
  //   return btnActions?.map((btn: BtnActionProps) => (
  //     <Button
  //       className={styles['action-btn']}
  //       key={btn.key}
  //       type={btn.type}
  //       icon={btn.icon}
  //       // 如果希望让某些按钮为原生 submit，可以在配置中传 htmlType: 'submit'
  //       {...((btn as any).htmlType ? { htmlType: (btn as any).htmlType } : {})}
  //       onClick={() => handleActionClick(btn)}
  //     >
  //       {btn.text}
  //     </Button>
  //   ))
  // }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    onSubmit?.()
    // onSubSubmit?.(values)
  }

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),
    getFieldsValue: () => form.getFieldsValue(),
    resetFields: () => form.resetFields(),
    form,
  }))

  return (
    <Form
      className={styles.submitForm}
      initialValues={{
        switch: true,
        username: '',
      }}
      onFinish={onFinish}
      form={form}
      scrollToFirstError={{ behavior: 'instant', block: 'end', focus: true }}
      {...formItemLayout}
    >
      {renderField()}
      {/* {fields.length > 0 && (btnActions?.length ?? 0) > 0 && (
        <Item wrapperCol={{ offset: formItemLayout?.labelCol.span || 0 }}>{renderActions()}</Item>
      )} */}
      {fields.length > 0 && btnActions.length > 0 && (
        <Item wrapperCol={{ offset: formItemLayout?.labelCol.span || 0 }}>
          <Space>
            <Button>取消</Button>
            <Button type="primary" htmlType="submit">
              {submitText || '确认'}
            </Button>
          </Space>
        </Item>
      )}
    </Form>
  )
})

SubmitForm.displayName = 'SubmitForm'

export default SubmitForm
