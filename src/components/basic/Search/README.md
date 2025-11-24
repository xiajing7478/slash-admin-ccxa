# 通用搜索组件

一个功能完整、高度可配置的 React 搜索组件，支持多种输入类型、实时搜索、防抖等功能。

## 功能特性

- ✅ 多种字段类型：输入框、选择器、日期、日期范围、数字输入
- ✅ 实时搜索：支持输入即搜索，带防抖功能
- ✅ 自定义渲染：支持自定义字段渲染逻辑
- ✅ 灵活布局：支持水平、垂直、内联布局
- ✅ 响应式：基于栅格系统，支持自定义字段宽度
- ✅ 表单验证：支持必填字段验证
- ✅ 操作按钮：搜索、重置、清除按钮可配置显示
- ✅ 类型安全：完整的 TypeScript 类型定义

## 基础用法

```tsx
import Search, { SearchField } from '@/components/basic/Search'

const fields: SearchField[] = [
  {
    key: 'name',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    span: 8,
  },
  {
    key: 'role',
    label: '角色',
    type: 'select',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '用户', value: 'user' },
    ],
    span: 8,
  },
  {
    key: 'createTime',
    label: '创建时间',
    type: 'dateRange',
    span: 8,
  },
]

const MyComponent = () => {
  const handleSearch = (values: Record<string, any>) => {
    console.log('搜索条件:', values)
    // 执行搜索逻辑
  }

  const handleReset = () => {
    console.log('重置搜索')
  }

  return <Search fields={fields} onSearch={handleSearch} onReset={handleReset} />
}
```

## 实时搜索

```tsx
<Search
  fields={fields}
  onSearch={handleSearch}
  realTime={true}
  debounceDelay={500}
  showSearchButton={false} // 实时搜索时通常不显示搜索按钮
/>
```

## 自定义字段渲染

```tsx
const customFields: SearchField[] = [
  {
    key: 'score',
    label: '评分',
    type: 'number',
    render: (value, onChange) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="range" min="0" max="100" value={value || 0} onChange={e => onChange(Number(e.target.value))} />
        <span>{value || 0}分</span>
      </div>
    ),
  },
]
```

## 级联选择（依赖字段）

当某个字段的可选项依赖于另一字段的值（例如“所属计划”依赖“所属公司”），可通过 `SearchField.onChange` 在上游字段触发回调，更新下游字段的数据源，并配合 `disabled` 控制交互。

```tsx
const [companyList, setCompanyList] = useState<SelectOption[]>([])
const [planList, setPlanList] = useState<SelectOption[]>([])
const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)

const handleCompanyChange = async (tenantId: string, form: any) => {
  setSelectedCompanyId(tenantId)
  form.setFieldValue('planBid', undefined)
  setPlanList([])
  if (tenantId) {
    const res = await getPlanListByTenantId(tenantId)
    const options = (res.data || []).map((it: any) => ({ label: it.name, value: it.id }))
    setPlanList(options)
  }
}

const fields: SearchField[] = [
  {
    key: 'tenantId',
    label: '所属公司',
    type: 'select',
    options: companyList,
    onChange: handleCompanyChange,
  },
  {
    key: 'planBid',
    label: '所属计划',
    type: 'select',
    options: planList,
    disabled: !selectedCompanyId,
  },
]
```

## API 文档

### SearchProps

| 属性             | 类型                                   | 默认值       | 说明                     |
| ---------------- | -------------------------------------- | ------------ | ------------------------ |
| fields           | SearchField[]                          | -            | 搜索字段配置数组         |
| onSearch         | (values: Record<string, any>) => void  | -            | 搜索回调函数             |
| onReset          | () => void                             | -            | 重置回调函数             |
| showSearchButton | boolean                                | true         | 是否显示搜索按钮         |
| showResetButton  | boolean                                | true         | 是否显示重置按钮         |
| showClearButton  | boolean                                | true         | 是否显示清除按钮         |
| realTime         | boolean                                | false        | 是否实时搜索             |
| debounceDelay    | number                                 | 500          | 实时搜索防抖延迟（毫秒） |
| searchButtonText | string                                 | '搜索'       | 搜索按钮文本             |
| resetButtonText  | string                                 | '重置'       | 重置按钮文本             |
| clearButtonText  | string                                 | '清除'       | 清除按钮文本             |
| disabled         | boolean                                | false        | 是否禁用                 |
| className        | string                                 | ''           | 自定义样式类名           |
| layout           | 'horizontal' \| 'vertical' \| 'inline' | 'horizontal' | 表单布局                 |
| labelAlign       | 'left' \| 'right'                      | 'right'      | 标签对齐方式             |
| labelCol         | number                                 | 6            | 标签宽度                 |
| wrapperCol       | number                                 | 18           | 输入框宽度               |

### SearchField

| 属性         | 类型                            | 默认值 | 说明                                   |
| ------------ | ------------------------------- | ------ | -------------------------------------- |
| key          | string                          | -      | 字段名，对应表单的 name                |
| label        | string                          | -      | 显示标签                               |
| type         | SearchFieldType                 | -      | 字段类型                               |
| placeholder  | string                          | -      | 占位符文本                             |
| options      | SelectOption[]                  | -      | 选择器选项（仅 select 类型使用）       |
| required     | boolean                         | false  | 是否必填                               |
| defaultValue | any                             | -      | 默认值                                 |
| render       | (value, onChange) => ReactNode  | -      | 自定义渲染函数                         |
| span         | number                          | 8      | 字段宽度（栅格系统，1-24）             |
| visible      | boolean                         | true   | 是否在搜索表单中显示                   |
| onChange     | (value: any, form: any) => void | -      | 字段值变化回调（用于级联、联动场景）   |
| disabled     | boolean                         | false  | 是否禁用（可结合级联控制交互可用状态） |

### SearchFieldType

```tsx
type SearchFieldType = 'input' | 'select' | 'date' | 'dateRange' | 'number'
```

### SelectOption

```tsx
interface SelectOption {
  label: string // 显示文本
  value: any // 选项值
  disabled?: boolean // 是否禁用
}
```

## 注意事项

1. **日期处理**：组件会自动将日期对象转换为 'YYYY-MM-DD' 格式字符串
2. **空值过滤**：搜索时会自动过滤 undefined、null、空字符串等空值
3. **防抖优化**：实时搜索模式下会使用防抖函数优化性能
4. **类型安全**：建议使用 TypeScript 以获得完整的类型提示
5. **响应式**：基于 Ant Design 栅格系统，支持响应式布局

## 示例

查看 `demo.tsx` 文件获取更多使用示例。
