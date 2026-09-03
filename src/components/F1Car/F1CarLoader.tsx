import { lazy, Suspense } from 'react'

const LazyF1Car = lazy(async () => {
  const module = await import('./F1Car')
  return { default: module.F1Car }
})

type F1CarLoaderProps = {
  autoStart?: boolean
  onStop?: () => void
}

export function F1CarLoader({ autoStart = false, onStop }: F1CarLoaderProps) {
  return (
    <Suspense fallback={null}>
      <LazyF1Car autoStart={autoStart} onStop={onStop} />
    </Suspense>
  )
}
