import { Dropdown, Space, type MenuProps } from 'antd'
import { LogoutOutlined, DownOutlined } from '@ant-design/icons'
import useAuthStore from '@/store/authStore'
const items: MenuProps['items'] = [
  {
    key: '1',
    label: '首页',
  },
  {
    key: '2',
    label: '个人信息',
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    label: '退出系统',
    icon: <LogoutOutlined />,
    onClick: () => {
      // 退出系统
      localStorage.removeItem('authToken')
      useAuthStore.getState().logout()
      window.location.replace('/login')
    },
  },
]

const UserInfo = () => {
  const { userInfo } = useAuthStore()
  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <a onClick={e => e.preventDefault()}>
        <Space>
          {userInfo?.username}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default UserInfo
