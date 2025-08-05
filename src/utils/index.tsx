import * as CryptoJS from 'crypto-js'
/**
 * 生成随机len位数字
 */
export function randomNum(len: number, date: boolean) {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4)
  if (date) {
    random += Date.now()
  }
  return random
}

type EncryptionType = 'Base64' | 'AES'

interface EncryptionParams {
  data: Record<string, any>
  type?: EncryptionType
  param: Array<string | number>
  key: string
}

export const encryption = (params: EncryptionParams) => {
  const { data, type, param } = params
  const { key } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach((ele: string | number) => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach((ele: string | number) => {
      const data = result[ele]
      const iv = CryptoJS.enc.Latin1.parse(key)
      // 加密
      const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

export const serialize = (data: { [x: string]: string | number }) => {
  const params: string[] = []
  Object.keys(data).forEach(key => {
    params.push(`${key}=${data[key]}`)
  })
  return params.join('&')
}
