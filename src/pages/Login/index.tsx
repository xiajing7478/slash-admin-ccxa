import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import { randomNum } from '@/utils'
// import { randomNum, encryption } from '@/utils'
// import { login } from '@/api/login'
import styles from './index.module.less'

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
  const navigate = useNavigate()
  const onFinish = (values: LoginFormValues) => {
    const { username, password } = values
    if (username === 'andy.xia' && password === 'Xj@1234') {
      message.success(`登录成功，欢迎 ${values.username}`)
      // 这里可以添加实际的登录逻辑
      localStorage.setItem('access_token', '59ec5801-b873-4566-b4ef-e3d026a1c542')
      // 跳转到仪表盘,  在事件或副作用中触发跳转
      navigate('/', { replace: true })
    } else {
      message.error('用户名或密码错误')
    }
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
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
