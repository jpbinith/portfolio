import { useCallback, useEffect, useRef } from 'react'
import { createPortal, flushSync } from 'react-dom'
import sf26Image from '../../assets/SF26.png'
import { useGame } from '../../context/useGame'
import './F1GamePrompt.css'

export function F1GamePrompt() {
  const { mode, startGame, minimizeGame } = useGame()
  const dialogRef = useRef<HTMLDivElement>(null)

  const minimizeWithAnimation = useCallback(() => {
    const transitionDocument = document as Document & {
      startViewTransition?: (update: () => void) => void
    }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!transitionDocument.startViewTransition || prefersReducedMotion) {
      minimizeGame()
      return
    }

    transitionDocument.startViewTransition(() => {
      flushSync(minimizeGame)
    })
  }, [minimizeGame])

  useEffect(() => {
    if (mode !== 'prompt') return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') minimizeWithAnimation()
    }

    const keepFocusInside = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button')
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('keydown', keepFocusInside)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('keydown', keepFocusInside)
    }
  }, [minimizeWithAnimation, mode])

  if (mode !== 'prompt') return null

  return createPortal(
    <div className="game-prompt-backdrop">
      <div
        ref={dialogRef}
        className="game-prompt"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-prompt-title"
        aria-describedby="game-prompt-description"
      >
        <div className="game-prompt__visual" aria-hidden="true">
          <img src={sf26Image} alt="" />
          <span className="game-prompt__status">Interactive portfolio</span>
        </div>

        <div className="game-prompt__content">
          <span className="game-prompt__eyebrow">Optional experience · F1 mode</span>
          <h2 id="game-prompt-title">Want to take the site for a spin?</h2>
          <p id="game-prompt-description">
            Drive an interactive F1 car around the portfolio using WASD, arrow keys,
            or the on-screen controls.
          </p>

          <div className="game-prompt__actions">
            <button className="game-prompt__start" type="button" autoFocus onClick={startGame}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5.8v12.4a1 1 0 0 0 1.55.84l9-6.2a1 1 0 0 0 0-1.68l-9-6.2A1 1 0 0 0 8 5.8Z" />
              </svg>
              Start driving
            </button>
            <button className="game-prompt__skip" type="button" onClick={minimizeWithAnimation}>
              Not now
            </button>
          </div>

          <p className="game-prompt__note">
            You can launch it later from the play button in the header.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
