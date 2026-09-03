import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useGame } from '../../context/useGame'
import './F1DrivingIntro.css'

export function F1DrivingIntro() {
  const { mode, beginDriving, minimizeGame } = useGame()
  const startButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (mode !== 'instructions') return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    startButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') minimizeGame()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [minimizeGame, mode])

  if (mode !== 'instructions') return null

  return createPortal(
    <div
      className="driving-intro"
      role="dialog"
      aria-modal="true"
      aria-labelledby="driving-intro-title"
      aria-describedby="driving-intro-description"
    >
      <div className="driving-intro__content">
        <span className="driving-intro__eyebrow">F1 mode · Quick briefing</span>
        <h2 id="driving-intro-title">You’re in the driver’s seat.</h2>
        <p id="driving-intro-description" className="driving-intro__lead">
          Use <strong>W A S D</strong> or the <strong>arrow keys</strong> to move around.
        </p>
        <p className="driving-intro__advice">
          On-screen controls appear in the bottom-right. Driving near the top or bottom
          moves the page with you. Press Escape or the X above the car to stop.
        </p>
        <button ref={startButtonRef} type="button" onClick={beginDriving}>
          Start engine
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  )
}
