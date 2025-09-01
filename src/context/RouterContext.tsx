// import { createContext, useContext, useState } from 'react'
// import { staticRoutes, getDynamicRoutes } from '@/config/router'
// interface RouterContextType {
//   routes: any[]
//   updateRoutes: () => Promise<void>
// }
// const RouterContext = createContext<RouterContextType>({
//   routes: staticRoutes,
//   updateRoutes: async () => {},
// })

// export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [routes, setRoutes] = useState(staticRoutes)
//   const updateRoutes = async () => {
//     const dynamicRoutes = await getDynamicRoutes()
//     // 将动态路由添加到第一个路由（即App布局）的children中
//     const newRoutes = [...staticRoutes]
//     if (newRoutes[0] && newRoutes[0].children) {
//       newRoutes[0] = {
//         ...newRoutes[0],
//         children: [...newRoutes[0].children, ...dynamicRoutes],
//       }
//     }
//     setRoutes(newRoutes)
//   }
//   return (
//     <RouterContext.Provider
//       value={{
//         routes,
//         updateRoutes,
//       }}
//     >
//       {children}
//     </RouterContext.Provider>
//   )
// }

// export const useRouter = () => useContext(RouterContext)
