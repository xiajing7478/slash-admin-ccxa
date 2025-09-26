import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button, Space } from 'antd'

const UserProfile: React.FC = () => {
  const { t } = useTranslation()
  const userName = 'John Doe'

  return (
    <Card title={t('user.profile')} style={{ width: 300 }}>
      <p>{t('user.greeting', { name: userName })}</p>
      <Space>
        <Button type="primary">{t('common.save')}</Button>
        <Button>{t('common.cancel')}</Button>
      </Space>
    </Card>
  )
}

export default UserProfile
