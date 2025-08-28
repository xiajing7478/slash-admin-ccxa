import React, { useCallback, useMemo } from 'react'
import { Avatar, Dropdown, type MenuProps, Button, Input, Badge, Space } from 'antd'
import { SkinOutlined, BellOutlined } from '@ant-design/icons'
import { debounce } from '@/utils/index'
import { useGlobalStore, useAuthStore } from '@/store/index'
import { clearAuthToken } from '@/utils/auth'
import styles from '../index.module.less'
import { useNavigate } from 'react-router-dom'

const RightContent: React.FC = () => {
  const { setColor, primaryColor } = useGlobalStore()
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const logOut = () => {
    logout()
    clearAuthToken()
    navigate('/login')
  }

  const menu: MenuProps = {
    items: [
      {
        key: '1',
        label: <span>个人中心</span>,
      },
      {
        key: '2',
        label: <span>设置</span>,
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        label: <span onClick={logOut}>退出登录</span>,
      },
    ],
  }

  const changeMainColor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setColor(e.target.value)
    },
    [setColor],
  )

  const debounceChangeMainColor = useMemo(() => debounce(changeMainColor, 300), [changeMainColor])

  return (
    <Space size={20}>
      {/* 通知图标 */}
      <span style={{ display: 'flex' }}>
        <Badge count={12}>
          <BellOutlined style={{ fontSize: '24px' }} />
        </Badge>
      </span>
      {/* 皮肤设置 */}
      <div className={styles.skin}>
        <Button type="primary" shape="circle" icon={<SkinOutlined />} />
        <Input type="color" className={styles.skinInput} defaultValue={primaryColor} onChange={debounceChangeMainColor} />
      </div>
      {/* 用户头像和下拉菜单 */}
      <Dropdown menu={menu} placement="bottomRight" arrow>
        <Avatar
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          alt="User Avatar"
          style={{ cursor: 'pointer' }}
        />
      </Dropdown>
    </Space>
  )
}

export default RightContent

// import React, { useCallback, useMemo } from 'react'
// import { Avatar, Dropdown, type MenuProps, Button, Input, Badge, Space } from 'antd'
// import { SkinOutlined, BellOutlined } from '@ant-design/icons'
// import styles from '../index.module.less'
// import { debounce } from '@/utils/index'
// import { useLoginStore, useGlobalStore } from '@/store/index'

// // 定义菜单项的类型
// type MenuItem = {
//   key: string
//   label: React.ReactNode
//   type?: 'divider'
//   onClick?: () => void
// }

// // 使用memo优化下拉菜单组件，避免不必要的重新渲染
// const UserDropdown = memo<{ onLogout: () => void }>(({ onLogout }) => {
//   // 菜单配置 - 使用useMemo避免每次渲染都创建新的菜单配置
//   const menu: MenuProps = useMemo(
//     () => ({
//       items: [
//         {
//           key: '1',
//           label: <span>个人中心</span>,
//         } as MenuItem,
//         {
//           key: '2',
//           label: <span>设置</span>,
//         } as MenuItem,
//         {
//           type: 'divider',
//         } as MenuItem,
//         {
//           key: '3',
//           label: <span onClick={onLogout}>退出登录</span>,
//         } as MenuItem,
//       ],
//     }),
//     [onLogout],
//   )

//   return (
//     <Dropdown menu={menu} placement="bottomRight" arrow>
//       <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="User Avatar" style={{ cursor: 'pointer' }} />
//     </Dropdown>
//   )
// })

// // 使用memo优化通知图标组件
// const NotificationIcon = memo(() => (
//   <span style={{ display: 'flex' }}>
//     <Badge count={12}>
//       <BellOutlined style={{ fontSize: '24px' }} />
//     </Badge>
//   </span>
// ))

// // 使用memo优化皮肤设置组件
// const SkinSetting = memo<{
//   primaryColor: string
//   onChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => void
// }>(({ primaryColor, onChangeColor }) => (
//   <div className={styles.skin}>
//     <Button type="primary" shape="circle" icon={<SkinOutlined />} />
//     <Input type="color" className={styles.skinInput} defaultValue={primaryColor} onChange={onChangeColor} />
//   </div>
// ))

// // 主组件
// const RightContent: React.FC = () => {
//   const { setUserInfo } = useLoginStore()
//   const { setColor, primaryColor } = useGlobalStore()

//   // 退出登录函数 - 使用useCallback缓存
//   const logOut = useCallback(() => {
//     setUserInfo(null)
//   }, [setUserInfo])

//   // 颜色变化处理函数 - 使用useCallback缓存
//   const changeMainColor = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       setColor(e.target.value)
//     },
//     [setColor],
//   )

//   // 使用useMemo缓存防抖函数，避免每次渲染都创建新的防抖函数
//   const debouncedChangeMainColor = useMemo(() => {
//     return debounce(changeMainColor, 300)
//   }, [changeMainColor])

//   return (
//     <Space size={20}>
//       <NotificationIcon />
//       <SkinSetting primaryColor={primaryColor} onChangeColor={debouncedChangeMainColor} />
//       <UserDropdown onLogout={logOut} />
//     </Space>
//   )
// }

// export default RightContent
