import type { ReactNode } from 'react'
import useAuthStore from '@/store/authStore'
interface PermissionProps {
  code: string
  children: ReactNode
}
export const Permission: React.FC<PermissionProps> = ({ code, children }) => {
  const { permissions } = useAuthStore()
  return permissions.includes(code) ? <>{children}</> : null
}
