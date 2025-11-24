import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Input, Select, DatePicker, Button, Space, Form, Row, Col, ConfigProvider } from 'antd'
import { SearchOutlined, ReloadOutlined, DownOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { debounce } from '@/utils'
import styles from './index.module.less'
import classNames from 'classnames'

const { Option } = Select
const { RangePicker } = DatePicker

// 搜索字段类型定义
export interface SearchField {
  /** 字段名，对应表单的 name */
  key: string
  /** 显示标签 */
  label: string
  /** 字段类型 */
  type: 'input' | 'select' | 'date' | 'dateRange' | 'number'
  /** 占位符文本 */
  placeholder?: string
  /** 选择器选项（仅 type 为 select 时使用） */
  options?: Array<{ label: string; value: any; disabled?: boolean }>
  /** 是否必填 */
  required?: boolean
  /** 默认值 */
  defaultValue?: any
  /** 自定义渲染函数 */
  render?: (value: any, onChange: (value: any) => void) => React.ReactNode
  /** 字段宽度（栅格系统，1-24） */
  span?: number
  /** 是否在搜索表单中显示 */
  visible?: boolean
  /** 选择器变化回调（用于级联选择） */
  onChange?: (value: any, form: any) => void
  /** 是否禁用 */
  disabled?: boolean
}

// 搜索组件 Props
export interface SearchProps {
  /** 搜索字段配置 */
  fields: SearchField[]
  /** 搜索回调，参数为搜索条件对象 */
  onSearch: (values: Record<string, any>) => void
  /** 重置回调 */
  onReset?: () => void
  /** 是否显示搜索按钮 */
  showSearchButton?: boolean
  /** 是否显示重置按钮 */
  showResetButton?: boolean
  /** 是否折叠表单项 */
  collapsed?: boolean
  /** 是否显示折叠表单项 */
  showCollapse?: boolean
  /** 是否实时搜索（输入即搜索） */
  realTime?: boolean
  /** 实时搜索防抖延迟（毫秒） */
  debounceDelay?: number
  /** 搜索按钮文本 */
  searchButtonText?: string
  /** 重置按钮文本 */
  resetButtonText?: string
  // /** 清除按钮文本 */
  // clearButtonText?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义样式类名 */
  className?: string
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right'
  /** 标签宽度 */
  labelCol?: number
  /** 输入框宽度 */
  wrapperCol?: number
}

const Search: React.FC<SearchProps> = ({
  fields,
  onSearch,
  onReset,
  showSearchButton = true,
  showResetButton = true,
  showCollapse = true,
  realTime = false,
  debounceDelay = 500,
  searchButtonText = '搜索',
  resetButtonText = '重置',
  disabled = false,
  className = '',
  layout = 'horizontal',
  labelAlign = 'right',
  labelCol = 6,
  wrapperCol = 18,
  collapsed = false,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [collapse, setCollapse] = useState(collapsed)
  // 过滤可见字段
  const visibleFields = useMemo(() => fields.filter(field => field.visible !== false), [fields])

  // 计算每个字段所在的行索引与总行数（按 24 栅格）
  const rowsMeta = useMemo(() => {
    const rowIndices: number[] = []
    let currentSpan = 0
    let currentRow = 0
    for (let i = 0; i < visibleFields.length; i++) {
      const span = Math.min(Math.max(visibleFields[i].span ?? 6, 1), 24)
      if (currentSpan + span > 24) {
        currentRow++
        currentSpan = 0
      }
      rowIndices.push(currentRow)
      currentSpan += span
    }
    const rowsCount = rowIndices.length > 0 ? rowIndices[rowIndices.length - 1] + 1 : 0
    return { rowIndices, rowsCount }
  }, [visibleFields])

  // 是否需要显示折叠开关（仅当行数 >= 3）
  const needCollapseToggle = rowsMeta.rowsCount >= 3
  // 根据折叠状态决定渲染哪些字段：收起时仅渲染第一行
  const effectiveFields = useMemo(() => {
    if (!needCollapseToggle) return visibleFields
    if (!collapse) return visibleFields
    return visibleFields.filter((_, idx) => rowsMeta.rowIndices[idx] === 0)
  }, [visibleFields, collapse, needCollapseToggle, rowsMeta.rowIndices])

  // 初始化表单默认值
  useEffect(() => {
    const initialValues: Record<string, any> = {}
    fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        initialValues[field.key] = field.defaultValue
      }
    })
    if (Object.keys(initialValues).length > 0) {
      form.setFieldsValue(initialValues)
    }
  }, [fields, form])

  // 防抖搜索函数
  const debouncedSearch = useMemo(
    () =>
      debounce((values: Record<string, any>) => {
        setLoading(true)
        try {
          onSearch(values)
        } finally {
          setLoading(false)
        }
      }, debounceDelay),
    [onSearch, debounceDelay],
  )

  // 执行搜索
  const handleSearch = useCallback(
    (values?: Record<string, any>) => {
      const formValues = values || form.getFieldsValue()
      const filteredValues = Object.keys(formValues).reduce(
        (acc, key) => {
          const value = formValues[key]
          // 过滤空值
          if (value !== undefined && value !== null && value !== '') {
            // 处理日期范围
            if (Array.isArray(value) && value.length === 2 && value[0] && value[1]) {
              acc[key] = [dayjs(value[0]).format('YYYY-MM-DD'), dayjs(value[1]).format('YYYY-MM-DD')]
            } else if (dayjs.isDayjs(value)) {
              // 处理单个日期
              acc[key] = dayjs(value).format('YYYY-MM-DD')
            } else {
              acc[key] = value
            }
          }
          return acc
        },
        {} as Record<string, any>,
      )

      if (realTime) {
        debouncedSearch(filteredValues)
      } else {
        setLoading(true)
        try {
          onSearch(filteredValues)
        } finally {
          setLoading(false)
        }
      }
    },
    [form, onSearch, realTime, debouncedSearch],
  )

  // 重置表单
  const handleReset = useCallback(() => {
    form.resetFields()
    onReset?.()
    if (realTime) {
      handleSearch({})
    }
  }, [form, onReset, realTime, handleSearch])

  // 渲染单个字段
  const renderField = useCallback(
    (field: SearchField) => {
      const { key, type, placeholder, options, render, span = 6, onChange: fieldOnChange, disabled: fieldDisabled } = field

      // 自定义渲染
      if (render) {
        return (
          <Col span={span} key={key}>
            <Form.Item name={key} label={field.label} required={field.required}>
              {render(form.getFieldValue(key), (value: any) => form.setFieldValue(key, value))}
            </Form.Item>
          </Col>
        )
      }

      // 标准字段渲染
      let inputElement: React.ReactNode

      // 处理 onChange 事件
      const handleFieldChange = (value: any) => {
        // 如果有字段级别的 onChange，先执行
        if (fieldOnChange) {
          fieldOnChange(value, form)
        }
        // 如果是实时搜索，执行搜索
        if (realTime) {
          handleSearch()
        }
      }

      switch (type) {
        case 'input':
          inputElement = (
            <Input placeholder={placeholder || `请输入${field.label}`} disabled={fieldDisabled || disabled} allowClear onChange={handleFieldChange} />
          )
          break

        case 'select':
          inputElement = (
            <Select placeholder={placeholder || `请选择${field.label}`} disabled={fieldDisabled || disabled} allowClear onChange={handleFieldChange}>
              {options?.map(option => (
                <Option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )
          break

        case 'date':
          inputElement = (
            <DatePicker
              placeholder={placeholder || `请选择${field.label}`}
              disabled={fieldDisabled || disabled}
              allowClear
              onChange={handleFieldChange}
            />
          )
          break

        case 'dateRange':
          inputElement = (
            <RangePicker
              placeholder={[placeholder || '开始日期', '结束日期']}
              disabled={fieldDisabled || disabled}
              allowClear
              style={{ width: '100%' }}
              onChange={handleFieldChange}
            />
          )
          break

        case 'number':
          inputElement = (
            <Input
              type="number"
              placeholder={placeholder || `请输入${field.label}`}
              disabled={fieldDisabled || disabled}
              allowClear
              onChange={handleFieldChange}
            />
          )
          break

        default:
          inputElement = (
            <Input placeholder={placeholder || `请输入${field.label}`} disabled={fieldDisabled || disabled} allowClear onChange={handleFieldChange} />
          )
      }

      return (
        <Col span={span} key={key}>
          <Form.Item name={key} label={field.label} required={field.required}>
            {inputElement}
          </Form.Item>
        </Col>
      )
    },
    [form, disabled, realTime, handleSearch],
  )

  const handleCollapse = useCallback(() => {
    setCollapse(!collapse)
  }, [collapse])

  // 渲染操作按钮
  const renderActions = useCallback(() => {
    const actions = []

    if (showSearchButton && !realTime) {
      actions.push(
        <Button key="search" type="primary" icon={<SearchOutlined />} loading={loading} disabled={disabled} onClick={() => handleSearch()}>
          {searchButtonText}
        </Button>,
      )
    }

    if (showResetButton) {
      actions.push(
        <Button key="reset" icon={<ReloadOutlined />} disabled={disabled} onClick={handleReset}>
          {resetButtonText}
        </Button>,
      )
    }

    if (showCollapse && needCollapseToggle) {
      actions.push(
        <Button key="collapse" icon={<DownOutlined rotate={collapse ? 0 : 180} />} onClick={handleCollapse}>
          {collapse ? '展开' : '收起'}
        </Button>,
      )
    }
    return actions.length > 0 ? (
      <Col span={6}>
        <Form.Item label="操作">
          <Space>{actions}</Space>
        </Form.Item>
      </Col>
    ) : null
  }, [
    showSearchButton,
    showResetButton,
    realTime,
    loading,
    disabled,
    searchButtonText,
    resetButtonText,
    handleSearch,
    handleReset,
    collapse,
    showCollapse,
    handleCollapse,
    needCollapseToggle,
  ])
  return (
    <ConfigProvider
      theme={{
        token: { controlHeight: 32 },
        components: { Form: { itemMarginBottom: 8 } },
      }}
    >
      <div className={classNames(styles['search-component'], className)}>
        <Form
          form={form}
          layout={layout}
          labelAlign={labelAlign}
          labelCol={layout === 'horizontal' ? { span: labelCol } : undefined}
          wrapperCol={layout === 'horizontal' ? { span: wrapperCol } : undefined}
          onFinish={handleSearch}
        >
          <Row gutter={[16, 16]}>
            {effectiveFields.map(renderField)}
            {renderActions()}
          </Row>
        </Form>
      </div>
    </ConfigProvider>
  )
}

export default Search
