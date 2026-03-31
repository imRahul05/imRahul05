import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FloatingButton } from './FloatingButton';

interface SauronButtonProps {
  enabled: boolean;
  onClick: () => void;
  className?: string;
}

export const SauronButton: React.FC<SauronButtonProps> = ({ enabled, onClick, className }) => {
  return (
    <FloatingButton
      icon={enabled ? EyeOff : Eye}
      label="Sauron"
      onClick={onClick}
      className={`sauron-btn ${enabled ? 'is-active' : ''} ${className || ''}`.trim()}
      ariaLabel={enabled ? 'Disable Sauron background' : 'Enable Sauron background'}
    />
  );
};
