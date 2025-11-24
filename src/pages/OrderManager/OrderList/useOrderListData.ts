import { useCallback, useEffect, useMemo, useState } from 'react'
import { getcompanyList, getPlanListByTenantId, getOrderListBySearch, getDictListType } from '@/api/login'
import { getResponseCode, transformToSelectOption } from '@/utils'

interface SelectOption {
  label: string
  value: string | number
}

interface PaginationParams {
  current: number
  size: number
}

export const useOrderListData = () => {
  // 搜索枚举
  const [companyList, setCompanyList] = useState<SelectOption[]>([])
  const [planList, setPlanList] = useState<SelectOption[]>([])
  const [orderStatusList, setOrderStatusList] = useState<Array<{ label: string; value: string | number }>>([])
  const [genderList, setGenderList] = useState<Array<{ label: string; value: string | number }>>([])
  const [maritalStatusList, setMaritalStatusList] = useState<SelectOption[]>([])
  // 订单类型
  const [planTypeList, setPlanTypeList] = useState<SelectOption[]>([])
  // 员工关系 family_relationship
  const [familyRelationshipList, setFamilyRelationshipList] = useState<SelectOption[]>([])
  // 支付方式 pay_type
  const [payTypeList, setPayTypeList] = useState<SelectOption[]>([])

  // 新增用户
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  // 表格数据
  const [tableData, setTableData] = useState<any[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  // 初始化：公司、字典等
  const initBasicData = useCallback(async () => {
    const tasks = [
      getcompanyList(),
      getDictListType('order_status'),
      getDictListType('sex_type'),
      getDictListType('marital_status'),
      getDictListType('planType'),
      getDictListType('family_relationship'),
      getDictListType('pay_type'),
    ] as const

    try {
      const [companyRes, orderStatusRes, genderRes, maritalStatusRes, planTypeRes, familyRelationshipRes, payTypeRes] = await Promise.all(tasks)

      if (getResponseCode(companyRes.code)) {
        setCompanyList(transformToSelectOption(companyRes.data || [], { labelKey: 'name', valueKey: 'tenantId' }))
      } else {
        setCompanyList([])
      }

      if (getResponseCode(orderStatusRes.code)) {
        setOrderStatusList(orderStatusRes.data || [])
      } else {
        setOrderStatusList([])
      }

      if (getResponseCode(genderRes.code)) {
        setGenderList(genderRes.data || [])
      } else {
        setGenderList([])
      }

      if (getResponseCode(maritalStatusRes.code)) {
        setMaritalStatusList(maritalStatusRes.data || [])
      } else {
        setMaritalStatusList([])
      }

      if (getResponseCode(planTypeRes.code)) {
        setPlanTypeList(planTypeRes.data || [])
      }

      if (getResponseCode(familyRelationshipRes.code)) {
        setFamilyRelationshipList(familyRelationshipRes.data || [])
      }

      if (getResponseCode(payTypeRes.code)) {
        setPayTypeList(payTypeRes.data || [])
      } else {
        setPayTypeList([])
      }
    } catch {
      // 请求失败时兜底
      setCompanyList([])
      setOrderStatusList([])
      setGenderList([])
      setMaritalStatusList([])
      setFamilyRelationshipList([])
      setPayTypeList([])
    }
  }, [])

  // 获取表格数据
  const getTableList = useCallback(async (params: PaginationParams & Record<string, any>) => {
    setLoading(true)
    try {
      const res = await getOrderListBySearch({ ...params, maskingFlag: 0 })
      if (getResponseCode(res.code)) {
        setTableData(res.data?.records || [])
        setTotal(res.data?.total || 0)
      } else {
        setTableData([])
      }
    } catch {
      setTableData([])
    } finally {
      setLoading(false)
    }
  }, [])

  // 公司变化后获取计划列表
  const getPlanList = useCallback(async (tenantId: string) => {
    if (!tenantId) {
      setPlanList([])
      return
    }
    try {
      const res = await getPlanListByTenantId(tenantId)
      if (getResponseCode(res.code)) {
        setPlanList(transformToSelectOption(res.data || [], { labelKey: 'name', valueKey: 'bid' }))
      } else {
        setPlanList([])
      }
    } catch {
      setPlanList([])
    }
  }, [])

  // 首次加载
  useEffect(() => {
    initBasicData()
    // 默认加载第一页
    getTableList({ current: 1, size: 10 })
  }, [initBasicData, getTableList])

  // 导出供页面使用的渲染辅助
  const renderers = useMemo(() => {
    return {
      renderOrderStatus: (value: string | number) => orderStatusList.find(item => item.value === String(value))?.label || '',
      renderGender: (value: string | number) => genderList.find(item => item.value === String(value))?.label || '',
      renderMaritalStatus: (value: string | number) => maritalStatusList.find(item => item.value === String(value))?.label || '',
      renderPlanTypeStatus: (value: string | number) => planTypeList.find(item => item.value === String(value))?.label || '',
      renderFamilyRelationship: (value: string | number) => familyRelationshipList.find(item => item.value === String(value))?.label || '',
      renderPayType: (value: string | number) => payTypeList.find(item => item.value === String(value))?.label || '',
    }
  }, [orderStatusList, genderList, maritalStatusList, planTypeList, familyRelationshipList, payTypeList])

  return {
    // 搜索下拉
    companyList,
    planList,
    setPlanList,
    orderStatusList,
    genderList,
    maritalStatusList,
    // 表格
    tableData,
    total,
    loading,
    // actions
    initBasicData,
    getPlanList,
    getTableList,
    // render helpers
    renderers,
    addUserOpen,
    setAddUserOpen,
  }
}

export default useOrderListData
