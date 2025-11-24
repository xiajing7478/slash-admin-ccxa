import { Button, Space } from 'antd'
import { type OperateActionsState, type OperateActionsProps } from './type'
import { Permission } from '@/components/Permission'
const OperateActions: React.FC<OperateActionsProps> = ({ actions }) => {
  return (
    <Space style={{ flexWrap: 'wrap' }}>
      {actions.map((action: OperateActionsState) => {
        const btn = (
          <Button key={action.key} icon={action.icon} type={action.type || 'primary'} onClick={action.onClick}>
            {action.text}
          </Button>
        )
        return action.permissionCode ? (
          <Permission key={action.key} code={action.permissionCode}>
            {btn}
          </Permission>
        ) : (
          btn
        )
      })}
    </Space>
  )
}

export default OperateActions
