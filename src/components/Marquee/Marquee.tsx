import { marqueeItems } from '../../data/portfolio'
import './Marquee.css'

export function Marquee() {
  const repeatedItems = [...marqueeItems, ...marqueeItems]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {repeatedItems.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </div>
  )
}
