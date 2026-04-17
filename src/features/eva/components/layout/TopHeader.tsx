import { Bell, ChevronDown, Search } from 'lucide-react';
import type { MomentId } from '@/moments/momentTypes';
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
  figmaTopNav = true,
  momentId,
}: {
  mode: HeaderMode;
  title?: string;
  saveDraftEnabled: boolean;
  reviewEnabled: boolean;
  onFinalize: () => void;
  setupVisible: boolean;
  onSetupResolve: () => void;
  ctaHints: ReadonlySet<CtaHintId>;
  /** `figma-make-moment3` Headerv2: 18px title, bell + profile pill. */
  figmaTopNav?: boolean;
  /** Clinician moment (moment2) uses a distinct header profile name. */
  momentId?: MomentId;
}) {
  const isCascade = title.includes('Cascade Orthopedics');
  const profileName = momentId === 'moment2' ? 'Lena Park' : 'Maya Jones';
  const profileInitials = momentId === 'moment2' ? 'LP' : 'MJ';

  const btnBase =
    "rounded-[var(--ds-radius-button)] px-[12px] py-[8px] font-['Inter',sans-serif] text-[12px] font-medium leading-[18px] transition-opacity disabled:opacity-45";
  const btnGhost = `${btnBase} border border-[var(--ds-border)] text-[var(--ds-text-secondary)]`;
  const btnPrimary = `${btnBase} bg-[var(--ds-primary-action)] font-semibold text-white`;

  /** Headerv2 uses the full workspace line (e.g. clinician / front-desk suffixes). */
  const headerPrimaryTitle = title;

  return (
    <header
      data-name="TopHeader"
      className={`flex shrink-0 items-center justify-between border-b bg-white ${
        figmaTopNav
          ? 'min-h-[64px] border-[rgba(0,9,50,0.12)] px-10 py-1'
          : `min-h-[var(--ds-header-min-height)] bg-[var(--ds-bg-primary)] px-4 ${isCascade ? 'border-[rgba(0,9,50,0.1)]' : 'border-[var(--ds-border)]'}`
      }`}
    >
      <div className={`flex min-w-0 items-center ${figmaTopNav ? 'flex-1' : 'gap-2'}`}>
        {figmaTopNav ? (
          <p className="truncate font-['Inter',sans-serif] text-[18px] font-medium leading-6 tracking-[-0.04px] text-[#020617]">
            {headerPrimaryTitle}
          </p>
        ) : (
          <span className="font-['Inter',sans-serif] text-[14px] font-semibold leading-[20px] text-[var(--ds-text-primary)]">
            {title}
          </span>
        )}
      </div>

      <div className={`flex shrink-0 items-center ${figmaTopNav ? 'gap-6' : 'gap-2'}`}>
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

        {!figmaTopNav && isCascade && mode === 'default' && (
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

        {figmaTopNav && mode === 'default' ? (
          <>
            <button
              type="button"
              className="flex size-5 items-center justify-center rounded-lg text-[#64748b] transition hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell className="size-5" strokeWidth={1.25} aria-hidden />
            </button>
            <button
              type="button"
              className="relative inline-flex items-center gap-2 rounded-xl border border-[rgba(0,0,51,0.06)] bg-[#f7f9ff] py-1 pl-1 pr-2 transition hover:bg-[#eef2ff]"
            >
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#dbe4ff] text-[11px] font-semibold leading-none text-[#1e3a5f]"
                aria-hidden
              >
                {profileInitials}
              </span>
              <span className="hidden font-['Inter',sans-serif] text-[14px] font-medium leading-5 text-[#020617] sm:inline">
                {profileName}
              </span>
              <ChevronDown className="size-4 shrink-0 text-[#64748b]" strokeWidth={1.25} aria-hidden />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="flex size-[32px] items-center justify-center rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] text-[var(--ds-text-secondary)]"
            aria-label="Notifications"
          >
            <Bell className="size-[16px]" strokeWidth={1.5} aria-hidden />
          </button>
        )}
      </div>
    </header>
  );
}
