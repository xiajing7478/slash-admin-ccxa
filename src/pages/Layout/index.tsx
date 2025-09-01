import { Suspense, type ComponentType } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useRouterContext } from '@/context/use-router-context'
import * as Icons from '@ant-design/icons'
import Loading from '@/components/Loading'
import { NProgressWrapper } from '@/components/Loading/withNProgress'

const Layout = () => {
  const { menus } = useRouterContext()

  return (
    <NProgressWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <ul>
          {menus.map((menu: any, index: number) => {
            // 动态获取图标组件
            const IconComponent = Icons[menu.icon as keyof typeof Icons] as ComponentType

            return (
              <li key={index}>
                <Link to={menu.route} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {IconComponent && <IconComponent />}
                  {menu.name}
                </Link>
              </li>
            )
          })}
        </ul>

        <Suspense fallback={<Loading />}>
          <Outlet /> {/* 路由出口 */}
        </Suspense>
      </div>
    </NProgressWrapper>
  )
}

export default Layout

// const [menus, setMenus] = useState<any[]>([])
// const [loading, setLoading] = useState<boolean>(true)

// 获取匹配到的路由
// const matches = useMatches()
// console.log('match...', matches)

// useEffect(() => {
//   getAdminMenu().then((adminMenus: any) => {
//     setMenus(adminMenus)
//     setLoading(false)
//   })
// }, [])

// useEffect(() => {
//   getUserMenu().then((userMenus: any) => {
//     setMenus(userMenus)
//     setLoading(false)
//   })
// }, [])

// if (loading) {
//   return <div>Loading...</div>
// }

// 匹配的路由返回的是个数组，默认最后一个就是当前路由。
// if (matches.length && !menus.some(menu => matches[matches.length - 1].pathname === menu.route)) {
//   return <div>403</div>
// }
