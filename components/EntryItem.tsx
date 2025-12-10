import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TypewriterText } from './TypewriterText';

interface EntryItemProps {
  title: string;
  subtitle: string;
  meta: string;
  description: string;
}

export const EntryItem: React.FC<EntryItemProps> = ({ title, subtitle, meta, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="entry"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="entry-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h3 className="font-bold text-sm">
            {title}
          </h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              opacity: isHovered || isOpen ? 1 : 0,
              transition: 'opacity 0.2s ease-in-out',
            }}
            aria-label={isOpen ? "Collapse details" : "Expand details"}
          >
            <ChevronDown 
              size={14} 
              className="text-muted"
              style={{ 
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out'
              }} 
            />
          </button>
        </div>
        <span className="text-xs text-muted font-mono">{meta}</span>
      </div>
      <div className="entry-role text-sm">{subtitle}</div>
      {isOpen && (
        <p className="text-sm text-secondary leading-relaxed">
          <TypewriterText text={description} speed={5} />
        </p>
      )}
    </div>
  );
};