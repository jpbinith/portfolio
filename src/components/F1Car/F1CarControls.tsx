import { createPortal } from 'react-dom'
import type { DriveDirection } from './useCarDrive'
import './F1CarControls.css'

type F1CarControlsProps = {
  onPress: (direction: DriveDirection) => void
  onRelease: (direction: DriveDirection) => void
}

const controls: Array<{
  direction: DriveDirection
  label: string
  path: string
}> = [
  { direction: 'up', label: 'Drive up', path: 'm7 14 5-5 5 5' },
  { direction: 'left', label: 'Drive left', path: 'm14 7-5 5 5 5' },
  { direction: 'down', label: 'Drive down', path: 'm7 10 5 5 5-5' },
  { direction: 'right', label: 'Drive right', path: 'm10 7 5 5-5 5' },
]

export function F1CarControls({ onPress, onRelease }: F1CarControlsProps) {
  const controlPad = (
    <div className="f1-car-controls" role="group" aria-label="F1 car directional controls">
      <span className="f1-car-controls__label">Drive</span>
      <div className="f1-car-controls__pad">
        {controls.map(({ direction, label, path }) => (
          <button
            className={`f1-car-controls__button f1-car-controls__button--${direction}`}
            type="button"
            aria-label={label}
            key={direction}
            onContextMenu={(event) => event.preventDefault()}
            onPointerDown={(event) => {
              event.preventDefault()
              event.currentTarget.setPointerCapture(event.pointerId)
              onPress(direction)
            }}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId)
              }
              onRelease(direction)
            }}
            onPointerCancel={() => onRelease(direction)}
            onLostPointerCapture={() => onRelease(direction)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={path} />
            </svg>
          </button>
        ))}
      </div>
      <span className="f1-car-controls__hint">WASD / arrows</span>
    </div>
  )

  return createPortal(controlPad, document.body)
}
