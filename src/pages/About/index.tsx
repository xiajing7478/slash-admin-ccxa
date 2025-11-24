// import { i18n, t } from '@/i18n'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import AddPlan from './components/AddPlan'
import { type AddPlanRef } from './components/AddPlan/'
import { useRef } from 'react'
import { Button } from 'antd'
const About: React.FC = () => {
  const { t } = useTranslation()
  const childRef = useRef<AddPlanRef>(null)

  const go = () => {
    if (childRef.current) {
      console.log(childRef.current)
      childRef.current?.addPlan()
    }
  }

  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p className="text-3xl font-bold underline flex justify-center">This is the about page.</p>
      <LanguageSwitcher />
      <AddPlan ref={childRef} source={1} />
      <Button onClick={go}>Add Plan</Button>
    </div>
  )
}

export default About
