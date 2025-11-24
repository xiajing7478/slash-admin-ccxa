import SearchForm from '@/components/basic/Search'
import { type SearchField } from '@/components/basic/Search'
import useOrderListData from './useOrderListData'
import OperateActions from '@/components/Business/OperateActions'
// import CommonDialog from '@/components/basic/Dialog'
import DataTable from '@/components/Business/DataTable'
import { type OperateActionsState } from '@/components/Business/OperateActions/type'
import { CiExport, CiImport, CiViewList } from 'react-icons/ci'
import { FiCheckCircle, FiCheckSquare, FiRefreshCw, FiEdit3 } from 'react-icons/fi'
import { RiCalendarCheckLine } from 'react-icons/ri'
import styles from './index.module.less'
import classNames from 'classnames'
import { Button, Dropdown, Space, Switch } from 'antd'
import { Permission } from '@/components/Permission'
import { MoreOutlined } from '@ant-design/icons'
import AddUser from './components/AddUser'
import AddPlan from './components/AddPlan'
import { type TableProps } from 'antd'
import { useState } from 'react'

const OrderList: React.FC = () => {
  const { companyList, planList, setPlanList, tableData, total, loading, getPlanList, getTableList, renderers, setAddUserOpen, addUserOpen } =
    useOrderListData()

  const [testShow, setTestShow] = useState<boolean>(false)

  // 处理公司选择变化，清空计划选择并重新加载计划列表
  const handleCompanyChange = async (tenantId: string, form: any) => {
    console.log('公司选择变化:', tenantId)

    // 清空计划选择
    form.setFieldValue('planBid', undefined)
    setPlanList([])

    // 如果选择了公司，加载对应的计划列表
    if (tenantId) {
      await getPlanList(tenantId)
    }
  }

  const basicFields: SearchField[] = [
    {
      key: 'orderNo',
      label: '订单号',
      type: 'input',
    },
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
    },
    {
      key: 'cardNo',
      label: '证件号',
      type: 'input',
    },
    // 预约人
    {
      key: 'appointmentUser',
      label: '预约人',
      type: 'input',
    },
    // 员工姓名 employeeName
    {
      key: 'employeeName',
      label: '员工姓名',
      type: 'input',
    },
    // 手机号 telephone
    {
      key: 'telephone',
      label: '手机号',
      type: 'input',
    },
    // 门店名称 storeName
    {
      key: 'storeName',
      label: '门店名称',
      type: 'input',
    },
    // 门店ID storeBid
    {
      key: 'storeBid',
      label: '门店ID',
      type: 'input',
    },
    {
      key: 'supplierBid',
      label: '供应商',
      type: 'select',
      options: companyList,
    },
    // 订单状态 orderStatus
    {
      key: 'orderStatusList',
      label: '订单状态',
      type: 'select',
      placeholder: '请选择订单状态',
      options: companyList,
    },
    // 订单标签 orderTag
    {
      key: 'orderTag',
      label: '订单标签',
      type: 'select',
      options: companyList,
    },
    // 订单分类 orderNoDealWithDays
    {
      key: 'orderNoDealWithDays',
      label: '订单分类',
      type: 'select',
      options: companyList,
    },
    // 是否为虚拟订单 isFictitiousOrder
    {
      key: 'isFictitiousOrder',
      label: '是否为虚拟订单',
      type: 'select',
      options: companyList,
    },
    // 订单类型 orderType
    {
      key: 'orderType',
      label: '订单类型',
      type: 'select',
      options: companyList,
    },
    // 是否为抢号订单 isGlab
    {
      key: 'isGlab',
      label: '是否为抢号订单',
      type: 'select',
      options: companyList,
    },
    // 预约日期
    {
      key: 'appointmentDate',
      label: '预约日期',
      type: 'dateRange',
    },
    // 下单日期
    {
      key: 'createStartTime',
      label: '下单日期',
      type: 'dateRange',
    },
  ]

  const handleSearch = (values: Record<string, any>) => {
    console.log('搜索条件:', values)
    // 这里可以根据搜索条件调用订单列表接口
  }

  const handleReset = () => {
    console.log('重置搜索')
  }

  // 操作栏数据
  const actions: OperateActionsState[] = [
    {
      key: 'data-export',
      text: '数据导出',
      onClick: () => {
        console.log('创建订单')
        setAddUserOpen(true)
      },
      icon: <CiExport />,
    },
    {
      key: 'view-export-status',
      text: '查看导出情况',
      onClick: () => {
        setTestShow(true)
        console.log('查看导出情况')
      },
      icon: <CiViewList />,
    },
    {
      key: 'batch-import-order',
      text: '批量导入订单',
      onClick: () => {
        console.log('批量导入订单')
      },
      icon: <CiImport />,
      permissionCode: 'batch-modify-settlement-price-btn',
    },
    // 批量已到检
    {
      key: 'batch-arrived',
      text: '批量已到检',
      onClick: () => {
        console.log('批量已到检')
      },
      icon: <FiCheckCircle />,
    },
    // 批量已完成
    {
      key: 'batch-completed',
      text: '批量已完成',
      onClick: () => {
        console.log('批量已完成')
      },
      icon: <FiCheckSquare />,
    },
    //批量预约成功
    {
      key: 'batch-appointment-success',
      text: '批量预约成功',
      onClick: () => {
        console.log('批量预约成功')
      },
      icon: <RiCalendarCheckLine />,
    },
    // 查看导入情况
    {
      key: 'view-import-status',
      text: '查看导入情况',
      onClick: () => {
        console.log('查看导入情况')
      },
      icon: <CiViewList />,
    },
    // 更新单号重推
    {
      key: 'update-order-number',
      text: '更新单号重推',
      onClick: () => {
        console.log('更新单号重推')
      },
      icon: <FiRefreshCw />,
    },
    // 加项包数据导出
    {
      key: 'add-item-package-data-export',
      text: '加项包数据导出',
      onClick: () => {
        console.log('加项包数据导出')
      },
      icon: <CiExport />,
    },
    // 导出供应商结算价
    {
      key: 'export-supplier-settlement-price',
      text: '导出供应商结算价',
      onClick: () => {
        console.log('导出供应商结算价')
      },
      icon: <CiExport />,
    },
    // 供应商结算价导出情况
    {
      key: 'supplier-settlement-price-export-status',
      text: '供应商结算价导出情况',
      onClick: () => {
        console.log('供应商结算价导出情况')
      },
      icon: <CiViewList />,
    },
    // 导出客户端结算价
    {
      key: 'export-client-settlement-price',
      text: '导出客户端结算价',
      onClick: () => {
        console.log('导出客户端结算价')
      },
      icon: <CiExport />,
    },
    // 客户端结算价导出情况
    {
      key: 'client-settlement-price-export-status',
      text: '客户端结算价导出情况',
      onClick: () => {
        console.log('客户端结算价导出情况')
      },
      icon: <CiViewList />,
    },
    // 批量修改结算价
    {
      key: 'batch-modify-settlement-price',
      text: '批量修改结算价',
      onClick: () => {
        console.log('批量修改结算价')
      },
      icon: <FiEdit3 />,
      permissionCode: 'batch-modify-settlement-price-btn',
    },
  ]

  // 表格头部
  const tableColumns: TableProps[] = [
    // 订单状态 status
    {
      key: 'status',
      title: '订单状态',
      dataIndex: 'status',
      fixed: 'left',
      render: (text: string) => renderers.renderOrderStatus(text),
    },
    // 订单编号
    {
      key: 'orderNo',
      title: '订单编号',
      dataIndex: 'orderNo',
      fixed: 'left',
    },
    // 预约人 appointmentUser
    {
      key: 'appointmentUser',
      title: '预约人',
      dataIndex: 'appointmentUser',
    },
    // 证件号码 cardNo
    {
      key: 'cardNo',
      title: '证件号码',
      dataIndex: 'cardNo',
    },
    // 性别 gender
    {
      key: 'gender',
      title: '性别',
      dataIndex: 'gender',
      render: (text: string) => renderers.renderGender(text),
    },
    // 婚姻状况 married
    {
      key: 'married',
      title: '婚姻状况',
      dataIndex: 'married',
      render: (text: string) => renderers.renderMaritalStatus(text),
    },
    // 联系电话 telephone
    {
      key: 'telephone',
      title: '联系电话',
      dataIndex: 'telephone',
    },
    // 所属公司 talentName
    {
      key: 'talentName',
      title: '所属公司',
      dataIndex: 'talentName',
    },
    // 订单类型 orderType
    {
      key: 'orderType',
      title: '订单类型',
      dataIndex: 'orderType',
      render: (text: string) => renderers.renderPlanTypeStatus(text),
    },
    // 所属计划 projectName
    {
      key: 'projectName',
      title: '所属计划',
      dataIndex: 'projectName',
    },
    // 员工类型 employeeTypeName
    {
      key: 'employeeTypeName',
      title: '员工类型',
      dataIndex: 'employeeTypeName',
    },
    // 员工姓名 employeeName
    {
      key: 'package',
      title: '员工姓名',
      dataIndex: 'employeeName',
    },
    // 与员工关系 familyType
    {
      key: 'familyType',
      title: '与员工关系',
      dataIndex: 'familyType',
      render: (text: string) => renderers.renderFamilyRelationship(text),
    },
    // 员工证件号 employeeCard
    {
      key: 'employeeCard',
      title: '员工证件号',
      dataIndex: 'employeeCard',
    },
    // 预约日期 appointmentDate
    {
      key: 'appointmentDate',
      title: '预约日期',
      dataIndex: 'appointmentDate',
      render: (text: string, record: { timeInterval: string; period: string }) => {
        let _text = text.length <= 10 ? text : text.substring(0, 10)
        if (record.timeInterval) {
          _text += ` ${record.timeInterval}`
        }
        if (record.period) {
          _text += ` ${record.period}`
        }
        return _text
      },
    },
    // 实际对接日期 actualAppointTime
    {
      key: 'actualAppointTime',
      title: '实际对接日期',
      dataIndex: 'actualAppointTime',
    },
    // 供应商 supplierName
    {
      key: 'supplierName',
      title: '供应商',
      dataIndex: 'supplierName',
    },
    // 所在城市 cityName
    {
      key: 'cityName',
      title: '所在城市',
      dataIndex: 'cityName',
    },
    // 预约门店 appointmentStoreName
    {
      key: 'appointmentStoreName',
      title: '预约门店',
      dataIndex: 'appointmentStoreName',
      render: (text: string, record: { vipDepartment: string }) => text + record.vipDepartment,
    },
    // 所选套餐 packageName
    {
      key: 'packageName',
      title: '所选套餐',
      dataIndex: 'packageName',
    },
    // 所选加项包 packageAdditionName
    {
      key: 'packageAdditionName',
      title: '所选加项包',
      dataIndex: 'packageAdditionName',
    },
    // 落单套餐名称 packageName
    {
      key: 'beAlonePackageName',
      title: '落单套餐名称',
      dataIndex: 'beAlonePackageName',
    },
    // 供应商套餐名称 supplierPackageName
    {
      key: 'supplierPackageName',
      title: '供应商套餐名称',
      dataIndex: 'supplierPackageName',
    },
    // 订单总额 orderAmount
    {
      key: 'orderAmount',
      title: '订单总额',
      dataIndex: 'orderAmount',
    },
    // 实际报销金额 packageName
    {
      key: 'actualReimburseAmount',
      title: '实际报销金额',
      dataIndex: 'actualReimburseAmount',
    },
    // 预算抵扣金额 packageName
    {
      key: 'pointAmount',
      title: '预算抵扣金额',
      dataIndex: 'pointAmount',
    },
    // flex积分抵扣金额 freePointAmount
    {
      key: 'freePointAmount',
      title: 'flex积分抵扣金额',
      dataIndex: 'freePointAmount',
    },
    // fsa抵扣金额 fsaAmount
    {
      key: 'fsaAmount',
      title: 'fsa抵扣金额',
      dataIndex: 'fsaAmount',
    },
    // gea抵扣金额 subxAmount
    {
      key: 'subxAmount',
      title: 'gea抵扣金额',
      dataIndex: 'subxAmount',
    },
    // ckup抵扣金额 ckupAmount
    {
      key: 'ckupAmount',
      title: 'ckup抵扣金额',
      dataIndex: 'ckupAmount',
    },
    // unc抵扣金额 uncAmount
    {
      key: 'uncAmount',
      title: 'unc抵扣金额',
      dataIndex: 'uncAmount',
    },
    // und抵扣金额 undAmount
    {
      key: 'undAmount',
      title: 'und抵扣金额',
      dataIndex: 'undAmount',
    },
    // une抵扣金额 uneAmount
    {
      key: 'uneAmount',
      title: 'une抵扣金额',
      dataIndex: 'uneAmount',
    },
    // hmbg抵扣金额 hmbgAmount
    {
      key: 'hmbgAmount',
      title: 'hmbg抵扣金额',
      dataIndex: 'hmbgAmount',
    },
    // mte抵扣金额 mteAmount
    {
      key: 'mteAmount',
      title: 'mte抵扣金额',
      dataIndex: 'mteAmount',
    },
    // fbg抵扣金额 fbgAmount
    {
      key: 'fbgAmount',
      title: 'fbg抵扣金额',
      dataIndex: 'fbgAmount',
    },
    // tcbg抵扣金额 tcbgAmount
    {
      key: 'tcbgAmount',
      title: 'tcbg抵扣金额',
      dataIndex: 'tcbgAmount',
    },
    // vip抵扣金额 discountAmount
    {
      key: 'discountAmount',
      title: 'vip抵扣金额',
      dataIndex: 'discountAmount',
    },
    // 灵活积分抵扣金额 quotaAmount
    {
      key: 'quotaAmount',
      title: '灵活积分抵扣金额',
      dataIndex: 'quotaAmount',
    },
    // 固定积分抵扣金额 quotaCheckAmount
    {
      key: 'quotaCheckAmount',
      title: '固定积分抵扣金额',
      dataIndex: 'quotaCheckAmount',
    },
    // 其他抵扣金额 otherAmount
    {
      key: 'otherAmount',
      title: '其他抵扣金额',
      dataIndex: 'otherAmount',
    },
    // 现金支付金额 cashAmount
    {
      key: 'cashAmount',
      title: '现金支付金额',
      dataIndex: 'cashAmount',
    },
    // vip标识 vipMark
    {
      key: 'vipMark',
      title: 'vip标识',
      dataIndex: 'vipMark',
    },
    // 支付方式 payType
    {
      key: 'payType',
      title: '支付方式',
      dataIndex: 'payType',
      render: (text: string) => renderers.renderPayType(text),
    },
    // 是否为虚拟订单 isFictitiousOrder
    {
      key: 'isFictitiousOrder',
      title: '是否为虚拟订单',
      dataIndex: 'isFictitiousOrder',
      render: (text: string) => (text === '1' ? '是' : '否'),
    },
    // 是否为抢号订单 isGlab
    {
      key: 'isGlab',
      title: '是否为抢号订单',
      dataIndex: 'isGlab',
      render: (text: string) => (text === '1' ? '是' : '否'),
    },
    // 支付流水号 payNo
    {
      key: 'payNo',
      title: '支付流水号',
      dataIndex: 'payNo',
    },
    // 订单是否发短信 status
    {
      key: 'status',
      title: '订单是否发短信',
      dataIndex: 'status',
      render(_: string, record: { status: number }) {
        return (
          <Permission code="whether_to_send">
            <Switch checkedChildren="有感" unCheckedChildren="无感" checked={record.status === 6 ? true : false} onChange={() => {}} />
          </Permission>
        )
      },
    },
    // 供应商结算价(元) supplierSettlementPrice
    {
      key: 'supplierSettlementPrice',
      title: '供应商结算价(元)',
      dataIndex: 'supplierSettlementPrice',
    },
    // 客户端结算价(元) clientSettlementPrice
    {
      key: 'clientSettlementPrice',
      title: '客户端结算价(元)',
      dataIndex: 'clientSettlementPrice',
      render: (text: string) => <Permission code="supplierSettlementPrice">{text ? text : ''}</Permission>,
    },
    // 用户订单结算价(元) userSettlementPrice
    {
      key: 'userSettlementPrice',
      title: '用户订单结算价(元)',
      dataIndex: 'userSettlementPrice',
      render: (text: string) => <Permission code="userSettlementPrice">{text ? text : ''}</Permission>,
    },
    // 订单创建时间 createTime
    {
      key: 'createTime',
      title: '订单创建时间',
      dataIndex: 'createTime',
    },
    // 对接信息 geaAmount
    {
      key: 'geaAmount',
      title: '对接信息',
      dataIndex: 'geaAmount',
      render: (_: string, record: { supplierInfo: any }) => (
        <Button type="link" onClick={() => showSupplierInfo(record.supplierInfo)}>
          查看
        </Button>
      ),
    },
    // 操作 actionKey
    {
      key: 'action',
      title: '操作',
      fixed: 'right',
      align: 'center',
      render: ({
        source,
        status,
        orderType,
        supplierBid,
        showSupplierSettlementPrice,
        tenantId,
      }: {
        source: number
        status: number
        orderType: number
        supplierBid: string
        showSupplierSettlementPrice: number
        tenantId: number
      }) => {
        // <!-- orderType:1年度体检订单  2入职体检订单 -->
        // <!--  待付款0 待确认1 预约失败2 预约成功3 已到检4 已完成5 已取消6,未到检-2, 取消中:-1, 待确认:-3 -->
        // return (
        //   <Space size={0} className={styles['action-space']}>
        //     {source !== 30 || (((status >= 0 && status <= 3) || status === -2) && <Button type="link">取消订单</Button>)}
        //     {status === 0 && <Button type="link">上传付款凭证</Button>}
        //     {orderType === 1 && (status === 0 || status === 2) && <Button type="link">{status === 0 ? '付款短信' : '发送短信'}</Button>}
        //     {orderType === 2 && (status === 0 || status === 2) && <Button type="link">发送短信</Button>}
        //     {status === 0 && <Button type="link">付款确认</Button>}
        //     {status === 1 && <Button type="link">重推</Button>}
        //     {(status === 1 || status === 3 || status === -2) && <Button type="link">修改订单</Button>}
        //     {status === 1 && <Button type="link">约检成功</Button>}
        //     {status === 1 && <Button type="link">约检失敗</Button>}
        //     {status === 3 && <Button type="link">未到检</Button>}
        //     {status === 3 && <Button type="link">查看卡号</Button>}
        //     {(status === 3 || status === -2) && <Button type="link">已到检</Button>}
        //     {status === 4 && <Button type="link">已完成</Button>}
        //     {status === 4 && source !== -11 && (
        //       <Permission code="CheckedToAppointment">
        //         <Button type="link">预约成功</Button>
        //       </Permission>
        //     )}
        //     {status === 4 && source !== -11 && orderType !== 2 && (
        //       <Permission code="CheckedToModificationOrder">
        //         <Button type="link">修改订单</Button>
        //       </Permission>
        //     )}
        //     {status === -1 && <Button type="link">已取消</Button>}
        //     {status === -3 && (
        //       <Permission code="AppointmentingToToBeConfirmed">
        //         <Button type="link">待确认</Button>
        //       </Permission>
        //     )}
        //     {status === 5 && <Button type="link">查看报告</Button>}
        //     <Button type="link">查看详情</Button>
        //     {status === 1 && import.meta.env.VITE_APP_COMPANY_ID !== tenantId && (
        //       <>
        //         <Permission code="order_special_docking">
        //           <Button type="link">特殊对接</Button>
        //         </Permission>
        //         <Permission code="health_chorder_special_edit">
        //           <Button type="link">特殊修改</Button>
        //         </Permission>
        //       </>
        //     )}
        //     <Button type="link">备注</Button>
        //     <Button type="link">复制</Button>
        //     {orderType === 2 && <Button type="link">查看入职邮箱</Button>}
        //     {status === 5 && supplierBid === '1337247566386348034' && <Button type="link">瑞慈特殊对接</Button>}
        //     {showSupplierSettlementPrice === 1 && <Button type="link">修改供应商结算价</Button>}
        //     <Permission code="modify-supplier-client-price-btn">
        //       <Button type="link">修改客户端结算价</Button>
        //     </Permission>
        //     <Permission code="settlement-modify-log">
        //       <Button type="link">结算价修改日志</Button>
        //     </Permission>
        //   </Space>
        // )
        // 收集所有按钮
        const allButtons = []

        // 添加所有按钮到数组
        if (source !== 30 || (status >= 0 && status <= 3) || status === -2) {
          allButtons.push(
            <Button key="cancel" type="link">
              取消订单
            </Button>,
          )
        }
        if (status === 0) {
          allButtons.push(
            <Button key="upload" type="link">
              上传付款凭证
            </Button>,
          )
        }
        if (orderType === 1 && (status === 0 || status === 2)) {
          allButtons.push(
            <Button key="sms" type="link">
              {status === 0 ? '付款短信' : '发送短信'}
            </Button>,
          )
        }
        if (orderType === 2 && (status === 0 || status === 2)) {
          allButtons.push(
            <Button key="sms2" type="link">
              发送短信
            </Button>,
          )
        }
        if (status === 0) {
          allButtons.push(
            <Button key="payment" type="link">
              付款确认
            </Button>,
          )
        }
        if (status === 1) {
          allButtons.push(
            <Button key="repush" type="link">
              重推
            </Button>,
          )
        }
        if (status === 1 || status === 3 || status === -2) {
          allButtons.push(
            <Button key="modify" type="link">
              修改订单
            </Button>,
          )
        }
        if (status === 1) {
          allButtons.push(
            <Button key="success" type="link">
              约检成功
            </Button>,
          )
          allButtons.push(
            <Button key="fail" type="link">
              约检失敗
            </Button>,
          )
        }
        if (status === 3) {
          allButtons.push(
            <Button key="not-arrived" type="link">
              未到检
            </Button>,
          )
          allButtons.push(
            <Button key="view-card" type="link">
              查看卡号
            </Button>,
          )
        }
        if (status === 3 || status === -2) {
          allButtons.push(
            <Button key="arrived" type="link">
              已到检
            </Button>,
          )
        }
        if (status === 4) {
          allButtons.push(
            <Button key="completed" type="link">
              已完成
            </Button>,
          )
        }
        if (status === 4 && source !== -11) {
          allButtons.push(
            <Permission key="appointment" code="CheckedToAppointment">
              <Button type="link">预约成功</Button>
            </Permission>,
          )
        }
        if (status === 4 && source !== -11 && orderType !== 2) {
          allButtons.push(
            <Permission key="modify2" code="CheckedToModificationOrder">
              <Button type="link">修改订单</Button>
            </Permission>,
          )
        }
        if (status === -1) {
          allButtons.push(
            <Button key="canceled" type="link">
              已取消
            </Button>,
          )
        }
        if (status === -3) {
          allButtons.push(
            <Permission key="confirm" code="AppointmentingToToBeConfirmed">
              <Button type="link">待确认</Button>
            </Permission>,
          )
        }
        if (status === 5) {
          allButtons.push(
            <Button key="report" type="link">
              查看报告
            </Button>,
          )
        }

        // 始终显示的按钮
        allButtons.push(
          <Button key="detail" type="link">
            查看详情
          </Button>,
        )

        if (status === 1 && import.meta.env.VITE_APP_COMPANY_ID !== tenantId) {
          allButtons.push(
            <Permission key="special" code="order_special_docking">
              <Button type="link">特殊对接</Button>
            </Permission>,
          )
          allButtons.push(
            <Permission key="special-edit" code="health_chorder_special_edit">
              <Button type="link">特殊修改</Button>
            </Permission>,
          )
        }

        allButtons.push(
          <Button key="remark" type="link">
            备注
          </Button>,
        )
        allButtons.push(
          <Button key="copy" type="link">
            复制
          </Button>,
        )

        allButtons.push(
          <Button key="add" type="link" onClick={onAddUser}>
            新增
          </Button>,
        )

        if (orderType === 2) {
          allButtons.push(
            <Button key="email" type="link">
              查看入职邮箱
            </Button>,
          )
        }

        if (status === 5 && supplierBid === '1337247566386348034') {
          allButtons.push(
            <Button key="special-connection" type="link">
              瑞慈特殊对接
            </Button>,
          )
        }

        if (showSupplierSettlementPrice === 1) {
          allButtons.push(
            <Button key="supplier-price" type="link">
              修改供应商结算价
            </Button>,
          )
        }

        allButtons.push(
          <Permission key="client-price" code="modify-supplier-client-price-btn">
            <Button type="link">修改客户端结算价</Button>
          </Permission>,
        )

        allButtons.push(
          <Permission key="price-log" code="settlement-modify-log">
            <Button type="link">结算价修改日志</Button>
          </Permission>,
        )

        // 分割按钮为显示部分和下拉部分
        const visibleButtons = allButtons.slice(0, 3)
        const dropdownButtons = allButtons.slice(3)

        // 创建下拉菜单项
        const menuItems = dropdownButtons.map((btn, index) => {
          const key = `dropdown-item-${index}`
          return {
            key,
            label: btn,
          }
        })

        // 渲染结果
        return (
          <Space size={0} className={styles['action-space']}>
            {visibleButtons}
            {dropdownButtons.length > 0 && (
              <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
                <Button type="link" icon={<MoreOutlined />} />
              </Dropdown>
            )}
          </Space>
        )
      },
    },
  ]
  // 新增用户
  const onAddUser = () => {
    setAddUserOpen(true)
    console.log('新增用户')
  }

  // 查看对接信息详情
  const showSupplierInfo = (supplierInfo: any) => {
    console.log('supplierInfo.....', supplierInfo)
  }

  // 页码&条目数处理
  const onPaginationChange = (current: number, size: number) => {
    getTableList({
      current,
      size,
    })
  }

  return (
    <div className={styles['ordrList-wrap']}>
      {/* 表单搜索 */}
      <SearchForm className="ordrList-search-form" fields={basicFields} onSearch={handleSearch} onReset={handleReset} />
      {/* 操作按钮 */}
      <div className={`${styles['ordrList-operate-actions']}`}>
        <OperateActions actions={actions} />
        {/* <Permission code="batch-modify-settlement-price-btn">
          <Button size="small">创建订单</Button>
        </Permission> */}
        {/* {useHasPermission('batch-modify-settlement-price-btn') && <Button size="small">批量修改结算价</Button>} */}
      </div>
      {/* 表格 */}
      <div className={classNames(styles['ordrList-table'], styles['ordrList-operate-actions'])}>
        <DataTable
          rowKey="id"
          loading={loading}
          total={total}
          dataSource={tableData}
          columns={tableColumns}
          onPaginationChange={onPaginationChange}
        />
      </div>
      {/* 新增用户弹窗 */}
      {addUserOpen && <AddUser title="新增用户" open={addUserOpen} onCancel={() => setAddUserOpen(false)} centered={true} />}
      {/* {testShow && <CommonDialog onCancel={() => setTestShow(false)} onOk={() => setTestShow(false)} visible={testShow} children={<h1>haha</h1>} />} */}
      {testShow && <AddPlan onCancel={() => setTestShow(false)} onOk={() => setTestShow(false)} visible={testShow} />}
    </div>
  )
}

export default OrderList
