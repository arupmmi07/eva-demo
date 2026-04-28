import { useId } from 'react';
import { cn } from '@/app/components/ui/utils';

/** 28×28 calendar mark from design (indigo strokes on `#EEF2FF` tile, `rx={7}`). */
export function DailyScheduleCalendarIcon({ className }: { className?: string }) {
  const clipId = useId().replace(/:/g, '');

  return (
    <svg
      className={cn('block shrink-0', className)}
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="28" height="28" rx="7" fill="#EEF2FF" />
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M18.0833 9.33337H9.91667C9.27233 9.33337 8.75 9.85571 8.75 10.5V18.6667C8.75 19.311 9.27233 19.8334 9.91667 19.8334H18.0833C18.7277 19.8334 19.25 19.311 19.25 18.6667V10.5C19.25 9.85571 18.7277 9.33337 18.0833 9.33337Z"
          stroke="#4338CA"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.3333 8.16663V10.5"
          stroke="#4338CA"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6667 8.16663V10.5"
          stroke="#4338CA"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.75 12.8334H19.25"
          stroke="#4338CA"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="14" height="14" fill="white" transform="translate(7 7)" />
        </clipPath>
      </defs>
    </svg>
  );
}
