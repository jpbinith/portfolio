import { CV_DOWNLOAD_NAME, CV_URL } from '../../config/site'
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
              Open to opportunities · Full Australian work rights
            </div>
            <h1 id="hero-title">
              <span className="name">AI +</span>
              <span className="role role--software">Software</span>
              <span className="role outline-text">Engineer.</span>
            </h1>
            <p className="hero-copy">
              Melbourne-based engineer with <strong>4+ years of experience</strong> delivering{' '}
              <strong>production AI workflows</strong>, <strong>scalable backend systems</strong> and{' '}
              <strong>full-stack products</strong> across financial services and e-commerce.
            </p>
            <div className="hero-actions">
              <Button href="#work">View selected work <ArrowIcon /></Button>
              <Button variant="ghost" href={CV_URL} download={CV_DOWNLOAD_NAME}>Download CV</Button>
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
          <span>Seeking AI Engineer · Software Engineer roles</span>
          <span className="scroll-cue"><span />Experience & skills</span>
        </div>
      </div>
    </section>
  )
}
