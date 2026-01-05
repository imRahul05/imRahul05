import React, { ComponentType } from 'react';
import { LucideIcon } from 'lucide-react';
import { IconWrapper } from './IconWrapper';

interface SocialLinkProps {
  href: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
  label: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  let processedHref = href;

  // If it's an email link, construct a direct Gmail compose URL to open in browser
  if (href.startsWith('mailto:')) {
    const email = href.replace('mailto:', '');
    const subject = encodeURIComponent("Hello from [Your Name]");
    const body = encodeURIComponent("Hi Rahul,\n\nI came across your portfolio and wanted to connect with you.\n\nBest regards,\n[Your Name]");
    processedHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  }

  return (
    <a
      href={processedHref}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
      aria-label={label}
    >
      <IconWrapper icon={icon} />
      {label}
    </a>
  );
};