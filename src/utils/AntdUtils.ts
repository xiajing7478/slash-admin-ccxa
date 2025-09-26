import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'

type ModalInstance = Omit<ModalStaticFunctions, 'warn'>

class AntdUtils {
  message: MessageInstance | undefined
  notification: NotificationInstance | undefined
  modal: ModalInstance | undefined

  setMessageInstance(message: MessageInstance) {
    this.message = message
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.message.success
  }

  setNotificationInstance(notification: NotificationInstance) {
    this.notification = notification
  }

  setModalInstance(modal: ModalInstance) {
    this.modal = modal
  }
}

export const antdUtils = new AntdUtils()
