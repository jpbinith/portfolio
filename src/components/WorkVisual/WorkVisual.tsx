import type { PointerEvent } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { ProjectVisual } from '../../types/portfolio'
import './WorkVisual.css'

interface WorkVisualProps {
  type: ProjectVisual
}

function DocumentsVisual() {
  return (
    <div className="doc-stack">
      <div className="doc" />
      <div className="doc" />
      <div className="doc">
        {Array.from({ length: 6 }, (_, index) => <span className="doc-line" key={index} />)}
        <div className="scan-line" />
      </div>
    </div>
  )
}

function DashboardVisual() {
  return (
    <div className="dashboard">
      <div className="dashboard-side">
        <div className="dash-logo" />
        {Array.from({ length: 3 }, (_, index) => <div className="dash-link" key={index} />)}
      </div>
      <div className="dashboard-main">
        <div className="dash-top" />
        <div className="dash-grid">
          <div className="dash-panel"><div className="dash-chart" /></div>
          <div className="dash-panel" />
          <div className="dash-panel" />
          <div className="dash-panel"><div className="dash-chart" /></div>
        </div>
      </div>
    </div>
  )
}

function CommerceVisual() {
  return (
    <div className="commerce-orbit">
      <div className="commerce-ring" />
      <div className="commerce-ring" />
      <div className="commerce-core">50K+</div>
      <div className="commerce-dot">USER</div>
      <div className="commerce-dot">API</div>
      <div className="commerce-dot">DATA</div>
    </div>
  )
}

function PipelineVisual() {
  return (
    <div className="pipeline">
      <div className="pipe-node">ORDER</div>
      <div className="pipe-line" />
      <div className="pipe-node">OCR</div>
      <div className="pipe-line" />
      <div className="pipe-node">OPS</div>
    </div>
  )
}

const visuals = {
  documents: DocumentsVisual,
  dashboard: DashboardVisual,
  commerce: CommerceVisual,
  pipeline: PipelineVisual,
}

export function WorkVisual({ type }: WorkVisualProps) {
  const reducedMotion = useReducedMotion()
  const Visual = visuals[type]

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - .5
    const y = (event.clientY - rect.top) / rect.height - .5
    event.currentTarget.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) scale(.99)`
  }

  const resetTilt = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = ''
  }

  return (
    <div
      className="work-visual"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <Visual />
    </div>
  )
}
