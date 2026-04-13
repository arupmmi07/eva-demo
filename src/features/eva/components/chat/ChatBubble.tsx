import type { ChatItem } from '../../types';
import { imgPatient } from '../../assets';
import { CTA_HINT, ctaHighlightClass } from '../../utils/ctaHints';
import { formatSessionClock } from '../../utils/format';
import { Tag } from '../shared/primitives';

export function ChatBubble({
  item,
  sessionSeconds,
  onOpenSummary,
  highlightPatientSummary = false,
}: {
  item: ChatItem;
  sessionSeconds: number;
  onOpenSummary: () => void;
  highlightPatientSummary?: boolean;
}) {
  if (item.kind === 'patient-card') {
    return (
      <div
        data-name="ChatPatientCard"
        className="w-full max-w-[390px] rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-[16px] shadow-[var(--ds-shadow-card)]"
      >
        <div className="flex items-start gap-[12px]">
          <img src={imgPatient} alt="Diane M" className="size-[40px] rounded-[var(--ds-radius-card)] object-cover" />
          <div className="min-w-0 flex-1">
            <div className="mb-[4px] flex items-center justify-between gap-[12px]">
              <div>
                <p className="font-['Inter',sans-serif] text-[14px] font-semibold leading-[20px] text-[var(--ds-text-primary)]">
                  Diane M
                </p>
                <p className="font-['Inter',sans-serif] text-[12px] font-normal leading-[18px] text-[var(--ds-text-secondary)]">
                  (Brachial Plexus Injury) is ready for evaluation.
                </p>
              </div>
              <span className="rounded-[var(--ds-radius-xs)] bg-[var(--ds-bg-accent-purple)] px-[8px] py-[4px] font-['Inter',sans-serif] text-[10px] font-semibold leading-none text-[var(--ds-primary-brand)]">
                Checked in
              </span>
            </div>
            <div className="mt-[12px] font-['Inter',sans-serif] text-[12px] leading-[18px] text-[var(--ds-text-primary)]">
              <p className="mb-[4px] font-semibold">Intake flags:</p>
              <ul className="list-disc space-y-[4px] pl-[16px]">
                <li>Pain level reported: 7/10</li>
                <li>Tingling in fingers</li>
                <li>Post-surgical case (6 weeks)</li>
              </ul>
            </div>
            <div className="mt-[12px] flex flex-wrap gap-[8px]">
              <Tag tone="amber">New patient</Tag>
              <Tag tone="purple">Intake evaluation</Tag>
              <Tag tone="rose">Latex Allergy</Tag>
            </div>
            <button
              type="button"
              {...(highlightPatientSummary ? { 'data-cta-hint': CTA_HINT.OPEN_PREVISIT_SUMMARY } : {})}
              className={`mt-[12px] rounded-[var(--ds-radius-button)] bg-[var(--ds-primary-action)] px-[12px] py-[8px] font-['Inter',sans-serif] text-[12px] font-semibold leading-[18px] text-white ${ctaHighlightClass(highlightPatientSummary, 'button')}`}
              onClick={onOpenSummary}
            >
              Open pre visit summary
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (item.kind === 'insight') {
    return (
      <div
        data-name="ChatInsight"
        className="w-full max-w-[390px] whitespace-pre-line rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-[16px] font-['Inter',sans-serif] text-[13px] font-normal leading-[24px] text-[var(--ds-text-primary)] shadow-[var(--ds-shadow-card)]"
      >
        {item.content}
        <div className="mt-[8px] text-[11px] leading-[16px] text-[var(--ds-text-muted)]">{item.timestamp}</div>
      </div>
    );
  }

  if (item.kind === 'session-widget') {
    return (
      <div
        data-name="ChatSessionWidget"
        className="w-full max-w-[390px] rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-[16px] shadow-[var(--ds-shadow-card)]"
      >
        <p className="font-['Inter',sans-serif] text-[14px] font-semibold leading-[20px] text-[var(--ds-text-primary)]">
          Session Started
        </p>
        <div className="mt-[12px] flex items-center justify-between gap-[16px]">
          <div className="min-w-0 flex-1">
            <p className="font-['Inter',sans-serif] text-[20px] font-medium tracking-[0.1em] text-[var(--ds-text-primary)]">
              {formatSessionClock(sessionSeconds)}
            </p>
            <div className="mt-[8px] flex items-center gap-[6px]">
              {[8, 13, 10, 18, 7, 16, 9, 12, 5, 14, 8, 15, 11].map((height, index) => (
                <span
                  key={`bar-${index}`}
                  className="block rounded-full bg-[var(--ds-primary-action)]"
                  style={{ height: `${height}px`, width: '2px', opacity: index > 6 ? 0.2 : 1 }}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] px-[12px] py-[8px] font-['Inter',sans-serif] text-[12px] font-semibold leading-[18px] text-[var(--ds-text-secondary)]"
          >
            View Transcript
          </button>
        </div>
        <div className="mt-[8px] text-[11px] text-[var(--ds-text-muted)]">{item.timestamp}</div>
      </div>
    );
  }

  if (item.kind === 'prompt') {
    return (
      <div
        data-name="ChatPrompt"
        className="w-fit max-w-[390px] rounded-[var(--ds-radius-pill)] border border-[var(--ds-border-accent)] bg-[var(--ds-warning-surface)] px-[16px] py-[8px] font-['Inter',sans-serif] text-[12px] font-medium leading-[18px] text-[var(--ds-warning-text)]"
      >
        {item.content}
      </div>
    );
  }

  const isUser = item.kind === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`} data-name={isUser ? 'ChatUser' : 'ChatEva'}>
      <div className={isUser ? 'max-w-[260px]' : 'w-full max-w-[390px]'}>
        {!isUser && (
          <div className="mb-[8px] flex items-center gap-[8px] font-['Inter',sans-serif] text-[11px] font-semibold uppercase leading-none tracking-[0.08em] text-[var(--ds-primary-accent)]">
            <span className="flex size-[16px] items-center justify-center rounded-full bg-[var(--ds-bg-accent-purple)] text-[10px] text-[var(--ds-primary-action)]">
              ✦
            </span>
            EVA
          </div>
        )}
        <div
          className={`rounded-[var(--ds-radius-card)] px-[16px] py-[12px] font-['Inter',sans-serif] text-[14px] font-normal leading-[24px] shadow-[var(--ds-shadow-card)] ${
            isUser
              ? 'bg-[var(--ds-primary-action)] text-white'
              : 'border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] text-[var(--ds-text-primary)]'
          }`}
        >
          {item.content}
        </div>
        <div className={`mt-[4px] text-[11px] text-[var(--ds-text-muted)] ${isUser ? 'text-right' : ''}`}>{item.timestamp}</div>
      </div>
    </div>
  );
}
