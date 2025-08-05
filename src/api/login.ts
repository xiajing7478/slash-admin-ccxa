import axios from '@/utils/request'

export const login = async ({ username, password, code, randomStr }: { username: string; password: string; code: string; randomStr: string }) => {
  return axios({
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

export const getUserInfo = async () => {
  return axios({
    url: '/admin/user/info',
    method: 'get',
  })
}

// 获取菜单
export function getMenu() {
  return axios({
    url: '/admin/menu',
    method: 'get',
  })
}
