import { defaultSetting } from '@/default-setting'
import { MenuOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import IconButton from '@/components/basic/IconButton'
import { IconBuguang } from '@/assets/icons/buguang'

interface HeaderTitleProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const HeaderTitle = ({ collapsed, setCollapsed }: HeaderTitleProps) => {
  return (
    <>
      <div style={{ width: defaultSetting.slideWidth }} className="max-lg:hidden flex justify-between items-center">
        <div className="flex items-center gap-[4px] text-[20px] px-[24px] pr-0">
          <IconBuguang className="text-primary" />
          <h1 className="font-bold text-[22px]">{defaultSetting.title}</h1>
        </div>
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          <MenuOutlined className={classNames('transition-transform', { 'rotate-90': !collapsed })} />
        </IconButton>
      </div>

      <div className="pl-[20px] lg:hidden">
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          <MenuOutlined />
        </IconButton>
      </div>
    </>
  )
}

export default HeaderTitle
