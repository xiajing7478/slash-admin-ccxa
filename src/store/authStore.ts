import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isAuthenticated: boolean
  userInfo: any
  token: string | null
  refreshToken: string | null
  dynamicMenu: any[]
  roles: string[]
  permissions: string[]
  login: (token: string, userInfo: any) => void
  logout: () => void
  setToken: (token: string, refreshToken: string) => void
  setDynamicMenu: (menu: any[]) => void
  setUserInfo: (userInfo: any) => void
  setPermissions: (permissions: string[]) => void
  setRoles: (roles: string[]) => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      userInfo: null,
      dynamicMenu: [],
      roles: [],
      permissions: [],
      login: (token: string, userInfo: any) => set({ token, userInfo, isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false, userInfo: null, token: null }),
      setDynamicMenu: (menu: any[]) => set({ dynamicMenu: menu }),
      setToken: (token: string, refreshToken: string) => set({ token, refreshToken, isAuthenticated: true }),
      setUserInfo: (userInfo: any) => set({ userInfo }),
      setRoles: (roles: string[]) => set({ roles }),
      setPermissions: (permissions: string[]) => set({ permissions }),
    }),
    {
      name: 'auth-storage', // 存储的名称
    },
  ),
)

export default useAuthStore
