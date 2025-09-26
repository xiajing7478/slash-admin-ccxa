import { App } from 'antd'
import { useEffect } from 'react'
import { router } from './index'
import { RouterProvider } from 'react-router-dom'
import { antdUtils } from '@/utils/AntdUtils'

const RootRouterProvider = () => {
  const { message, notification, modal } = App.useApp()

  useEffect(() => {
    antdUtils.setMessageInstance(message)
    antdUtils.setModalInstance(modal)
    antdUtils.setNotificationInstance(notification)
  }, [message, notification, modal])

  return <RouterProvider router={router} />
}

export default RootRouterProvider
