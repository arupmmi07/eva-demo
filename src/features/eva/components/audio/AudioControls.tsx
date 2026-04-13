import { Gauge, Mic, Play } from 'lucide-react';

export type AudioControlsSize = 'sm' | 'md';

export function AudioControls({
  size = 'md',
  gap = 'md',
  className = '',
}: {
  size?: AudioControlsSize;
  /** Spacing between mic / play / gauge */
  gap?: 'sm' | 'md';
  className?: string;
}) {
  const iconClass = size === 'sm' ? 'size-[14px]' : 'size-[16px]';
  const gapClass = gap === 'sm' ? 'gap-[12px]' : 'gap-[16px]';
  const stroke = 1.5;

  return (
    <div
      data-name="AudioControls"
      role="group"
      aria-label="Audio controls"
      className={`flex items-center ${gapClass} text-[var(--ds-text-secondary)] ${className}`}
    >
      <button type="button" className="p-[4px]" aria-label="Voice input">
        <Mic className={iconClass} strokeWidth={stroke} aria-hidden />
      </button>
      <button type="button" className="p-[4px]" aria-label="Play audio">
        <Play className={iconClass} strokeWidth={stroke} aria-hidden />
      </button>
      <button type="button" className="p-[4px]" aria-label="Audio levels">
        <Gauge className={iconClass} strokeWidth={stroke} aria-hidden />
      </button>
    </div>
  );
}
