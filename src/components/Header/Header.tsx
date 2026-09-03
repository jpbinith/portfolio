import { useEffect, useState } from 'react'
import { navigation } from '../../data/portfolio'
import { useGame } from '../../context/useGame'
import { useTheme } from '../../context/useTheme'
import { Button } from '../Button/Button'
import { MoonIcon, SunIcon } from '../Button/Icons'
import './Header.css'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { mode: gameMode, startGame } = useGame()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-38% 0px -55% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="shell nav">
        <a className="brand" href="#top" aria-label="Binith Jayasinghe — home" onClick={closeMenu}>
          <span className="brand-mark">BJ</span>
          <span>Binith Jayasinghe</span>
        </a>

        <div className="header-navigation">
          {gameMode === 'minimized' && (
            <button
              className="game-launcher"
              type="button"
              aria-label="Start the interactive F1 driving mode"
              title="Start F1 driving mode"
              onClick={() => {
                closeMenu()
                startGame()
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5.8v12.4a1 1 0 0 0 1.55.84l9-6.2a1 1 0 0 0 0-1.68l-9-6.2A1 1 0 0 0 8 5.8Z" />
              </svg>
              <span className="game-launcher__label">Drive</span>
            </button>
          )}

          <ul className={`nav-links${isMenuOpen ? ' is-open' : ''}`} id="nav-links">
            {navigation.map(({ label, href }) => (
              <li key={href}>
                <a
                  className={`nav-link${activeSection === href.slice(1) ? ' active' : ''}`}
                  href={href}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-links__utility">
              <button
                className="nav-utility"
                type="button"
                onClick={toggleTheme}
              >
                <span className="nav-utility__icon" aria-hidden="true">
                  {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
                </span>
                Use {theme === 'dark' ? 'light' : 'dark'} theme
              </button>
            </li>
            <li className="nav-links__utility">
              <a className="nav-utility" href="#contact" onClick={closeMenu}>
                <span className="nav-utility__dot" aria-hidden="true" />
                Contact me
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle theme-toggle--desktop"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} colour theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} colour theme`}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </button>
          <Button variant="ghost" href="#contact">Contact me</Button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-controls="nav-links"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
