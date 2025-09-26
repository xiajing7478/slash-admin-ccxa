interface Props {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

const ThemeSwitcher = ({ darkMode, setDarkMode }: Props) => {
  console.log('ThemeSwitcher', darkMode, setDarkMode)
  return <h1>ThemeSwitcher</h1>
}

export default ThemeSwitcher
