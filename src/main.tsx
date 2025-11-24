import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'nprogress/nprogress.css'
import 'antd/dist/reset.css'
import App from './App'
import './check-update'
import './index.css' // 引入全局样式

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
