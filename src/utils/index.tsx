import * as CryptoJS from 'crypto-js'
import useAuthStore from '@/store/authStore'
/**
 * 生成随机len位数字
 */
export function randomNum(len: number, flag: boolean) {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4)
  if (flag) {
    random += Date.now()
  }
  return random
}

/**
 * 序列化对象为URL查询字符串
 * @param data - 需要序列化的对象，键为字符串，值为字符串或数字
 * @returns 返回序列化后的URL查询字符串，格式为 "key1=value1&key2=value2"
 */
export const serialize = (data: { [x: string]: string | number }) => {
  const params: string[] = [] // 用于存储序列化后的参数数组
  Object.keys(data).forEach(key => {
    params.push(`${key}=${data[key]}`)
  })
  return params.join('&') // 用 "&" 符号连接所有参数，返回最终的查询字符串
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(context, args)
      timer = null
    }, delay)
  }
}

export const encryption = (str: string) => {
  const key = CryptoJS.enc.Latin1.parse('thanks,uluhcloud')
  const iv = key
  const encrypted = CryptoJS.AES.encrypt(str.trim(), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  })
  return encrypted.toString()
}

export const getResponseCode = (code: number | undefined) => {
  return code === 0 ? true : false
}

// 判断是否有按钮权限
export const useHasPermission = (code: string) => {
  const { permissions } = useAuthStore()
  return permissions.includes(code)
}

/**
 * 数组返回的key值转换为select组件option的标准 {label: xxx, value: xxx}
 * const formattedData = transformToSelectOption(res.data || [], { labelKey: 'name', valueKey: 'tenantId' })
 * const formattedData = transformToSelectOption(res.data || [], { labelKey: 'name', valueKey: 'bid' })
 */

export const transformToSelectOption = (arr: any[], keys: { labelKey: string; valueKey: string }) => {
  return arr.map((item: any) => {
    return {
      ...item,
      label: item[keys.labelKey],
      value: item[keys.valueKey],
    }
  })
}
