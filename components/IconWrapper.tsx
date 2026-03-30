import React, { type ComponentType } from 'react';
import { type LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  icon: LucideIcon | ComponentType<{ className?: string }>;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ icon: Icon }) => (
  <Icon className="icon-inline" />
);
