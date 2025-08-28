import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import { randomNum } from '@/utils'
// import { randomNum, encryption } from '@/utils'
// import { login } from '@/api/login'
import styles from './index.module.less'
import useAuthStore from '@/store/authStore'
import { setAuthToken } from '@/utils/auth'
// import request from '@/utils/request'
import { useRouter } from '@/context/RouterContext'

interface LoginFormValues {
  username: string
  password: string
  remember: boolean
  code: string
  randomStr?: string
}

const Login: React.FC = () => {
  const [code, setCode] = useState<string>('')
  const [, setRandomStr] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const { updateRoutes } = useRouter()

  const login = useAuthStore(state => state.login)
  // 从 URL 中获取重定向路径
  const from = new URLSearchParams(window.location.search).get('redirect') || '/'
  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    const { username, password } = values
    if (username === 'andy.xia' && password === 'Xj@1234') {
      message.success(`登录成功，欢迎 ${values.username}`)
      // 这里可以添加实际的登录逻辑
      const token = '2762870e-d09b-49a5-872d-3f2a2d941ca4' // 模拟的 token
      login(token, { username, password })
      setAuthToken(token)
      await updateRoutes()
      navigate(from, { replace: true })
    } else {
      message.error('用户名或密码错误')
    }
    setLoading(false)
    // LoginByUsername({ ...values, randomStr })
  }

  // const LoginByUsername = async (userInfo: LoginFormValues) => {
  //   const user = encryption({
  //     data: userInfo,
  //     key: 'thanks,uluhcloud',
  //     param: ['password'],
  //   })
  //   console.log('user...', user)
  //   const res = await login(user)
  //   console.log('res...', res)
  // }

  useEffect(() => {
    const prefix = import.meta.env.VITE_APP_BASEURLAPI
    const randomCode = randomNum(4, true)
    const result = `${prefix}/code?randomStr=${randomCode}`
    setRandomStr(randomCode)
    setCode(result)
  }, [])

  return (
    <div className={styles.loginWrapper}>
      <Form
        name="login"
        onFinish={onFinish}
        className={styles.loginForm}
        initialValues={{ remember: true, username: 'andy.xia', password: 'Xj@1234' }}
      >
        <h2 className={styles.loginTitle}>登录</h2>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="code" noStyle rules={[{ required: true, message: 'Please input the captcha you got!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>{code && <img src={code} />}</Col>
          </Row>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" loading={loading} htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
