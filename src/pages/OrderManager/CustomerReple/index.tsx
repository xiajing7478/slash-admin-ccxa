import React, { useState } from 'react'
import { Card, Row, Col, Tabs, DatePicker, Button, Space, Table } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import './index.module.less'

const { RangePicker } = DatePicker

// ==================== 数据看板主组件 ====================
const CustomerReple: React.FC = () => {
  // 当前选中的时间范围
  const [timeRange, setTimeRange] = useState('plan')
  // 员工数据/家属数据标签
  const [activeTab, setActiveTab] = useState('employee')

  return (
    <div className="customer-reple-dashboard">
      {/* 顶部标题和筛选器 */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">数据看板</h2>
        <div className="dashboard-filters">
          {/* 时间范围快捷选择 */}
          <Space>
            <Button type={timeRange === 'plan' ? 'primary' : 'default'} onClick={() => setTimeRange('plan')}>
              计划
            </Button>
            <Button onClick={() => setTimeRange('today')}>今天</Button>
            <Button onClick={() => setTimeRange('yesterday')}>昨天</Button>
            <Button onClick={() => setTimeRange('last7days')}>最近7天</Button>
            <Button onClick={() => setTimeRange('last30days')}>最近30天</Button>
          </Space>
          {/* 日期范围选择器 */}
          <RangePicker />
          {/* 刷新按钮 */}
          <Button icon={<ReloadOutlined />} />
        </div>
      </div>

      {/* 员工数据/家属数据标签页 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: 'employee', label: '员工数据' },
          { key: 'family', label: '家属数据' },
        ]}
      ></Tabs>

      {/* 第一行：预约概览和到检概览 */}
      <Row gutter={[16, 16]} className="dashboard-row">
        <Col xs={24} lg={12}>
          <ReservationOverview />
        </Col>
        <Col xs={24} lg={12}>
          <CheckInOverview />
        </Col>
      </Row>

      {/* 第二行：订单概览和未到检原因 */}
      <Row gutter={[16, 16]} className="dashboard-row">
        <Col xs={24} lg={16}>
          <OrderOverview />
        </Col>
        <Col xs={24} lg={8}>
          <NotCheckInReasons />
        </Col>
      </Row>

      {/* 第三行：城市数据 */}
      <Row gutter={[16, 16]} className="dashboard-row">
        <Col xs={24}>
          <CityData />
        </Col>
      </Row>

      {/* 第四行：年龄分析和性别婚姻分析 */}
      <Row gutter={[16, 16]} className="dashboard-row">
        <Col xs={24} lg={14}>
          <AgeAnalysis />
        </Col>
        <Col xs={24} lg={10}>
          <GenderMaritalAnalysis />
        </Col>
      </Row>

      {/* 第五行：套餐分析 */}
      <Row gutter={[16, 16]} className="dashboard-row">
        <Col xs={24} lg={14}>
          <PackageAnalysis />
        </Col>
        <Col xs={24} lg={10}>
          <PackageDetails />
        </Col>
      </Row>

      {/* 第六行：机构品牌分析和预约占比 */}
      <Row gutter={[16, 16]} className="dashboard-row">
        <Col xs={24} lg={14}>
          <InstitutionBrandAnalysis />
        </Col>
        <Col xs={24} lg={10}>
          <ReservationProportion />
        </Col>
      </Row>
    </div>
  )
}

// ==================== 预约概览卡片组件 ====================
const ReservationOverview: React.FC = () => {
  const option: EChartsOption = {
    // 关闭动画以提升性能
    animation: false,
    // 网格配置，用于控制图表位置
    grid: { top: 0, right: 0, bottom: 0, left: 0 },
    // 关闭提示框
    tooltip: { show: false },
  }

  return (
    <Card className="overview-card reservation-card">
      {/* 图标 */}
      <div className="card-icon-wrapper">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" fill="#4CAF50" />
          <path d="M7 14h10v-2H7v2zm0-4h10V8H7v2z" fill="#fff" />
        </svg>
      </div>
      {/* 指标展示区域 */}
      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-label">
            计划总人数
            <span className="info-icon">ℹ️</span>
          </div>
          <div className="metric-value">2,000</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">
            预约总人数
            <span className="info-icon">ℹ️</span>
          </div>
          <div className="metric-value">1,000</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">
            预约率
            <span className="info-icon">ℹ️</span>
          </div>
          <div className="metric-value">50%</div>
        </div>
      </div>
      {/* 占位的ECharts实例（实际可以用于展示趋势图表） */}
      <div style={{ display: 'none' }}>
        <ReactECharts option={option} style={{ height: 0 }} />
      </div>
    </Card>
  )
}

// ==================== 到检概览卡片组件 ====================
const CheckInOverview: React.FC = () => {
  const option: EChartsOption = {
    animation: false,
    grid: { top: 0, right: 0, bottom: 0, left: 0 },
    tooltip: { show: false },
  }

  return (
    <Card className="overview-card checkin-card">
      <div className="card-icon-wrapper">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#FF9800" strokeWidth="2" fill="none" />
          <path d="M8 12l2 2 4-4" stroke="#FF9800" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-label">
            已到检人数
            <span className="info-icon">ℹ️</span>
          </div>
          <div className="metric-value">800</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">
            预约已到检占比
            <span className="info-icon">ℹ️</span>
          </div>
          <div className="metric-value">80%</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">
            总人数已到检占比
            <span className="info-icon">ℹ️</span>
          </div>
          <div className="metric-value">40%</div>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <ReactECharts option={option} style={{ height: 0 }} />
      </div>
    </Card>
  )
}

// ==================== 订单概览图表组件 ====================
const OrderOverview: React.FC = () => {
  // ECharts配置项
  const option: EChartsOption = {
    // 图表标题配置
    title: {
      text: '订单概览',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    // 提示框配置
    tooltip: {
      trigger: 'axis', // 触发类型：坐标轴触发
      axisPointer: {
        type: 'cross', // 十字准星指示器
      },
    },
    // 图例配置
    legend: {
      data: ['订单量', '订单总金额'],
      bottom: 0,
    },
    // 网格配置，用于控制图表位置和大小
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true, // 是否包含坐标轴的刻度标签
    },
    // x轴配置
    xAxis: {
      type: 'category',
      boundaryGap: false, // 坐标轴两边是否留白
      data: ['3月', '4月', '5月', '6月', '7月', '8月'],
    },
    // y轴配置（左侧）
    yAxis: [
      {
        type: 'value',
        name: '订单量',
        min: 0,
        max: 100000,
        position: 'left',
      },
      {
        type: 'value',
        name: '订单总金额',
        min: 0,
        max: 100,
        position: 'right',
      },
    ],
    // 数据系列配置
    series: [
      {
        name: '订单量',
        type: 'line', // 折线图
        yAxisIndex: 0, // 使用第一个y轴
        data: [23000, 40000, 230, 35000, 50000, 45000],
        itemStyle: { color: '#4CAF50' }, // 线条颜色
        areaStyle: {
          // 区域填充样式
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(76, 175, 80, 0.3)' },
              { offset: 1, color: 'rgba(76, 175, 80, 0)' },
            ],
          },
        },
      },
      {
        name: '订单总金额',
        type: 'line',
        yAxisIndex: 1, // 使用第二个y轴
        data: [60, 80, 18000, 70, 85, 75],
        itemStyle: { color: '#FFC107' },
      },
    ],
  }

  return (
    <Card>
      {/* 顶部汇总信息 */}
      <div style={{ marginBottom: 16 }}>
        <Space>
          <span>订单总量: 1000</span>
          <span>订单总金额: 8000</span>
        </Space>
      </div>
      {/* ECharts图表 */}
      <ReactECharts option={option} style={{ height: 350 }} />
    </Card>
  )
}

// ==================== 未到检原因饼图组件 ====================
const NotCheckInReasons: React.FC = () => {
  const option: EChartsOption = {
    title: {
      text: '未到检原因',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item', // 触发类型：数据项触发
      formatter: '{a} <br/>{b}: {c}人 ({d}%)', // 自定义提示框格式
    },
    // 环形图配置
    graphic: [
      {
        type: 'text', // 图形类型：文本
        left: 'center',
        top: 'center',
        style: {
          text: '总人数:100',
          fontSize: 16,
          fontWeight: 'bold',
          fill: '#333',
        },
      },
    ],
    series: [
      {
        name: '未到检原因',
        type: 'pie', // 饼图
        radius: ['40%', '70%'], // 内外半径，形成环形
        center: ['50%', '50%'], // 圆心位置
        avoidLabelOverlap: false, // 是否防止标签重叠
        itemStyle: {
          borderRadius: 10, // 扇形圆角
          borderColor: '#fff',
          borderWidth: 2, // 边框宽度
        },
        label: {
          show: false, // 不显示标签
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
          },
        },
        data: [
          { value: 30, name: '未预约', itemStyle: { color: '#4CAF50' } },
          { value: 70, name: '已预约未到检', itemStyle: { color: '#FFC107' } },
        ],
      },
    ],
  }

  return (
    <Card>
      {/* 图例说明 */}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ width: 12, height: 12, backgroundColor: '#4CAF50', marginRight: 8 }} />
          <span>未预约: 30% | 30人</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 12, height: 12, backgroundColor: '#FFC107', marginRight: 8 }} />
          <span>已预约未到检: 70% | 70人</span>
        </div>
      </div>
      <ReactECharts option={option} style={{ height: 350 }} />
    </Card>
  )
}

// ==================== 城市数据组合图表组件 ====================
const CityData: React.FC = () => {
  // 城市占比饼图配置
  const cityProportionOption: EChartsOption = {
    title: {
      text: '城市占比',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}人 ({d}%)',
    },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '总计',
          fontSize: 16,
          fontWeight: 'bold',
          fill: '#333',
        },
      },
    ],
    series: [
      {
        name: '城市占比',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'outside', // 标签位置：外部
          formatter: '{b}\n{d}%',
        },
        data: [
          { value: 57, name: '上海', itemStyle: { color: '#4CAF50' } },
          { value: 16, name: '北京', itemStyle: { color: '#2196F3' } },
          { value: 14, name: '苏州', itemStyle: { color: '#9C27B0' } },
          { value: 1, name: '深圳', itemStyle: { color: '#FF9800' } },
          { value: 1, name: '杭州', itemStyle: { color: '#F44336' } },
          { value: 1, name: '无锡', itemStyle: { color: '#00BCD4' } },
          { value: 10, name: '其他城市', itemStyle: { color: '#9E9E9E' } },
        ],
      },
    ],
  }

  // 城市预约情况组合图配置
  const cityReservationOption: EChartsOption = {
    title: {
      text: '城市预约情况',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['预约人数', '到检人数', '预约到检占比'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['上海', '北京', '杭州', '苏州', '深圳', '无锡', '其他城市'],
      axisLabel: {
        rotate: 45, // 旋转45度避免重叠
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '人数',
        min: 0,
        max: 1000,
      },
      {
        type: 'value',
        name: '占比',
        min: 0,
        max: 100,
        position: 'right',
      },
    ],
    series: [
      {
        name: '预约人数',
        type: 'bar', // 柱状图
        data: [700, 300, 250, 200, 150, 100, 100],
        itemStyle: { color: '#4CAF50' },
      },
      {
        name: '到检人数',
        type: 'bar',
        data: [800, 400, 300, 250, 180, 120, 120],
        itemStyle: { color: '#FFC107' },
      },
      {
        name: '预约到检占比',
        type: 'line',
        yAxisIndex: 1,
        data: [70, 75, 80, 85, 70, 60, 65],
        itemStyle: { color: '#2196F3' },
      },
    ],
  }

  return (
    <Card>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <ReactECharts option={cityProportionOption} style={{ height: 350 }} />
        </Col>
        <Col xs={24} md={12}>
          <ReactECharts option={cityReservationOption} style={{ height: 350 }} />
        </Col>
      </Row>
    </Card>
  )
}

// ==================== 年龄分析组合图表组件 ====================
const AgeAnalysis: React.FC = () => {
  const option: EChartsOption = {
    title: {
      text: '年龄分析',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['男', '女', '预约人数-男', '预约人数-女', '预约占比-男', '预约占比-女'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '20%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['20-30', '31-40', '41-50', '51-60', '61+'],
    },
    yAxis: [
      {
        type: 'value',
        name: '人数',
        min: 0,
        max: 400,
      },
      {
        type: 'value',
        name: '占比',
        min: 0,
        max: 100,
        position: 'right',
      },
    ],
    series: [
      {
        name: '男',
        type: 'bar',
        stack: 'total', // 堆叠柱状图
        data: [180, 200, 150, 100, 50],
        itemStyle: { color: '#2196F3' },
      },
      {
        name: '女',
        type: 'bar',
        stack: 'total',
        data: [120, 150, 100, 80, 30],
        itemStyle: { color: '#FFB6C1' },
      },
      {
        name: '预约人数-男',
        type: 'bar',
        data: [100, 120, 90, 60, 30],
        itemStyle: { color: '#90CAF9' },
      },
      {
        name: '预约人数-女',
        type: 'bar',
        data: [70, 90, 60, 50, 20],
        itemStyle: { color: '#F8BBD0' },
      },
      {
        name: '预约占比-男',
        type: 'line',
        yAxisIndex: 1,
        data: [60, 65, 70, 68, 75],
        itemStyle: { color: '#64B5F6' },
      },
      {
        name: '预约占比-女',
        type: 'line',
        yAxisIndex: 1,
        data: [20, 22, 25, 30, 35],
        itemStyle: { color: '#FF69B4' },
      },
    ],
  }

  return (
    <Card>
      <ReactECharts option={option} style={{ height: 400 }} />
    </Card>
  )
}

// ==================== 性别婚姻分析饼图组件 ====================
const GenderMaritalAnalysis: React.FC = () => {
  const option: EChartsOption = {
    title: {
      text: '性别婚姻分析',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}人 ({d}%)',
    },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '预约总人数\n2000人',
          fontSize: 14,
          fontWeight: 'bold',
          fill: '#333',
        },
      },
    ],
    series: [
      {
        name: '性别婚姻分析',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{c}人\n{d}%',
        },
        data: [
          { value: 1100, name: '男', itemStyle: { color: '#2196F3' } },
          { value: 900, name: '女', itemStyle: { color: '#FFB6C1' } },
        ],
      },
    ],
  }

  return (
    <Card>
      <ReactECharts option={option} style={{ height: 400 }} />
      {/* 婚姻状况说明 */}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Space direction="vertical" size="small">
          <div>
            <span style={{ width: 12, height: 12, backgroundColor: '#4CAF50', display: 'inline-block', marginRight: 8 }} />
            <span>未婚 23%</span>
          </div>
          <div>
            <span style={{ width: 12, height: 12, backgroundColor: '#FFC107', display: 'inline-block', marginRight: 8 }} />
            <span>已婚 55%</span>
          </div>
          <div>
            <span style={{ width: 12, height: 12, backgroundColor: '#9C27B0', display: 'inline-block', marginRight: 8 }} />
            <span>离异 22%</span>
          </div>
        </Space>
      </div>
    </Card>
  )
}

// ==================== 套餐分析横条堆叠图组件 ====================
const PackageAnalysis: React.FC = () => {
  const option: EChartsOption = {
    title: {
      text: '套餐分析',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['可选人数', '预约人数', '可选预约占比', '总预约占比'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    // x轴和y轴互换，实现横向柱状图
    xAxis: {
      type: 'value',
      min: 0,
      max: 600,
    },
    yAxis: {
      type: 'category',
      data: ['套餐J', '套餐I', '套餐H', '套餐G', '套餐F', '套餐E', '套餐D', '套餐C', '套餐B', '套餐A'],
      axisLabel: {
        formatter: function (value: string) {
          // 在每个套餐名称后面添加百分比信息
          const index = ['套餐J', '套餐I', '套餐H', '套餐G', '套餐F', '套餐E', '套餐D', '套餐C', '套餐B', '套餐A'].indexOf(value)
          const percentages = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5]
          const counts = [140, 130, 120, 110, 100, 90, 80, 70, 60, 50]
          return `${value} ${percentages[index]}% | ${counts[index]}人`
        },
      },
    },
    series: [
      {
        name: '可选人数',
        type: 'bar',
        data: [300, 280, 260, 240, 220, 200, 180, 160, 140, 120],
        itemStyle: { color: '#4CAF50' },
        stack: 'total', // 堆叠
      },
      {
        name: '预约人数',
        type: 'bar',
        data: [140, 130, 120, 110, 100, 90, 80, 70, 60, 50],
        itemStyle: { color: '#FFC107' },
        stack: 'total',
      },
      {
        name: '可选预约占比',
        type: 'line',
        data: [40, 45, 50, 45, 45, 45, 40, 45, 45, 40],
        itemStyle: { color: '#2196F3' },
      },
      {
        name: '总预约占比',
        type: 'line',
        data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        itemStyle: { color: '#F06292' },
      },
    ],
  }

  return (
    <Card>
      <ReactECharts option={option} style={{ height: 400 }} />
    </Card>
  )
}

// ==================== 套餐明细表格组件 ====================
const PackageDetails: React.FC = () => {
  const columns: any[] = [
    { title: '序号', dataIndex: 'index', key: 'index', width: 60 },
    { title: '套餐名称', dataIndex: 'name', key: 'name' },
    { title: '可选人数', dataIndex: 'selectable', key: 'selectable', align: 'right' as const },
    { title: '预约人数', dataIndex: 'reserved', key: 'reserved', align: 'right' as const },
    { title: '预约占比', dataIndex: 'percentage', key: 'percentage', align: 'right' as const },
    { title: '预估收益金额', dataIndex: 'revenue', key: 'revenue', align: 'right' as const },
    { title: '预估支付金额', dataIndex: 'payment', key: 'payment', align: 'right' as const },
    { title: '总金额', dataIndex: 'total', key: 'total', align: 'right' as const },
  ]

  // 生成模拟数据
  const data = Array.from({ length: 10 }, (_, i) => {
    const packageName = ['套餐A', '套餐B', '套餐C', '套餐D', '套餐E', '套餐F', '套餐G', '套餐H', '套餐I', '套餐J'][i]
    return {
      key: i + 1,
      index: i + 1,
      name: packageName,
      selectable: 700 - i * 50,
      reserved: 600 - i * 50,
      percentage: `${(28.61 - i * 2).toFixed(2)}%`,
      revenue: 40000,
      payment: 40000,
      total: 80000,
    }
  })

  // 总计行
  const summaryData = [
    {
      key: 'total',
      index: '总计',
      name: '',
      selectable: 2430,
      reserved: 0,
      percentage: '',
      revenue: 200000,
      payment: 200000,
      total: 400000,
    },
  ]

  return (
    <Card title="套餐明细">
      <Table
        columns={columns}
        dataSource={[...data, ...summaryData]}
        pagination={false}
        size="small"
        rowClassName={record => (record.key === 'total' ? 'summary-row' : '')}
      />
    </Card>
  )
}

// ==================== 机构品牌分析组合图组件 ====================
const InstitutionBrandAnalysis: React.FC = () => {
  const option: EChartsOption = {
    // 图表标题配置
    title: {
      text: '机构品牌分分析',
      left: 0,
      textStyle: { fontSize: 16, fontWeight: 'bold' },
    },
    // 提示框配置
    tooltip: {
      trigger: 'axis', // 坐标轴触发
      axisPointer: {
        type: 'cross', // 十字准星指示器
        crossStyle: {
          color: '#999',
        },
      },
      // 自定义提示框内容格式
      formatter: function (params: any) {
        let result = params[0].name + '<br/>'
        params.forEach((item: any) => {
          if (item.seriesName === '平均机构质量') {
            result += item.marker + ' ' + item.seriesName + ': ' + item.value + '<br/>'
          } else {
            result += item.marker + ' ' + item.seriesName + ': ' + item.value + '<br/>'
          }
        })
        return result
      },
    },
    // 图例配置
    legend: {
      data: ['平均机构质量', '预约人数'],
      bottom: 0,
      itemGap: 20, // 图例间距
    },
    // 网格配置
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true,
    },
    // X轴配置
    xAxis: {
      type: 'category',
      data: ['爱康', '美年', '慈铭', '瑞慈', '公立医院', '城市品牌'],
      axisPointer: {
        type: 'shadow', // 阴影指示器
      },
      axisLabel: {
        rotate: 45, // 旋转45度，防止文字重叠
        fontSize: 12,
      },
      axisTick: {
        // X轴刻度线
        show: true,
        alignWithLabel: true, // 刻度线和标签对齐
      },
    },
    // Y轴配置
    yAxis: [
      {
        // 左侧Y轴 - 平均机构质量
        type: 'value',
        name: '质量',
        min: 0,
        max: 20,
        position: 'left',
        axisLine: {
          // Y轴轴线
          show: true,
          lineStyle: {
            color: '#4CAF50', // 轴线颜色和柱状图颜色一致
          },
        },
        axisLabel: {
          // Y轴标签
          formatter: '{value}',
        },
        splitLine: {
          // 网格线
          show: true,
          lineStyle: {
            type: 'dashed', // 虚线
            color: '#E0E0E0',
          },
        },
      },
      {
        // 右侧Y轴 - 预约人数
        type: 'value',
        name: '预约人数',
        min: 0,
        max: 800,
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#FFC107', // 轴线颜色和折线图颜色一致
          },
        },
        axisLabel: {
          formatter: '{value}',
        },
        splitLine: {
          show: false, // 右侧Y轴不显示网格线
        },
      },
    ],
    // 数据系列配置
    series: [
      {
        // 平均机构质量 - 柱状图
        name: '平均机构质量',
        type: 'bar',
        data: [18, 16, 14, 12, 15, 10],
        itemStyle: {
          color: '#4CAF50', // 绿色
          borderRadius: [4, 4, 0, 0], // 柱状图顶部圆角
        },
        label: {
          // 柱状图顶部数值标签
          show: true,
          position: 'top',
          fontSize: 12,
          fontWeight: 'bold',
        },
        barWidth: '20%', // 柱状图宽度
      },
      {
        // 预约人数 - 折线图
        name: '预约人数',
        type: 'line',
        yAxisIndex: 1, // 使用右侧Y轴
        data: [700, 500, 300, 200, 160, 100],
        itemStyle: {
          color: '#FFC107', // 黄色
          borderWidth: 2,
        },
        lineStyle: {
          // 折线样式
          width: 3,
          type: 'solid', // 实线
        },
        symbol: 'circle', // 数据点标记样式：圆形
        symbolSize: 8, // 数据点大小
        label: {
          // 折线图数值标签
          show: true,
          position: 'top',
          fontSize: 12,
          fontWeight: 'bold',
        },
        smooth: false, // 不平滑曲线，使用折线
      },
    ],
  }

  return (
    <Card>
      <ReactECharts option={option} style={{ height: 400 }} />
    </Card>
  )
}

// ==================== 预约占比表格组件 ====================
const ReservationProportion: React.FC = () => {
  const [activeTab, setActiveTab] = useState('brand')

  const brandColumns: any[] = [
    { title: '序号', dataIndex: 'index', key: 'index', width: 60 },
    { title: '品牌名称', dataIndex: 'name', key: 'name' },
    { title: '预约人数', dataIndex: 'count', key: 'count', align: 'right' as const },
    { title: '预约占比', dataIndex: 'percentage', key: 'percentage', align: 'right' as const },
  ]

  const brandData = [
    { key: 1, index: 1, name: '爱康', count: 700, percentage: '35%' },
    { key: 2, index: 2, name: '美年', count: 500, percentage: '25%' },
    { key: 3, index: 3, name: '慈铭', count: 300, percentage: '15%' },
    { key: 4, index: 4, name: '瑞慈', count: 200, percentage: '10%' },
    { key: 5, index: 5, name: '公立医院', count: 160, percentage: '8%' },
    { key: 6, index: 6, name: '城市品牌', count: 100, percentage: '7%' },
  ]

  return (
    <Card
      title="预约占比"
      extra={
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="small"
          items={[
            { key: 'brand', label: '品牌占比' },
            { key: 'store', label: '门店占比' },
          ]}
        />
      }
    >
      <Table columns={brandColumns} dataSource={brandData} pagination={false} size="small" />
    </Card>
  )
}

export default CustomerReple


