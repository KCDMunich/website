'use client';

import { cn } from '@/lib/utils';

type SchedulePillVariant = 'chip' | 'segment' | 'favorite';

type SchedulePillProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  title?: string;
  'aria-label'?: string;
  variant?: SchedulePillVariant;
  icon?: React.ReactNode;
};

export function SchedulePill({
  children,
  active = false,
  onClick,
  className,
  title,
  'aria-label': ariaLabel,
  variant = 'chip',
  icon,
}: SchedulePillProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-1.5 font-semibold transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2',
        variant === 'segment' && [
          'rounded-full px-4 py-2 text-sm',
          active
            ? 'bg-background text-primary shadow-sm ring-1 ring-border/80'
            : 'text-muted-foreground hover:text-foreground',
        ],
        variant === 'chip' && [
          'rounded-full px-3.5 py-2 text-sm',
          active
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'bg-background text-muted-foreground ring-1 ring-border/80 hover:bg-muted/50 hover:text-foreground',
        ],
        variant === 'favorite' && [
          'rounded-full px-3.5 py-2 text-sm',
          active
            ? 'bg-red-500 text-white shadow-sm ring-1 ring-red-500/20'
            : 'bg-background text-muted-foreground ring-1 ring-border/80 hover:bg-red-50 hover:text-red-600',
        ],
        className,
      )}
    >
      {icon ? <span className="inline-flex">{icon}</span> : null}
      {children}
    </button>
  );
}

type ScheduleSegmentGroupProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
};

export function ScheduleSegmentGroup({
  children,
  className,
  label,
}: ScheduleSegmentGroupProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className="inline-flex rounded-full bg-muted/50 p-1 ring-1 ring-border/60"
        role="group"
        aria-label={label ?? 'Schedule options'}
      >
        {children}
      </div>
    </div>
  );
}
