import { CV_DOWNLOAD_NAME, CV_URL } from '../../config/site'
import { useReveal } from '../../hooks/useReveal'
import { Button } from '../Button/Button'
import { ArrowIcon } from '../Button/Icons'
import './Contact.css'

export function Contact() {
  const { ref: kickerRef, revealClassName: kickerRevealClass } = useReveal<HTMLParagraphElement>()
  const { ref: titleRef, revealClassName: titleRevealClass } = useReveal<HTMLHeadingElement>()
  const { ref: rowRef, revealClassName: rowRevealClass } = useReveal<HTMLDivElement>()
  const year = new Date().getFullYear()

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="shell">
        <p ref={kickerRef} className={`section-kicker ${kickerRevealClass}`}>
          06 · Contact
        </p>
        <h2 ref={titleRef} className={`contact-title ${titleRevealClass}`} id="contact-title">
          Need an engineer who can ship? Let’s talk.
        </h2>
        <div ref={rowRef} className={`contact-row ${rowRevealClass}`}>
          <p className="contact-copy">
            I’m currently exploring AI Engineer and Software Engineer opportunities in Melbourne.
            With full Australian work rights, I’m ready to contribute across applied AI, backend
            systems, cloud and full-stack product delivery.
          </p>
          <div className="contact-actions">
            <Button href="mailto:jpbinith@gmail.com">jpbinith@gmail.com <ArrowIcon /></Button>
            <Button variant="ghost" href="tel:+61452516327">Call me</Button>
          </div>
        </div>

        <footer className="footer">
          <span>© {year} Binith Jayasinghe · Melbourne</span>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/binith-jayasinghe/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/jpbinith" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={CV_URL} download={CV_DOWNLOAD_NAME}>CV ↓</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </section>
  )
}
