import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { GameContext, type GameMode } from './gameStore'

export function GameProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<GameMode>('minimized')

  const startGame = useCallback(() => {
    setMode('instructions')
  }, [])

  const beginDriving = useCallback(() => {
    setMode('active')
  }, [])

  const minimizeGame = useCallback(() => {
    setMode('minimized')
  }, [])

  const value = useMemo(
    () => ({ mode, startGame, beginDriving, minimizeGame }),
    [mode, startGame, beginDriving, minimizeGame],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
