import { useContext } from 'react'
import { RouterContext } from './router-context'

export const useRouterContext = () => {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouterContext must be used within a RouterProvider')
  }
  return context
}
