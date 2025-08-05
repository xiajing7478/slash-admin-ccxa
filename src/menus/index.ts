import { HomeOutlined, InfoCircleOutlined, DashboardOutlined, ApartmentOutlined, UserOutlined } from '@ant-design/icons'
interface MenuItem {
  key: string
  label: string
  path?: string
  children?: MenuItem[]
  icon?: any
  id?: string | number
  parentId?: number
}

const menuItems: MenuItem[] = [
  { key: '1', label: 'Home', path: '/home', icon: HomeOutlined },
  { key: '2', label: 'About', path: '/about', icon: InfoCircleOutlined },
  { key: '3', label: 'Dashboard', path: '/dashboard', icon: DashboardOutlined },
  {
    key: '4',
    label: 'System Manager',
    icon: ApartmentOutlined, // 父菜单图标
    children: [
      { key: '4-1', label: 'User', path: '/user', icon: UserOutlined },
      { key: '4-2', label: 'Department', path: '/department', icon: ApartmentOutlined },
    ],
  },
]

export default menuItems
