import { Menu, type MenuProps } from 'antd'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGlobalStore from '@/store/global'
import useAuthStore from '@/store/authStore'

// 说明：
// 1) 后端返回的菜单数据结构包含 id、path、name、children 等字段
// 2) Antd Menu 需要的 items 结构为 { key, label, icon?, children? }
// 3) 这里提供一个通用的递归转换函数，将后端数组转为 Antd Menu 的 items
// 4) 处理规则：
//    - key：优先使用 id（转为字符串），保证稳定
//    - label：显示后端的 name
//    - children：如果存在 children 数组，继续递归
//    - 外链：当 path 以 http 开头时，label 使用 <a> 跳转
//    - 路由路径拼接：子节点 path 若不是 http 开头，则与父级 path 拼接为完整路径

type BackendMenu = {
  id: number
  parentId: number
  children?: BackendMenu[]
  icon?: string | null
  name: string
  spread?: boolean
  path: string
  component?: string | null
  authority?: string | null
  redirect?: string | null
  keepAlive?: string | null
  code?: string | null
  type?: string | null
  label?: string | null
  sort?: number
}

const abortMenu = [
  { path: '/quotationManager' },
  { path: '/myProject' },
  { path: '/supplierTeam' },
  { path: '/leader' },
  { path: '/reconciliationSystem' },
  { path: '/employeeManagement' },
]

// 预处理需要隐藏的路径，便于 O(1) 判断
const abortPathSet = new Set(abortMenu.map(i => i.path))

// 判断是否为外链
const isExternal = (path: string) => /^https?:\/\//.test(path)

// 规范化拼接路径，确保只有一个斜杠分隔
const joinPath = (parentPath: string, childPath: string) => {
  if (!parentPath) return childPath
  if (!childPath) return parentPath
  const pp = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath
  const cp = childPath.startsWith('/') ? childPath.slice(1) : childPath
  return `${pp}/${cp}`
}

// 将后端菜单转为 Antd Menu items，同时收集 key 到完整路径的映射
const transformToMenuItems = (data: BackendMenu[], parentPath = '', keyToPath: Record<string, string>): Required<MenuProps>['items'] => {
  return data
    .slice()
    .sort((a, b) => {
      const sa = typeof a.sort === 'number' ? a.sort! : Number.MAX_SAFE_INTEGER
      const sb = typeof b.sort === 'number' ? b.sort! : Number.MAX_SAFE_INTEGER
      return sa - sb
    })
    .map(item => {
      const { id, name, path, children } = item

      // 计算完整路径：外链保持原样，内部路由与父路径拼接
      const fullPath = isExternal(path) ? path : joinPath(parentPath, path)

      // 命中禁用项（支持前缀匹配，如 /leader 也隐藏 /leader/todo）则跳过
      for (const ap of abortPathSet) {
        if (!isExternal(fullPath) && fullPath.startsWith(ap)) {
          return null
        }
      }

      // 收集 key -> 完整路径 的映射，供点击跳转使用
      const key = String(id)
      keyToPath[key] = fullPath

      // 文案优先使用后端的 name，其次回退到 label
      const text = name || item.label || ''

      // 外链：使用 <a> 作为 label，新增窗口打开
      const labelNode = isExternal(fullPath) ? (
        <a href={fullPath} target="_blank" rel="noreferrer">
          {text}
        </a>
      ) : (
        text
      )

      // 递归转换子菜单
      const childrenItems = Array.isArray(children) && children.length > 0 ? transformToMenuItems(children, fullPath, keyToPath) : undefined

      return {
        key,
        label: labelNode,
        // 这里保留完整路径，便于 onSelect/onClick 时做路由跳转
        metapath: fullPath,
        children: childrenItems,
      }
    })
    .filter(Boolean) as NonNullable<Required<MenuProps>['items']>
}

const SlideMenu = () => {
  const { darkMode } = useGlobalStore()
  const { dynamicMenu } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  // useEffect(() => {
  //   console.log('dynamicMenu...', JSON.stringify(dynamicMenu))
  // }, [dynamicMenu])

  // 使用 useMemo 缓存转换结果和映射表，避免每次渲染都递归计算
  const { items, keyToPath } = useMemo(() => {
    const map: Record<string, string> = {}
    const items = transformToMenuItems(dynamicMenu as BackendMenu[], '', map)
    return { items, keyToPath: map }
  }, [dynamicMenu])

  // 处理菜单点击：外链打开新窗口，内链使用路由跳转
  const handleClick: MenuProps['onClick'] = e => {
    const key = String(e.key)
    const path = keyToPath[key]
    if (!path) return
    if (isExternal(path)) {
      window.open(path, '_blank', 'noopener,noreferrer')
      return
    }
    // 确保有前导斜杠
    const to = path.startsWith('/') ? path : `/${path}`
    navigate(to)
  }

  // 根据当前路由高亮菜单项
  const selectedKeys = useMemo(() => {
    const current = location.pathname
    const matched = Object.entries(keyToPath).find(([, p]) => p === current)
    return matched ? [matched[0]] : []
  }, [keyToPath, location.pathname])

  return (
    <Menu
      mode="inline"
      items={items}
      onClick={handleClick}
      selectedKeys={selectedKeys}
      className="bg-transparent"
      theme={darkMode ? 'dark' : 'light'}
    />
  )
}

export default SlideMenu
