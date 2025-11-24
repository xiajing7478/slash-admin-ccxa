import { useMemo } from 'react'
import useAuthStore from '@/store/authStore'

export const useHasPermission = (code: string): boolean => {
  const { permissions } = useAuthStore()
  return useMemo(() => permissions.includes(code), [code, permissions])
}
