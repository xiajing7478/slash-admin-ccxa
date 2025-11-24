import { Button } from 'antd'
interface ThemeSwitcherProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ darkMode, setDarkMode }) => {
  // console.log('ThemeSwitcher', darkMode, setDarkMode)

  return (
    <div>
      <Button type="text" onClick={() => setDarkMode(!darkMode)} style={{ marginRight: '10px' }}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </div>
  )
}

export default ThemeSwitcher
