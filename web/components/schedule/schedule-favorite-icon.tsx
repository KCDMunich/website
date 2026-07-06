import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

type ScheduleFavoriteIconProps = {
  active?: boolean;
  className?: string;
  /** Use on dark or colored backgrounds (e.g. active filter pill). */
  tone?: 'default' | 'inverse';
};

export function ScheduleFavoriteIcon({
  active = false,
  className,
  tone = 'default',
}: ScheduleFavoriteIconProps) {
  return (
    <Heart
      className={cn(
        'shrink-0 transition-colors',
        active && tone === 'inverse' && 'fill-white text-white',
        active && tone === 'default' && 'fill-red-500 text-red-500',
        !active && 'fill-transparent text-current',
        className,
      )}
      strokeWidth={active ? 1.75 : 2}
      aria-hidden
    />
  );
}