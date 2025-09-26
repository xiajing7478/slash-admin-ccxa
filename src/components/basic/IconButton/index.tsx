import { Button, type ButtonProps } from 'antd'
import classNames from 'classnames'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface IconButtonProps {
  children: ReactNode
  onClick?: ButtonProps['onClick']
  className?: string
}

const IconButton = ({ children, onClick, className }: IconButtonProps) => {
  return (
    <Button
      className={twMerge(
        classNames(
          'bg-shallow dark:bg-[rgb(41,49,79)] text-primary w-[34px] text-[16px] h-[34px] flex items-center justify-center rounded-[8px] select-none cursor-pointer',
          className,
        ),
      )}
      type="primary"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default IconButton
