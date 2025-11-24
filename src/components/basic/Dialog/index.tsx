import { Modal } from 'antd'

export interface DialogProps {
  title?: string
  children: React.ReactNode
  visible: boolean
  onOk: () => void
  onCancel: () => void
  // TODO: add more props
}
const CommonDialog: React.FC<DialogProps> = ({ title = 'title', children, visible, onOk, onCancel }) => {
  return (
    <Modal title={title} open={visible} onOk={onOk} onCancel={onCancel}>
      {children}
    </Modal>
  )
}

export default CommonDialog
