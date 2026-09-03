import { CV_DOWNLOAD_NAME, CV_URL } from '../../config/site'
import { useGame } from '../../context/useGame'
import { useReveal } from '../../hooks/useReveal'
import { Button, IconLink } from '../Button/Button'
import { ArrowIcon, GitHubIcon, LinkedInIcon } from '../Button/Icons'
import { F1CarLoader } from '../F1Car/F1CarLoader'
import { SystemMap } from '../SystemMap/SystemMap'
import './Hero.css'

export function Hero() {
  const { mode: gameMode, minimizeGame } = useGame()
  const { ref: contentRef, revealClassName: contentRevealClass } = useReveal<HTMLDivElement>()
  const { ref: footRef, revealClassName: footRevealClass } = useReveal<HTMLDivElement>()

  return (
    <section className="hero shell" id="top" aria-labelledby="hero-title">
      {gameMode === 'active' && <F1CarLoader autoStart onStop={minimizeGame} />}
      <div className="hero-inner">
        <div className="hero-grid">
          <div ref={contentRef} className={`hero-content ${contentRevealClass}`}>
            <div className="availability">
              <span className="availability-dot" />
              <span className="availability-text availability-text--desktop">
                Open to opportunities · Full Australian work rights
              </span>
              <span className="availability-text availability-text--mobile">
                Open to roles · Australia
              </span>
            </div>
            <h1 id="hero-title">
              <span className="name">AI +</span>
              <span className="role role--software">Software</span>
              <span className="role outline-text">Engineer.</span>
            </h1>
            <p className="hero-copy hero-copy--desktop">
              Melbourne-based engineer with <strong>4+ years of experience</strong> delivering{' '}
              <strong>production AI workflows</strong>, <strong>scalable backend systems</strong> and{' '}
              <strong>full-stack products</strong> across financial services and e-commerce.
            </p>
            <p className="hero-copy hero-copy--mobile">
              Melbourne-based engineer with <strong>4+ years</strong> building{' '}
              <strong>production AI, backend and full-stack products.</strong>
            </p>
            <div className="hero-actions">
              <Button className="hero-action--primary" href="#work">
                View selected work <ArrowIcon />
              </Button>
              <Button
                className="hero-action--secondary"
                variant="ghost"
                href={CV_URL}
                download={CV_DOWNLOAD_NAME}
              >
                Download CV
              </Button>
              <IconLink
                className="hero-action--social"
                href="https://www.linkedin.com/in/binith-jayasinghe/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon />
              </IconLink>
              <IconLink
                className="hero-action--social"
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
