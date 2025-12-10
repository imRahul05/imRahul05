import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  icon: LucideIcon;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ icon: Icon }) => (
  <Icon className="icon-inline" />
);