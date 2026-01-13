import React from "react";
import { LucideIcon } from "lucide-react";

import "../styles/AnimatedThemeToggler.css";

interface FloatingButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  className,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={`theme-toggle-btn floating-btn-with-tooltip ${className || ""}`}
      type="button"
    >
      <span className="floating-btn-tooltip">{label}</span>
      <span className="icon-wrapper">
        <Icon size={18} className="theme-icon" />
      </span>
    </button>
  );
};
