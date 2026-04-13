import { ArrowRight, Send } from 'lucide-react';
import { formatSessionClock } from '../../utils/format';
import { AudioControls } from '../audio/AudioControls';

export function SessionFloatingWidget({ sessionSeconds }: { sessionSeconds: number }) {
  return (
    <div
      data-name="SessionFloatingWidget"
      className="fixed bottom-[16px] left-[calc(var(--ds-rail-width)+12px)] z-20 w-[324px] overflow-hidden rounded-[var(--ds-radius-card)] border border-[var(--ds-border-accent)] bg-[var(--ds-bg-primary)] shadow-[var(--ds-shadow-card)]"
    >
      <div className="bg-gradient-to-r from-[var(--ds-danger)] to-[var(--ds-primary-action)] p-[16px] text-white">
        <div className="mb-[12px] flex items-center justify-between">
          <p className="font-['Inter',sans-serif] text-[15px] font-semibold leading-[22px]">Session - In Progress..</p>
          <button type="button" className="rounded-full bg-white/20 p-[4px]" aria-label="Expand session">
            <ArrowRight className="size-[12px]" strokeWidth={2} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-[16px]">
          <div>
            <p className="font-['Inter',sans-serif] text-[18px] font-semibold tracking-[0.08em]">{formatSessionClock(sessionSeconds)}</p>
            <div className="mt-[8px] flex items-center gap-[4px]">
              {[10, 13, 8, 18, 12, 15, 9, 14, 7, 16, 10, 14].map((height, index) => (
                <span key={`sf-${index}`} className="block w-[2px] rounded-full bg-white" style={{ height }} />
              ))}
            </div>
          </div>
          <button type="button" className="rounded-[var(--ds-radius-card)] bg-white/20 px-[12px] py-[8px] font-['Inter',sans-serif] text-[12px] font-semibold leading-[18px]">
            View Transcript
          </button>
        </div>
      </div>
      <div className="flex items-center gap-[12px] px-[16px] py-[12px] text-[var(--ds-text-secondary)]">
        <div className="flex size-[32px] items-center justify-center rounded-full bg-[var(--ds-bg-accent-purple)] text-[12px] text-[var(--ds-primary-action)]">
          ✦
        </div>
        <span className="flex-1 font-['Inter',sans-serif] text-[13px] leading-[20px]">Ask eva,,</span>
        <AudioControls size="sm" gap="sm" />
        <button type="button" className="flex size-[28px] items-center justify-center rounded-full bg-[var(--ds-bg-tertiary)]" aria-label="Send">
          <Send className="size-[13px]" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
