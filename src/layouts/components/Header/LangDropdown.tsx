import { Dropdown } from 'antd'
import IconButton from '@/components/basic/IconButton'
import { IconShuyi_fanyi36 } from '@/assets/icons/shuyi_fanyi-36'
import { defaultSetting } from '@/default-setting'
import { i18n, t } from '@/i18n'

interface LangDropdownProps {
  lang: string
  setLang: (lang: string) => void
}

// const menus = defaultSetting.languages.map(language => ({
//   key: language.key,
//   label: `${t(language.name)}`,
// }))
const LangDropdown = ({ lang, setLang }: LangDropdownProps) => {
  return (
    <Dropdown
      menu={{
        items: defaultSetting.languages.map(language => ({
          label: `${t(language.name)}`,
          key: language.key,
        })),
        onClick: async ({ key }) => {
          await i18n.changeLanguage(key)
          setLang(key)
        },
        selectedKeys: [lang],
      }}
      trigger={['click']}
      placement="bottom"
    >
      <div>
        <IconButton className="text-[20px]">
          <IconShuyi_fanyi36 />
        </IconButton>
      </div>
    </Dropdown>
  )
}

export default LangDropdown
