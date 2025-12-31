"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"

import "../styles/AnimatedThemeToggler.css"

const THEMES = [
  { name: "lilac", icon: Sun },
  { name: "dark", icon: Moon },
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

    // Sync dark class for compatibility if needed (though we mostly use data-theme now)
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle("dark", isDark)
  }, [currentThemeIndex])

  const onToggle = useCallback(async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        setCurrentThemeIndex((prev) => (prev + 1) % THEMES.length)
      })
    }).ready

    // Start animation from the center of the viewport
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    const maxDistance = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${centerX}px ${centerY}px)`,
          `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
        ],
      },
      {
        duration: 400,
        easing: "ease-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [])

  const CurrentIcon = THEMES[currentThemeIndex].icon

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label={`Switch theme (current: ${THEMES[currentThemeIndex].name})`}
      className={`theme-toggle-btn ${className || ""}`}
      type="button"
    >
      <span className="icon-wrapper">
        <CurrentIcon size={18} className="theme-icon" key={THEMES[currentThemeIndex].name} />
      </span>
    </button>
  )
}