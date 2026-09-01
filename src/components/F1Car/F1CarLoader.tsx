import { lazy, Suspense, useEffect, useState } from 'react'

const LazyF1Car = lazy(async () => {
  const module = await import('./F1Car')
  return { default: module.F1Car }
})

export function F1CarLoader() {
  const [isLargeScreen, setIsLargeScreen] = useState(() =>
    window.matchMedia('(min-width: 981px)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(min-width: 981px)')
    const update = () => setIsLargeScreen(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  if (!isLargeScreen) return null

  return (
    <Suspense fallback={null}>
      <LazyF1Car />
    </Suspense>
  )
}
