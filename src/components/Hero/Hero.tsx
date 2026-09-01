import { useReveal } from '../../hooks/useReveal'
import { Button, IconLink } from '../Button/Button'
import { ArrowIcon, GitHubIcon, LinkedInIcon } from '../Button/Icons'
import { SystemMap } from '../SystemMap/SystemMap'
import './Hero.css'

export function Hero() {
  const { ref: contentRef, revealClassName: contentRevealClass } = useReveal<HTMLDivElement>()
  const { ref: footRef, revealClassName: footRevealClass } = useReveal<HTMLDivElement>()

  return (
    <section className="hero shell" id="top" aria-labelledby="hero-title">
      <div>
        <div className="hero-grid">
          <div ref={contentRef} className={`hero-content ${contentRevealClass}`}>
            <div className="availability">
              <span className="availability-dot" />
              Melbourne, Australia · Full work rights
            </div>
            <h1 id="hero-title">
              <span className="name">Binith</span>
              <span className="role">Builds <span className="outline-text">what’s next.</span></span>
            </h1>
            <p className="hero-copy">
              AI Software Engineer building <strong>intelligent products</strong>,{' '}
              <strong>high-scale backends</strong> and <strong>polished full-stack experiences</strong>{' '}
              that solve practical business problems.
            </p>
            <div className="hero-actions">
              <Button href="#work">Explore selected work <ArrowIcon /></Button>
              <Button variant="ghost" href="/Binith-Jayasinghe-CV.pdf" download>Download CV</Button>
              <IconLink
                href="https://www.linkedin.com/in/binith-jayasinghe/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon />
              </IconLink>
              <IconLink
                href="https://github.com/jpbinith"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GitHubIcon />
              </IconLink>
            </div>
          </div>

          <SystemMap />
        </div>

        <div ref={footRef} className={`hero-foot ${footRevealClass}`}>
          <span>Software Engineer · Backend · Full-stack · AI</span>
          <span className="scroll-cue"><span />Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
