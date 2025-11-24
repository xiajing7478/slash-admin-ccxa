import { defaultSetting } from './src/default-setting'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--ant-color-primary)',
        shallow: 'var(--ant-color-bg-text-hover)',
      },
      // height 配置用于自定义高度相关的工具类
      // 这里定义了一个名为 'header' 的高度值
      // 使用方式：h-header（对应 className="h-header"）
      height: {
        header: `${defaultSetting.headerHeight}px`,
      },
      // spacing 配置用于自定义间距相关的工具类（包括 padding、margin 等）
      // 这里定义了一个名为 'header' 的间距值
      // 使用方式：p-header, m-header, mt-header 等
      spacing: {
        header: `${defaultSetting.headerHeight}px`,
      },
    },
  },
  plugins: [],
}
