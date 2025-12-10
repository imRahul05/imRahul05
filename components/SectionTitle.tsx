import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="section-title">
    {children}
  </h2>
);