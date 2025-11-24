import type { ReactNode } from 'react'

// 搜索字段类型枚举
export type SearchFieldType = 'input' | 'select' | 'date' | 'dateRange' | 'number'

// 选择器选项接口
export interface SelectOption {
  /** 显示文本 */
  label: string
  /** 选项值 */
  value: any
  /** 是否禁用 */
  disabled?: boolean
}

// 搜索字段配置接口
export interface SearchField {
  /** 字段名，对应表单的 name */
  key: string
  /** 显示标签 */
  label: string
  /** 字段类型 */
  type: SearchFieldType
  /** 占位符文本 */
  placeholder?: string
  /** 选择器选项（仅 type 为 select 时使用） */
  options?: SelectOption[]
  /** 是否必填 */
  required?: boolean
  /** 默认值 */
  defaultValue?: any
  /** 自定义渲染函数 */
  render?: (value: any, onChange: (value: any) => void) => ReactNode
  /** 字段宽度（栅格系统，1-24） */
  span?: number
  /** 是否在搜索表单中显示 */
  visible?: boolean
  /** 选择器变化回调（用于级联选择） */
  onChange?: (value: any, form: any) => void
  /** 是否禁用 */
  disabled?: boolean
}

// 搜索组件 Props 接口
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
  /** 是否显示清除按钮 */
  showClearButton?: boolean
  /** 是否实时搜索（输入即搜索） */
  realTime?: boolean
  /** 实时搜索防抖延迟（毫秒） */
  debounceDelay?: number
  /** 搜索按钮文本 */
  searchButtonText?: string
  /** 重置按钮文本 */
  resetButtonText?: string
  /** 清除按钮文本 */
  clearButtonText?: string
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

// 搜索表单值类型
export type SearchFormValues = Record<string, any>

// 搜索回调函数类型
export type SearchCallback = (values: SearchFormValues) => void

// 重置回调函数类型
export type ResetCallback = () => void
