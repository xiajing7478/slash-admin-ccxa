import React from 'react'
import { useTranslation } from 'react-i18next'
import { Menu } from 'antd'

const Navigation: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="home">{t('nav.home')}</Menu.Item>
      <Menu.Item key="about">{t('nav.about')}</Menu.Item>
      <Menu.Item key="contact">{t('nav.contact')}</Menu.Item>
    </Menu>
  )
}

export default Navigation
