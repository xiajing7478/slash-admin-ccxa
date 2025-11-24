export interface OperateActionsState {
  key: string
  icon?: string | React.ReactNode
  text: string
  type?: 'link' | 'text' | 'primary' | 'default' | 'dashed'
  onClick: () => void
  permissionCode?: string // 权限编码
}

export interface OperateActionsProps {
  actions: OperateActionsState[]
}
