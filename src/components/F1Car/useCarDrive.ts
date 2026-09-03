import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

const DRIVE_SCALE = .68
const DRIVE_SPEED = 340
const AUTO_SCROLL_SPEED = 760
const EDGE_ZONE_RATIO = .28
const MINIMUM_EDGE_ZONE = 220

export type DriveDirection = 'up' | 'right' | 'down' | 'left'

const KEY_DIRECTIONS: Partial<Record<string, DriveDirection>> = {
  KeyW: 'up',
  ArrowUp: 'up',
  KeyD: 'right',
  ArrowRight: 'right',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyA: 'left',
  ArrowLeft: 'left',
}

type Position = {
  x: number
  y: number
}

export function useCarDrive(
  stageRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  onCancel?: () => void,
) {
  const [isDriving, setIsDriving] = useState(false)
  const activeDirectionsRef = useRef(new Set<DriveDirection>())

  const startDriving = useCallback(() => {
    if (!enabled || isDriving) return

    activeDirectionsRef.current.clear()
    setIsDriving(true)
  }, [enabled, isDriving])

  const stopDriving = useCallback(() => {
    activeDirectionsRef.current.clear()
    setIsDriving(false)
  }, [])

  const toggleDriving = useCallback(() => {
    if (isDriving) stopDriving()
    else startDriving()
  }, [isDriving, startDriving, stopDriving])

  const pressDirection = useCallback((direction: DriveDirection) => {
    if (isDriving) activeDirectionsRef.current.add(direction)
  }, [isDriving])

  const releaseDirection = useCallback((direction: DriveDirection) => {
    activeDirectionsRef.current.delete(direction)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !isDriving || !enabled) return

    const stageWidth = stage.offsetWidth
    const stageHeight = stage.offsetHeight
    const carHalfWidth = Math.max(38, stageWidth * .09 * DRIVE_SCALE)
    const carHalfHeight = Math.max(76, stageHeight * .46 * DRIVE_SCALE)
    const position: Position = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    const activeDirections = activeDirectionsRef.current
    const previousScrollBehavior = document.documentElement.style.scrollBehavior
    let heading = 0
    let animationFrame = 0
    let previousTimestamp = performance.now()

    document.documentElement.style.scrollBehavior = 'auto'

    const updateStage = () => {
      const x = position.x - stageWidth / 2
      const y = position.y - stageHeight / 2
      stage.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${DRIVE_SCALE})`
      stage.style.setProperty('--drive-heading', `${heading}deg`)
    }

    const stopControls = () => activeDirections.clear()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        event.preventDefault()
        stopDriving()
        onCancel?.()
        return
      }

      const direction = KEY_DIRECTIONS[event.code]
      if (!direction) return
      event.preventDefault()
      activeDirections.add(direction)
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const direction = KEY_DIRECTIONS[event.code]
      if (!direction) return
      event.preventDefault()
      activeDirections.delete(direction)
    }

    const drive = (timestamp: number) => {
      const delta = Math.min((timestamp - previousTimestamp) / 1000, .04)
      previousTimestamp = timestamp

      let horizontal = Number(activeDirections.has('right')) - Number(activeDirections.has('left'))
      let vertical = Number(activeDirections.has('down')) - Number(activeDirections.has('up'))
      const magnitude = Math.hypot(horizontal, vertical)
      const maximumScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      )
      const edgeZone = Math.max(window.innerHeight * EDGE_ZONE_RATIO, MINIMUM_EDGE_ZONE)
      const topDriveBoundary = Math.max(edgeZone, carHalfHeight + 8)
      const bottomDriveBoundary = Math.min(
        window.innerHeight - edgeZone,
        window.innerHeight - carHalfHeight - 8,
      )

      if (magnitude > 0) {
        horizontal /= magnitude
        vertical /= magnitude
        position.x += horizontal * DRIVE_SPEED * delta

        const nextY = position.y + vertical * DRIVE_SPEED * delta
        const canScrollUp = window.scrollY > 1
        const canScrollDown = window.scrollY < maximumScroll - 1

        if (vertical < 0 && canScrollUp && nextY <= topDriveBoundary) {
          position.y = topDriveBoundary
          window.scrollBy(0, -AUTO_SCROLL_SPEED * Math.abs(vertical) * delta)
        } else if (vertical > 0 && canScrollDown && nextY >= bottomDriveBoundary) {
          position.y = bottomDriveBoundary
          window.scrollBy(0, AUTO_SCROLL_SPEED * Math.abs(vertical) * delta)
        } else {
          position.y = nextY
        }

        const targetHeading = Math.atan2(-horizontal, vertical) * (180 / Math.PI)
        const headingDifference = ((targetHeading - heading + 540) % 360) - 180
        heading += headingDifference * Math.min(delta * 12, 1)
      }

      position.x = Math.min(
        Math.max(position.x, carHalfWidth + 8),
        window.innerWidth - carHalfWidth - 8,
      )
      position.y = Math.min(
        Math.max(position.y, carHalfHeight + 8),
        window.innerHeight - carHalfHeight - 8,
      )

      updateStage()
      animationFrame = window.requestAnimationFrame(drive)
    }

    updateStage()
    animationFrame = window.requestAnimationFrame(drive)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', stopControls)
    document.addEventListener('visibilitychange', stopControls)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', stopControls)
      document.removeEventListener('visibilitychange', stopControls)
      activeDirections.clear()
      document.documentElement.style.scrollBehavior = previousScrollBehavior
      stage.style.removeProperty('transform')
      stage.style.removeProperty('--drive-heading')
    }
  }, [enabled, isDriving, onCancel, stageRef, stopDriving])

  return {
    isDriving,
    startDriving,
    stopDriving,
    toggleDriving,
    pressDirection,
    releaseDirection,
  }
}
