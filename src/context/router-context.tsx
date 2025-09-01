import { createContext } from 'react'

// 定义菜单项的类型
export interface MenuItem {
  name: string
  path: string
  icon?: string
  component: string
  children?: MenuItem[]
}

// 定义 Context 的类型
export interface RouterContextType {
  menus: MenuItem[]
}

// 创建 Context
export const RouterContext = createContext<RouterContextType | undefined>(undefined)
