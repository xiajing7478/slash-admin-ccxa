import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, Image, App } from 'antd'
import { useNavigate } from 'react-router-dom'
import { randomNum, encryption } from '@/utils'
import styles from './index.module.less'
import useAuthStore from '@/store/authStore'
import { setAuthToken } from '@/utils/auth'
import { obtainUniqueCode, LoginByUsername } from '@/api/login'

interface LoginFormValues {
  username: string
  password: string
  code: string
  randomStr?: string
}

const Login: React.FC = () => {
  const [code, setCode] = useState<string>('')
  const [randomStr, setRandomStr] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const { message } = App.useApp()

  const { setToken } = useAuthStore()
  // 从 URL 中获取重定向路径
  const from = new URLSearchParams(window.location.search).get('redirect') || '/'
  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    const { username, password, code } = values
    const { data } = await obtainUniqueCode()

    const user = {
      username,
      password: encryption(data.substring(0, 10) + password + data.substring(10, data.length)),
      code,
      randomStr,
    }
    try {
      const { access_token, refresh_token }: any = await LoginByUsername(user)
      setAuthToken(access_token)
      setToken(access_token, refresh_token)
      console.log('access_token....', access_token)
      console.log('from....', from)
      navigate(from, { replace: true })
      return
    } catch (error) {
      message.error((error as any)?.message || '登录失败')
      getCaptchCode()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCaptchCode()
  }, [])

  const getCaptchCode = () => {
    const randomCode = randomNum(4, true)
    const result = `${import.meta.env.VITE_APP_BASEURLAPI}/code?randomStr=${randomCode}`
    setRandomStr(randomCode)
    setCode(result)
  }

  return (
    <div className={styles.loginWrapper}>
      <Form size="large" name="login" onFinish={onFinish} className={styles.loginForm} initialValues={{ username: 'andy.xia', password: 'Xj@1234' }}>
        <h2 className={styles.loginTitle}>登录</h2>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Row gutter={8}>
            <Col span={16}>
              <Form.Item name="code" noStyle rules={[{ required: true, message: '请输入验证码' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>{code && <Image preview={false} src={code} alt="code" onClick={getCaptchCode} />}</Col>
          </Row>
        </Form.Item>
        <Form.Item style={{ marginTop: 12 }}>
          <Button size="large" type="primary" loading={loading} htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
