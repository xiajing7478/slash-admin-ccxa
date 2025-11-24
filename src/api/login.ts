import request from '@/api/request'
import { type ApiResponse } from '@/types/api'
export const obtainUniqueCode = () => {
  return request({
    url: '/auth/obtainUniqueCode/get',
    method: 'get',
  })
}

export const LoginByUsername = async ({
  username,
  password,
  code,
  randomStr,
}: {
  username: string
  password: string
  code: string
  randomStr: string
}) => {
  return request({
    url: `/auth/oauth/token`,
    headers: {
      isToken: false,
      isEnd: 1 /*表示接口需要验证码验证*/,
      Authorization: 'Basic aGNsb3VkOmhjbG91ZA==',
    },
    method: 'post',
    params: {
      username,
      password,
      code,
      randomStr,
      grant_type: 'password',
      scope: 'server',
    },
  })
}

// 获取用户信息
export const getUserInfo = async (): Promise<ApiResponse<any>> => {
  return request({
    url: '/admin/user/info',
    method: 'get',
  })
}

// 获取菜单
export const getMenu = (): Promise<ApiResponse<any>> => {
  return request({
    url: '/admin/menu',
    method: 'get',
  })
}

// 获取公司列表
export const getcompanyList = (): Promise<ApiResponse<any>> => {
  return request({
    url: '/center/cxaenterprise/getList',
    method: 'get',
  })
}

// 通过公司tenantId获取计划列表
export const getPlanListByTenantId = (tenantId: string): Promise<ApiResponse<any>> => {
  return request({
    url: '/health/chplanbasicinfo/getAll',
    method: 'get',
    params: {
      tenantId,
    },
  })
}

// 通过搜索获取订单列表数据
export const getOrderListBySearch = (params: any): Promise<ApiResponse<any>> => {
  return request({
    url: '/health/chorder/page',
    method: 'get',
    params,
  })
}

// 通过搜索获取计划列表数据
export const getPlanListBySearch = (params: any): Promise<ApiResponse<any>> => {
  return request({
    url: '/health/chplanbasicinfo/pageInfo',
    method: 'get',
    params,
  })
}

// 根据字典获取字典项
export const getDictListType = (dictType: string): Promise<ApiResponse<any>> => {
  return request({
    url: `/center/dict/type/${dictType}`,
    method: 'get',
  })
}
