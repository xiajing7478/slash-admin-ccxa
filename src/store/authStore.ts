import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isAuthenticated: boolean
  userInfo: any
  authToken: string | null
  login: (token: string, userInfo: any) => void
  logout: () => void
  dynamicMenu?: any[]
}

const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      authToken: null,
      isAuthenticated: false,
      userInfo: null,
      dynamicMenu: [],
      login: (token: string, userInfo: any) => set({ authToken: token, userInfo, isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false, userInfo: null, authToken: null }),
      setDynamicMenu: (menu: any[]) => set({ dynamicMenu: menu }),
    }),
    {
      name: 'auth-storage', // 存储的名称
    },
  ),
)

export default useAuthStore
