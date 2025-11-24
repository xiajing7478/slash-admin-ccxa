import React, { useState } from 'react'
import { Card } from 'antd'
import Search, { type SearchField } from './Search'

// 级联选择示例组件
const CascadeSearchDemo: React.FC = () => {
  const [cityList, setCityList] = useState<any[]>([])
  const [districtList, setDistrictList] = useState<any[]>([])
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null)

  // 模拟省份数据
  const provinceList = [
    { label: '北京市', value: '110000' },
    { label: '上海市', value: '310000' },
    { label: '广东省', value: '440000' },
    { label: '浙江省', value: '330000' },
  ]

  // 模拟城市数据
  const mockCityData = {
    '110000': [{ label: '北京市', value: '110100' }],
    '310000': [{ label: '上海市', value: '310100' }],
    '440000': [
      { label: '广州市', value: '440100' },
      { label: '深圳市', value: '440300' },
      { label: '珠海市', value: '440400' },
    ],
    '330000': [
      { label: '杭州市', value: '330100' },
      { label: '宁波市', value: '330200' },
    ],
  }

  // 模拟区县数据
  const mockDistrictData = {
    '110100': [
      { label: '东城区', value: '110101' },
      { label: '西城区', value: '110102' },
      { label: '朝阳区', value: '110105' },
    ],
    '310100': [
      { label: '黄浦区', value: '310101' },
      { label: '徐汇区', value: '310104' },
      { label: '长宁区', value: '310105' },
    ],
    '440100': [
      { label: '荔湾区', value: '440103' },
      { label: '越秀区', value: '440104' },
      { label: '海珠区', value: '440105' },
    ],
    '440300': [
      { label: '罗湖区', value: '440303' },
      { label: '福田区', value: '440304' },
      { label: '南山区', value: '440305' },
    ],
  }

  // 处理省份选择变化
  const handleProvinceChange = (provinceId: string, form: any) => {
    console.log('省份选择变化:', provinceId)
    setSelectedCityId(provinceId)

    // 清空城市和区县选择
    form.setFieldValue('cityId', undefined)
    form.setFieldValue('districtId', undefined)
    setDistrictList([])

    // 加载对应城市列表
    if (provinceId) {
      const cities = mockCityData[provinceId as keyof typeof mockCityData] || []
      setCityList(cities)
    } else {
      setCityList([])
    }
  }

  // 处理城市选择变化
  const handleCityChange = (cityId: string, form: any) => {
    console.log('城市选择变化:', cityId)

    // 清空区县选择
    form.setFieldValue('districtId', undefined)

    // 加载对应区县列表
    if (cityId) {
      const districts = mockDistrictData[cityId as keyof typeof mockDistrictData] || []
      setDistrictList(districts)
    } else {
      setDistrictList([])
    }
  }

  const cascadeFields: SearchField[] = [
    {
      key: 'name',
      label: '姓名',
      type: 'input',
      placeholder: '请输入姓名',
      span: 8,
    },
    {
      key: 'provinceId',
      label: '省份',
      type: 'select',
      placeholder: '请选择省份',
      options: provinceList,
      span: 8,
      onChange: handleProvinceChange,
    },
    {
      key: 'cityId',
      label: '城市',
      type: 'select',
      placeholder: selectedCityId ? '请选择城市' : '请先选择省份',
      options: cityList,
      span: 8,
      disabled: !selectedCityId,
    },
    {
      key: 'districtId',
      label: '区县',
      type: 'select',
      placeholder: cityList.length > 0 ? '请选择区县' : '请先选择城市',
      options: districtList,
      span: 8,
      disabled: districtList.length === 0,
    },
  ]

  const handleSearch = (values: Record<string, any>) => {
    console.log('级联搜索条件:', values)
  }

  const handleReset = () => {
    console.log('重置级联搜索')
    setSelectedCityId(null)
    setCityList([])
    setDistrictList([])
  }

  return (
    <div style={{ padding: '24px' }}>
      <h2>级联选择搜索示例</h2>
      <Card>
        <Search fields={cascadeFields} onSearch={handleSearch} onReset={handleReset} layout="horizontal" labelAlign="right" />
      </Card>
    </div>
  )
}

export default CascadeSearchDemo
