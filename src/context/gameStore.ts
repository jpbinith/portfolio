import { createContext } from 'react'

export type GameMode = 'prompt' | 'instructions' | 'minimized' | 'active'

export type GameContextValue = {
  mode: GameMode
  startGame: () => void
  beginDriving: () => void
  minimizeGame: () => void
}

export const GameContext = createContext<GameContextValue | null>(null)
