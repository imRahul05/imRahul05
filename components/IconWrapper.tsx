import React, { ComponentType } from 'react';
import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  icon: LucideIcon | ComponentType<{ className?: string }>;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ icon: Icon }) => (
  <Icon className="icon-inline" />
);