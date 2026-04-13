import { Bell } from 'lucide-react';
import type { HeaderMode } from '../../types';
import type { CtaHintId } from '../../utils/ctaHints';
import { CTA_HINT, ctaHighlightClass } from '../../utils/ctaHints';

export function TopHeader({
  mode,
  saveDraftEnabled,
  reviewEnabled,
  onFinalize,
  setupVisible,
  onSetupResolve,
  ctaHints,
}: {
  mode: HeaderMode;
  saveDraftEnabled: boolean;
  reviewEnabled: boolean;
  onFinalize: () => void;
  setupVisible: boolean;
  onSetupResolve: () => void;
  ctaHints: ReadonlySet<CtaHintId>;
}) {
  const btnBase =
    "rounded-[var(--ds-radius-button)] px-[12px] py-[8px] font-['Inter',sans-serif] text-[12px] font-medium leading-[18px] transition-opacity disabled:opacity-45";
  const btnGhost = `${btnBase} border border-[var(--ds-border)] text-[var(--ds-text-secondary)]`;
  const btnPrimary = `${btnBase} bg-[var(--ds-primary-action)] font-semibold text-white`;

  return (
    <header
      data-name="TopHeader"
      className="flex min-h-[var(--ds-header-min-height)] shrink-0 items-center justify-between border-b border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-[16px]"
    >
      <div className="flex items-center gap-[8px]">
        <div className="flex size-[32px] items-center justify-center rounded-[var(--ds-radius-card)] bg-[var(--ds-primary-action)] text-white">
          <span className="font-['Inter',sans-serif] text-[11px] font-semibold leading-none">//</span>
        </div>
        <span className="font-['Inter',sans-serif] text-[14px] font-semibold leading-[20px] text-[var(--ds-text-primary)]">
          My Dashboard
        </span>
      </div>

      <div className="flex items-center gap-[8px]">
        {setupVisible && mode === 'setup' && (
          <>
            <button type="button" className={btnGhost} onClick={onSetupResolve}>
              Cancel
            </button>
            <button
              type="button"
              className={`${btnBase} border border-[var(--ds-border-accent)] bg-[var(--ds-bg-accent-purple)] font-semibold text-[var(--ds-primary-action)]`}
              onClick={onSetupResolve}
            >
              Save for similar profile
            </button>
            <button
              type="button"
              {...(ctaHints.has(CTA_HINT.SAVE_SETUP_DEFAULT) ? { 'data-cta-hint': CTA_HINT.SAVE_SETUP_DEFAULT } : {})}
              className={`${btnPrimary} ${ctaHighlightClass(ctaHints.has(CTA_HINT.SAVE_SETUP_DEFAULT), 'button')}`}
              onClick={onSetupResolve}
            >
              Save as Default
            </button>
          </>
        )}

        {(mode === 'session-disabled' || mode === 'session-active') && (
          <>
            <button type="button" disabled={!saveDraftEnabled} className={btnGhost}>
              Save Draft
            </button>
            <button
              type="button"
              disabled={!reviewEnabled}
              {...(ctaHints.has(CTA_HINT.REVIEW_FINALIZE) ? { 'data-cta-hint': CTA_HINT.REVIEW_FINALIZE } : {})}
              className={`${btnPrimary} ${ctaHighlightClass(ctaHints.has(CTA_HINT.REVIEW_FINALIZE) && reviewEnabled, 'button')}`}
              onClick={onFinalize}
            >
              Review &amp; Finalise →
            </button>
          </>
        )}

        {mode === 'share' && (
          <button
            type="button"
            {...(ctaHints.has(CTA_HINT.SHARE_PATIENT) ? { 'data-cta-hint': CTA_HINT.SHARE_PATIENT } : {})}
            className={`${btnPrimary} px-[16px] py-[8px] ${ctaHighlightClass(ctaHints.has(CTA_HINT.SHARE_PATIENT), 'button')}`}
          >
            Share with Patient
          </button>
        )}

        <button
          type="button"
          className="flex size-[32px] items-center justify-center rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] text-[var(--ds-text-secondary)]"
          aria-label="Notifications"
        >
          <Bell className="size-[16px]" strokeWidth={1.5} aria-hidden />
        </button>
      </div>
    </header>
  );
}
