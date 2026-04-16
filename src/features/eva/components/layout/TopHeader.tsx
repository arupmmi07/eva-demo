import { Bell, ChevronDown, Search } from 'lucide-react';
import type { HeaderMode } from '../../types';
import type { CtaHintId } from '../../utils/ctaHints';
import { CTA_HINT, ctaHighlightClass } from '../../utils/ctaHints';

export function TopHeader({
  mode,
  title = 'My Dashboard',
  saveDraftEnabled,
  reviewEnabled,
  onFinalize,
  setupVisible,
  onSetupResolve,
  ctaHints,
}: {
  mode: HeaderMode;
  title?: string;
  saveDraftEnabled: boolean;
  reviewEnabled: boolean;
  onFinalize: () => void;
  setupVisible: boolean;
  onSetupResolve: () => void;
  ctaHints: ReadonlySet<CtaHintId>;
}) {
  const isCascade = title === 'Cascade Orthopedics';

  const btnBase =
    "rounded-[var(--ds-radius-button)] px-[12px] py-[8px] font-['Inter',sans-serif] text-[12px] font-medium leading-[18px] transition-opacity disabled:opacity-45";
  const btnGhost = `${btnBase} border border-[var(--ds-border)] text-[var(--ds-text-secondary)]`;
  const btnPrimary = `${btnBase} bg-[var(--ds-primary-action)] font-semibold text-white`;

  return (
    <header
      data-name="TopHeader"
      className={`flex min-h-[var(--ds-header-min-height)] shrink-0 items-center justify-between border-b bg-[var(--ds-bg-primary)] px-4 ${
        isCascade ? 'border-[rgba(0,9,50,0.1)]' : 'border-[var(--ds-border)]'
      }`}
    >
      <div className="flex items-center gap-[8px]">
        <div
          className={`flex size-8 items-center justify-center rounded-lg text-white ${
            isCascade ? 'bg-slate-900' : 'rounded-[var(--ds-radius-card)] bg-[var(--ds-primary-action)]'
          }`}
        >
          <span className="font-['Inter',sans-serif] text-[11px] font-semibold leading-none">//</span>
        </div>
        <span className="font-['Inter',sans-serif] text-[14px] font-semibold leading-[20px] text-[var(--ds-text-primary)]">
          {title}
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

        {isCascade && mode === 'default' && (
          <>
            <button
              type="button"
              className="hidden size-8 items-center justify-center rounded-lg border border-[rgba(0,9,50,0.1)] text-slate-500 hover:bg-slate-50 sm:flex"
              aria-label="Search"
            >
              <Search className="size-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className="hidden items-center gap-2 rounded-lg border border-[rgba(0,9,50,0.12)] bg-white px-3 py-2 text-left shadow-sm hover:bg-slate-50 md:inline-flex"
            >
              <span className="text-[11px] font-medium text-slate-500">View As</span>
              <span className="text-[12px] font-semibold text-slate-900">Front Office</span>
              <ChevronDown className="size-4 text-slate-400" strokeWidth={2} aria-hidden />
            </button>
          </>
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
