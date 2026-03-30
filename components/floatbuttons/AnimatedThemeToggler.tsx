"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { flushSync } from "react-dom"

import "../styles/AnimatedThemeToggler.css"

const MoonIcon = ({ className = "", size = 18 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

const SunIcon = ({ className = "", size = 18 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
)

const THEMES = [
  { name: "lilac", icon: SunIcon },
  { name: "dark", icon: MoonIcon },
] as const

export const AnimatedThemeToggler = ({ className }: { className?: string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [currentThemeIndex, setCurrentThemeIndex] = useState(() => {
    if (typeof window === "undefined") return 0
    const saved = localStorage.getItem("theme")
    const index = THEMES.findIndex((t) => t.name === saved)
    return index >= 0 ? index : 0
  })

  useEffect(() => {
    const theme = THEMES[currentThemeIndex].name
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem("theme", theme)

    // Sync dark class for compatibility if needed
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle("dark", isDark)
  }, [currentThemeIndex])

  const onToggle = useCallback(async () => {
    if (!buttonRef.current) return

    const nextIndex = (currentThemeIndex + 1) % THEMES.length
    const isNextDark = THEMES[nextIndex].name === "dark"

    await document.startViewTransition(() => {
      flushSync(() => {
        setCurrentThemeIndex(nextIndex)
      })
    }).ready

    if (isNextDark) {
      // Switching to dark (white to black): top to bottom
      document.documentElement.animate(
        {
          clipPath: [
            "inset(0 0 100% 0)", // bottom fully covered, reveal downward
            "inset(0 0 0 0)", // fully revealed
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    } else {
      // Switching to lilac (black to white): bottom to top
      document.documentElement.animate(
        {
          clipPath: [
            "inset(100% 0 0 0)", // top fully covered, reveal upward
            "inset(0 0 0 0)", // fully revealed
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    }
  }, [currentThemeIndex])

  const CurrentIcon = THEMES[currentThemeIndex].icon

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label={`Switch theme (current: ${THEMES[currentThemeIndex].name})`}
      className={`theme-toggle-btn floating-btn-with-tooltip ${className || ""}`}
      type="button"
    >
      <span className="floating-btn-tooltip">Theme</span>
      <span className="icon-wrapper">
        <CurrentIcon size={18} className="theme-icon" key={THEMES[currentThemeIndex].name} />
      </span>
    </button>
  )
}