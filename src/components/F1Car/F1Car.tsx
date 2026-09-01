import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { F1CarControls } from './F1CarControls'
import { useCarDrive } from './useCarDrive'
import './F1Car.css'

const modelAssets = import.meta.glob<string>(
  '../../assets/models/F1/gltf/**/*',
  { eager: true, query: '?url', import: 'default' },
)

const modelUrl = Object.entries(modelAssets).find(([path]) => path.endsWith('/F1.gltf'))?.[1]

const assetsByRelativePath = new Map(
  Object.entries(modelAssets).map(([path, url]) => [path.split('/gltf/')[1], url]),
)

function disposeModel(model: THREE.Object3D) {
  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    child.geometry.dispose()

    const materials = Array.isArray(child.material) ? child.material : [child.material]
    materials.forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value instanceof THREE.Texture) value.dispose()
      })
      material.dispose()
    })
  })
}

export function F1Car() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(!modelUrl)
  const {
    isDriving,
    toggleDriving,
    pressDirection,
    releaseDirection,
  } = useCarDrive(stageRef, isReady && !hasError)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return

    if (!modelUrl) return

    let active = true
    let animationFrame = 0
    let loadedModel: THREE.Object3D | null = null
    let timer: THREE.Timer | null = null

    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      const errorTimer = window.setTimeout(() => setHasError(true), 0)
      return () => {
        active = false
        window.clearTimeout(errorTimer)
      }
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.setClearAlpha(0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-6, 6, 2.5, -2.5, .1, 100)
    camera.position.set(0, 10, 0)
    camera.up.set(0, 0, -1)
    camera.lookAt(0, 0, 0)

    const carPivot = new THREE.Group()
    scene.add(carPivot)

    scene.add(new THREE.HemisphereLight(0xffffff, 0x24232c, 2.4))

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2)
    keyLight.position.set(4, 6, 6)
    scene.add(keyLight)

    const accentLight = new THREE.DirectionalLight(0xcbff4a, 2.8)
    accentLight.position.set(-5, 2, -3)
    scene.add(accentLight)

    const engineLight = new THREE.PointLight(0xff4d24, 3.2, 7, 2)
    engineLight.position.set(2.5, -.15, .35)
    scene.add(engineLight)

    const resize = () => {
      const width = Math.max(stage.clientWidth, 1)
      const height = Math.max(stage.clientHeight, 1)
      const viewHeight = 5.5
      const viewWidth = viewHeight * (width / height)
      renderer.setSize(width, height, false)
      camera.left = -viewWidth / 2
      camera.right = viewWidth / 2
      camera.top = viewHeight / 2
      camera.bottom = -viewHeight / 2
      camera.updateProjectionMatrix()
      if (reducedMotion) renderer.render(scene, camera)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(stage)
    resize()

    const loadingManager = new THREE.LoadingManager()
    loadingManager.setURLModifier((requestedUrl) => {
      const decodedUrl = decodeURIComponent(requestedUrl)
      const matchingAsset = [...assetsByRelativePath.entries()].find(
        ([relativePath]) => relativePath && decodedUrl.endsWith(relativePath),
      )
      return matchingAsset?.[1] ?? requestedUrl
    })

    const loader = new GLTFLoader(loadingManager)
    loader.load(
      modelUrl,
      ({ scene: model }) => {
        if (!active) {
          disposeModel(model)
          return
        }

        const bounds = new THREE.Box3().setFromObject(model)
        const center = bounds.getCenter(new THREE.Vector3())
        const size = bounds.getSize(new THREE.Vector3())
        const largestDimension = Math.max(size.x, size.y, size.z)

        model.position.sub(center)
        carPivot.scale.setScalar(6.2 / largestDimension)
        carPivot.rotation.set(0, 0, 0)
        carPivot.add(model)
        loadedModel = model

        setIsReady(true)
        renderer.render(scene, camera)
      },
      undefined,
      () => {
        if (active) setHasError(true)
      },
    )

    if (!reducedMotion) {
      timer = new THREE.Timer()
      timer.connect(document)

      const animate = (timestamp?: number) => {
        timer?.update(timestamp)
        const elapsed = timer?.getElapsed() ?? 0
        carPivot.position.y = Math.sin(elapsed * 24) * .006
        engineLight.intensity = 3.1 + Math.sin(elapsed * 9) * .35 + Math.sin(elapsed * 17) * .18
        renderer.render(scene, camera)
        animationFrame = requestAnimationFrame(animate)
      }
      animate()
    }

    return () => {
      active = false
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      timer?.dispose()
      if (loadedModel) disposeModel(loadedModel)
      renderer.dispose()
    }
  }, [reducedMotion])

  return (
    <>
      <div
      ref={stageRef}
      className={`f1-car${isReady ? ' is-ready' : ''}${hasError ? ' has-error' : ''}${isDriving ? ' is-driving' : ''}`}
      role="img"
      aria-label="Interactive top-view 3D model of a Formula One racing car"
    >
      <div className="f1-car-visual">
        <div className="f1-car-effects" aria-hidden="true">
          <span className="f1-car-ground-glow" />
          <span className="f1-car-exhaust" />
          <span className="f1-car-trail f1-car-trail--one" />
          <span className="f1-car-trail f1-car-trail--two" />
          <span className="f1-car-trail f1-car-trail--three" />
        </div>
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
      <div className="f1-car-status" aria-hidden="true">
        <span />
        {hasError ? 'Model unavailable' : 'Loading F1 model'}
      </div>
      {isReady && !hasError && (
        <button
          className="f1-car-drive-toggle"
          type="button"
          aria-label={isDriving ? 'Stop driving the F1 car' : 'Drive the F1 car with the W A S D keys'}
          aria-describedby={isDriving ? undefined : 'f1-car-drive-help'}
          aria-pressed={isDriving}
          onClick={toggleDriving}
        >
          {isDriving ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="m7 7 10 10M17 7 7 17"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.8v12.4a1 1 0 0 0 1.55.84l9-6.2a1 1 0 0 0 0-1.68l-9-6.2A1 1 0 0 0 8 5.8Z" />
            </svg>
          )}
        </button>
      )}
      {isReady && !hasError && !isDriving && (
        <p className="f1-car-drive-prompt" id="f1-car-drive-help">
          Use <span>W A S D</span> keys to move around
        </p>
      )}
      </div>
      {isDriving && (
        <F1CarControls
          onPress={pressDirection}
          onRelease={releaseDirection}
        />
      )}
    </>
  )
}
