import type { AnchorHTMLAttributes, ReactNode } from 'react'
import './Button.css'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost'
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const classes = ['button', variant === 'ghost' ? 'button--ghost' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  )
}

interface IconLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export function IconLink({ children, className = '', ...props }: IconLinkProps) {
  return (
    <a className={`icon-link ${className}`.trim()} {...props}>
      {children}
    </a>
  )
}
