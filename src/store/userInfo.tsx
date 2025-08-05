import { create } from 'zustand'
import { message } from 'antd'
import { persist } from 'zustand/middleware'
import { getUserInfo, getMenu } from '@/api/login'
import { ApartmentOutlined, UserOutlined } from '@ant-design/icons'
// import React from 'react'
// import type { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
interface MenuItem {
  key: string
  label: string
  path?: string
  children?: MenuItem[]
  icon?: any
  id?: string | number
}

interface UserInfoState {
  // sysUser: Record<string, string | number | null>
  sysUser: any
  roles: number[]
  permissions: string[]
  username: string
  menus: MenuItem[]
}

interface UserInfoActions {
  getUserInfo: () => Promise<void>
  getMenus: () => MenuItem[]
}

const userInfoInitialState: UserInfoState = {
  sysUser: {},
  roles: [],
  permissions: [],
  username: '',
  menus: [],
}

const transformMenuData = (menus: MenuItem[]): MenuItem[] => {
  return menus.map(menu => {
    // 转换当前菜单项
    const transformed: MenuItem = {
      key: menu.id as string,
      label: menu.label,
      path: menu.path,
      icon: ApartmentOutlined,
      // icon: React.createElement(ApartmentOutlined),
    }

    // 如果有子菜单且不为空，递归转换
    if (menu.children && menu.children.length > 0) {
      // 如果这项有子菜单且不为空，删除当前菜单的path
      delete transformed.path
      transformed.children = menu.children.map(child => ({
        key: child.id as string,
        label: child.label,
        path: child.path,
        // icon: React.createElement(UserOutlined),
        icon: UserOutlined,
        // 过滤掉空的子菜单
        ...(child.children &&
          child.children.length > 0 && {
            children: child.children.map(grandChild => ({
              key: grandChild.id as string,
              label: grandChild.label,
              path: grandChild.path,
              icon: UserOutlined,
              // icon: React.createElement(UserOutlined),
            })),
          }),
      }))
    }
    return transformed
  })
}

type UserInfoStore = UserInfoState & UserInfoActions

const useUserInfoStore = create<UserInfoStore>()(
  persist<UserInfoStore>(
    set => ({
      ...userInfoInitialState,
      getUserInfo: async () => {
        try {
          const {
            data: { permissions, roles, sysUser },
          } = await getUserInfo()
          set({
            username: sysUser?.username,
            roles,
            permissions,
            sysUser,
          })
        } catch (error) {
          message.info(error as string)
        }
      },
      getMenus: async () => {
        const menus = await getMenu()
        const { data = [] } = menus
        // 过滤掉children为空的项
        const daynicMenu = transformMenuData(data)
        // const transformedData = daynicMenu.map(menu => ({
        //   ...menu,
        //   icon: ApartmentOutlined,
        //   children: menu.children?.map(child => ({
        //     ...child,
        //     icon: UserOutlined,
        //   })),
        // }))
        set({
          menus: daynicMenu,
        })
        return daynicMenu
      },
    }),
    {
      name: 'user-storage',
      // 可以选择性地持久化某些字段
      partialize: state => ({
        sysUser: state.sysUser,
        roles: state.roles,
        permissions: state.permissions,
        username: state.username,
      }),
    },
  ),
)
export default useUserInfoStore
