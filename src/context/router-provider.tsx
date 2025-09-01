import { type ReactNode } from 'react'
import { RouterContext, type RouterContextType } from './router-context'

interface RouterProviderProps {
  children: ReactNode
  values: RouterContextType
}

export const RouterContextProvider = ({ children, values }: RouterProviderProps) => {
  return <RouterContext.Provider value={values}>{children}</RouterContext.Provider>
}
