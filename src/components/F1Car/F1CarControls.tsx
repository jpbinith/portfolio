import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import type { DriveDirection } from './useCarDrive'
import './F1CarControls.css'

type F1CarControlsProps = {
  onPress: (direction: DriveDirection) => void
  onRelease: (direction: DriveDirection) => void
}

type JoystickPosition = {
  x: number
  y: number
}

const CENTERED_POSITION: JoystickPosition = { x: 0, y: 0 }
const DIRECTION_THRESHOLD = .38
const DEAD_ZONE_RATIO = .16

export function F1CarControls({ onPress, onRelease }: F1CarControlsProps) {
  const joystickRef = useRef<HTMLButtonElement>(null)
  const activePointerRef = useRef<number | null>(null)
  const activeDirectionsRef = useRef(new Set<DriveDirection>())
  const [position, setPosition] = useState<JoystickPosition>(CENTERED_POSITION)
  const [isSteering, setIsSteering] = useState(false)

  const syncDirections = (nextDirections: Set<DriveDirection>) => {
    activeDirectionsRef.current.forEach((direction) => {
      if (!nextDirections.has(direction)) onRelease(direction)
    })
    nextDirections.forEach((direction) => {
      if (!activeDirectionsRef.current.has(direction)) onPress(direction)
    })
    activeDirectionsRef.current = nextDirections
  }

  const updateSteering = (clientX: number, clientY: number) => {
    const joystick = joystickRef.current
    if (!joystick) return

    const bounds = joystick.getBoundingClientRect()
    const centerX = bounds.left + bounds.width / 2
    const centerY = bounds.top + bounds.height / 2
    const offsetX = clientX - centerX
    const offsetY = clientY - centerY
    const distance = Math.hypot(offsetX, offsetY)
    const maximumDistance = bounds.width * .28
    const scale = distance > maximumDistance ? maximumDistance / distance : 1
    const x = offsetX * scale
    const y = offsetY * scale

    setPosition({ x, y })

    if (distance < maximumDistance * DEAD_ZONE_RATIO) {
      syncDirections(new Set())
      return
    }

    const nextDirections = new Set<DriveDirection>()
    const horizontalRatio = offsetX / distance
    const verticalRatio = offsetY / distance

    if (horizontalRatio > DIRECTION_THRESHOLD) nextDirections.add('right')
    if (horizontalRatio < -DIRECTION_THRESHOLD) nextDirections.add('left')
    if (verticalRatio > DIRECTION_THRESHOLD) nextDirections.add('down')
    if (verticalRatio < -DIRECTION_THRESHOLD) nextDirections.add('up')
    syncDirections(nextDirections)
  }

  const stopSteering = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (activePointerRef.current !== event.pointerId) return

    activePointerRef.current = null
    setIsSteering(false)
    setPosition(CENTERED_POSITION)
    syncDirections(new Set())

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const controlPad = (
    <div className="f1-car-controls" role="group" aria-label="F1 car steering controls">
      <span className="f1-car-controls__label">Drive</span>
      <button
        ref={joystickRef}
        className={`f1-car-controls__joystick${isSteering ? ' is-steering' : ''}`}
        type="button"
        aria-label="Steering joystick. Drag in any direction to move the F1 car."
        aria-describedby="f1-car-controls-hint"
        aria-keyshortcuts="ArrowUp ArrowRight ArrowDown ArrowLeft W A S D"
        onContextMenu={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          if (activePointerRef.current !== null) return

          event.preventDefault()
          activePointerRef.current = event.pointerId
          event.currentTarget.setPointerCapture(event.pointerId)
          setIsSteering(true)
          updateSteering(event.clientX, event.clientY)
        }}
        onPointerMove={(event) => {
          if (activePointerRef.current !== event.pointerId) return
          updateSteering(event.clientX, event.clientY)
        }}
        onPointerUp={stopSteering}
        onPointerCancel={stopSteering}
        onLostPointerCapture={stopSteering}
      >
        <span
          className="f1-car-controls__thumb"
          style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
          aria-hidden="true"
        >
          <span />
        </span>
      </button>
      <span className="f1-car-controls__hint" id="f1-car-controls-hint">
        Drag / WASD / arrows
      </span>
    </div>
  )

  return createPortal(controlPad, document.body)
}
