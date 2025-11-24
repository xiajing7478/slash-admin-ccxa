import React, { useState } from 'react'
import { Card } from 'antd'
import Search, { type SearchField } from './Search'

// 模拟数据源
const mockOptions = [
  { label: '管理员', value: 'admin' },
  { label: '用户', value: 'user' },
  { label: '访客', value: 'guest' },
]

const mockStatusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]

const SearchDemo: React.FC = () => {
  const [searchResult1, setSearchResult1] = useState<any>(null)
  const [searchResult2, setSearchResult2] = useState<any>(null)

  // 示例1：基础搜索表单
  const basicFields: SearchField[] = [
    {
      key: 'name',
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名',
      span: 8,
    },
    {
      key: 'email',
      label: '邮箱',
      type: 'input',
      placeholder: '请输入邮箱',
      span: 8,
    },
    {
      key: 'role',
      label: '角色',
      type: 'select',
      placeholder: '请选择角色',
      options: mockOptions,
      span: 8,
    },
    {
      key: 'status',
      label: '状态',
      type: 'select',
      placeholder: '请选择状态',
      options: mockStatusOptions,
      span: 8,
    },
    {
      key: 'age',
      label: '年龄',
      type: 'number',
      placeholder: '请输入年龄',
      span: 8,
    },
    {
      key: 'createTime',
      label: '创建时间',
      type: 'dateRange',
      placeholder: '请选择时间范围',
      span: 8,
    },
  ]

  // 示例2：实时搜索表单
  const realTimeFields: SearchField[] = [
    {
      key: 'keyword',
      label: '关键词',
      type: 'input',
      placeholder: '输入即搜索',
      span: 12,
    },
    {
      key: 'category',
      label: '分类',
      type: 'select',
      placeholder: '选择分类',
      options: [
        { label: '技术', value: 'tech' },
        { label: '生活', value: 'life' },
        { label: '工作', value: 'work' },
      ],
      span: 12,
    },
  ]

  // 示例3：自定义渲染字段
  const customFields: SearchField[] = [
    {
      key: 'name',
      label: '用户名',
      type: 'input',
      span: 8,
    },
    {
      key: 'tags',
      label: '标签',
      type: 'select',
      span: 8,
      render: (value, onChange) => (
        <div>
          <input
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder="自定义输入框"
            style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
          />
        </div>
      ),
    },
    {
      key: 'score',
      label: '评分',
      type: 'number',
      span: 8,
      render: (value, onChange) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="range" min="0" max="100" value={value || 0} onChange={e => onChange(Number(e.target.value))} />
          <span>{value || 0}分</span>
        </div>
      ),
    },
  ]

  const handleSearch1 = (values: Record<string, any>) => {
    console.log('基础搜索:', values)
    setSearchResult1(values)
  }

  const handleSearch2 = (values: Record<string, any>) => {
    console.log('实时搜索:', values)
    setSearchResult2(values)
  }

  const handleSearch3 = (values: Record<string, any>) => {
    console.log('自定义搜索:', values)
  }

  const handleReset = () => {
    console.log('重置搜索')
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1>搜索组件示例</h1>

      <Card title="基础搜索表单" style={{ marginBottom: '24px' }}>
        <Search fields={basicFields} onSearch={handleSearch1} onReset={handleReset} layout="horizontal" labelAlign="right" />
        {searchResult1 && (
          <div style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
            <strong>搜索结果:</strong>
            <pre>{JSON.stringify(searchResult1, null, 2)}</pre>
          </div>
        )}
      </Card>

      <Card title="实时搜索表单（输入即搜索）" style={{ marginBottom: '24px' }}>
        <Search
          fields={realTimeFields}
          onSearch={handleSearch2}
          onReset={handleReset}
          realTime={true}
          debounceDelay={300}
          showSearchButton={false}
          layout="horizontal"
          labelAlign="right"
        />
        {searchResult2 && (
          <div style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
            <strong>实时搜索结果:</strong>
            <pre>{JSON.stringify(searchResult2, null, 2)}</pre>
          </div>
        )}
      </Card>

      <Card title="自定义渲染字段" style={{ marginBottom: '24px' }}>
        <Search fields={customFields} onSearch={handleSearch3} onReset={handleReset} layout="horizontal" labelAlign="right" />
      </Card>

      <Card title="垂直布局">
        <Search
          fields={[
            {
              key: 'name',
              label: '用户名',
              type: 'input',
              placeholder: '请输入用户名',
            },
            {
              key: 'role',
              label: '角色',
              type: 'select',
              placeholder: '请选择角色',
              options: mockOptions,
            },
          ]}
          onSearch={handleSearch3}
          onReset={handleReset}
          layout="vertical"
        />
      </Card>
    </div>
  )
}

export default SearchDemo
