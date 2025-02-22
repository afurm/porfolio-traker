import React from 'react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export function Icon({ name, size = 'md', className, ...props }: IconProps) {
  const LucideIcon = LucideIcons[name];
  const iconSize = typeof size === 'string' ? sizeMap[size as keyof typeof sizeMap] || 20 : size;

  return (
    <LucideIcon
      size={iconSize}
      className={cn('inline-block', 'transition-colors', 'text-foreground', className)}
      {...props}
    />
  );
}

// Common icon groups
export const navigationIcons: IconName[] = [
  'Home',
  'BarChart2',
  'Wallet',
  'Settings',
  'User',
  'LogOut',
];

export const actionIcons: IconName[] = [
  'Plus',
  'Minus',
  'Edit',
  'Trash',
  'Download',
  'Upload',
  'Search',
  'Filter',
];

export const cryptoIcons: IconName[] = [
  'Bitcoin',
  'DollarSign',
  'TrendingUp',
  'TrendingDown',
  'ArrowUpRight',
  'ArrowDownRight',
];

export const statusIcons: IconName[] = [
  'CheckCircle',
  'XCircle',
  'AlertCircle',
  'Clock',
  'RefreshCw',
];
