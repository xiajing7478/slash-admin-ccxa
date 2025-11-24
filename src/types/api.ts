// 通用API响应格式
export interface ApiResponse<T = any> {
  code?: number
  msg?: string
  message?: string
  data?: T
  status?: number
}

// 通用API请求参数接口
export interface ApiParams {
  [key: string]: any
}

// 通用分页参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 通用分页响应
export interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
