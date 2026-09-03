import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GameProvider } from './context/GameProvider'
import { ThemeProvider } from './context/ThemeProvider'
import './styles/theme.css'
import './styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </ThemeProvider>
  </StrictMode>,
)
