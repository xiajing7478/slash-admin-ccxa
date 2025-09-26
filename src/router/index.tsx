import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes)

// delete
// import { lazy, useEffect } from 'react'
// import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
// // import { App } from 'antd'
// // import { antdUtils } from './utils/antd'
// const Login = lazy(() => import('@/pages/Login'))
// const BasicLayout = lazy(() => import('@/pages/Layout'))

// export const router = createBrowserRouter([
//   {
//     path: '/user/login',
//     element: <Login />,
//   },
//   {
//     path: '*',
//     Component: BasicLayout,
//     children: [],
//   },
// ])

// const findNodeByPath = (routes: RouteObject[], path: string) => {
//   for (let i = 0; i < routes.length; i++) {
//     const element = routes[i]
//     if (element.path === path) {
//       return element
//     }
//     findNodeByPath(element?.children || [], path)
//   }
// }

// export const addRoutes = (parentPath: string, routes: RouteObject[]) => {
//   if (!parentPath) {
//     router.routes.push(...(routes as any))
//     return
//   }

//   const curNode = findNodeByPath(router.routes, parentPath)

//   if (curNode?.children) {
//     curNode?.children.push(...routes)
//   } else if (curNode) {
//     curNode.children = routes
//   }
// }

// export const replaceRoutes = (parentPath: string, routes: RouteObject[]) => {
//   if (!parentPath) {
//     router.routes.push(...(routes as any))
//     return
//   }

//   const curNode = findNodeByPath(router.routes, parentPath)

//   if (curNode) {
//     curNode.children = routes
//   }
// }

// const RouterIndex = () => {
//   return <RouterProvider router={router} />
// }

// export default RouterIndex
