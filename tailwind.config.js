import { defaultSetting } from './src/default-setting'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--ant-color-primary)', // 主色
        shallow: 'var(--ant-color-bg-text-hover)', // 浅色背景
      },
      height: {
        header: `${defaultSetting.headerHeight}px`,
      },
      space: {
        header: `${defaultSetting.headerHeight}px`,
      },
    },
  },
  plugins: [],
}
