// import { i18n, t } from '@/i18n'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/components/LanguageSwitcher'
const About: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p className='text-3xl font-bold underline flex justify-center'>This is the about page.</p>
      <LanguageSwitcher />
    </div>
  )
}

export default About
