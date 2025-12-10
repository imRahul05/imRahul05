import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TypewriterText } from './TypewriterText';

interface ProjectItemProps {
  name: string;
  description: string;
  tech: string[];
  link: string;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ name, description, tech, link }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="entry"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-title-row mb-1" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <a 
          href={link} 
          className="entry-title font-bold text-sm"
          style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: isHovered ? 'var(--text-primary)' : 'var(--border-color)', textUnderlineOffset: '4px', transition: 'text-decoration-color 0.2s' }}
        >
          {name}
        </a>
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

      <div className="tech-stack">
        {tech.map((t) => (
          <span key={t} className="tech-item">
            {t}
          </span>
        ))}
      </div>
      
      {isOpen && (
        <p className="text-sm text-secondary leading-relaxed mb-2">
          <TypewriterText text={description} speed={5} />
        </p>
      )}
    </div>
  );
};