import { defaultSetting } from '@/default-setting'
import useGlobalStore from '@/store/global'
import HeaderTitle from './headerTitle'
import MenuSearcher from './MenuSearcher'
import LangDropdown from './LangDropdown'
import UserInfo from './UserInfo'
import ThemeSwitcher from './ThemeSwitcher'

const Header = () => {
  const { darkMode, collapsed, lang, setCollapsed, setDarkMode, setLang } = useGlobalStore()

  return (
    <div
      style={{ height: defaultSetting.headerHeight, zIndex: 1000, display: 'flex' }}
      // className="flex basis-[48px] items-center px-0 gap-[16px] fixed top-0 right-0 left-0 bg-[var(--ant-color-bg-layout)]"
    >
      <HeaderTitle collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex items-center justify-between max-md:justify-end flex-1 pr-[24px]">
        <MenuSearcher /> {/* todo */}
        <div className="flex items-center gap-[16px]">
          <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} /> {/* todo */}
          <LangDropdown lang={lang} setLang={setLang} />
          <UserInfo /> {/* todo */}
        </div>
      </div>
    </div>
  )
}

export default Header
