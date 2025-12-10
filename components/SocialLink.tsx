import React from 'react';
import { LucideIcon } from 'lucide-react';
import { IconWrapper } from './IconWrapper';

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="social-link"
  >
    <IconWrapper icon={icon} />
    {label}
  </a>
);