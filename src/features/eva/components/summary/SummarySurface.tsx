import { MoreVertical, Settings, Stethoscope, User } from 'lucide-react';
import { imgBodyDiagram, imgPatient } from '../../assets';
import type { CtaHintId } from '../../utils/ctaHints';
import { CTA_HINT, ctaHighlightClass } from '../../utils/ctaHints';
import { DetailPill, MapPinMini, PanelCard, Tag, TriangleIcon } from '../shared/primitives';

export function SummarySurface({
  disabledActions,
  topSetupVisible,
  answered,
  onOpenReferral,
  onBeginSession,
  ctaHints,
}: {
  disabledActions: boolean;
  topSetupVisible: boolean;
  answered: boolean;
  onOpenReferral: () => void;
  onBeginSession: () => void;
  ctaHints: ReadonlySet<CtaHintId>;
}) {
  return (
    <div data-name="SummarySurface" className="space-y-[20px]">
      <div className="rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-[20px] shadow-[var(--ds-shadow-card)]">
        <div className="mb-[20px] flex items-start justify-between gap-[16px]">
          <div>
            <h2 className="font-['Inter',sans-serif] text-[28px] font-semibold leading-[36px] tracking-tight text-[var(--ds-text-primary)]">
              Pre-Visit Patient Summary
            </h2>
            <div className="mt-[16px] flex items-center gap-[16px]">
              <img src={imgPatient} alt="Diane M" className="size-[56px] rounded-[var(--ds-radius-card)] object-cover" />
              <div>
                <p className="font-['Inter',sans-serif] text-[28px] font-semibold leading-[36px] text-[var(--ds-text-primary)]">Diane M</p>
                <p className="font-['Inter',sans-serif] text-[14px] font-normal leading-[20px] text-[var(--ds-text-secondary)]">
                  ID: #1123-K · Age: 58y
                </p>
                <div className="mt-[8px] flex gap-[8px]">
                  <Tag tone="amber">New patient</Tag>
                  <Tag tone="purple">Intake evaluation</Tag>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              disabled={disabledActions}
              className="rounded-[var(--ds-radius-card)] border border-[var(--ds-border-accent)] px-[16px] py-[8px] font-['Inter',sans-serif] text-[13px] font-semibold leading-[20px] text-[var(--ds-primary-action)] disabled:opacity-40"
            >
              <span className="inline-flex items-center gap-[4px]">
                <User className="size-[14px]" strokeWidth={1.5} aria-hidden />
                Patient profile
              </span>
            </button>
            <button
              type="button"
              disabled={disabledActions}
              onClick={() => onBeginSession()}
              {...(!disabledActions && ctaHints.has(CTA_HINT.BEGIN_SESSION) ? { 'data-cta-hint': CTA_HINT.BEGIN_SESSION } : {})}
              className={`rounded-[var(--ds-radius-card)] bg-[var(--ds-primary-action)] px-[16px] py-[8px] font-['Inter',sans-serif] text-[13px] font-semibold leading-[20px] text-white disabled:opacity-40 ${ctaHighlightClass(!disabledActions && ctaHints.has(CTA_HINT.BEGIN_SESSION), 'card')}`}
            >
              Begin session
            </button>
            <button
              type="button"
              disabled={disabledActions}
              className="flex size-[40px] items-center justify-center rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] text-[var(--ds-text-secondary)] disabled:opacity-40"
              aria-label="Settings"
            >
              <Settings className="size-[15px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_160px] gap-[16px]">
          <PanelCard
            title="Chief complaint"
            titleIcon={<Stethoscope className="size-[14px] text-[var(--ds-primary-accent)]" strokeWidth={1.5} />}
            rightSlot={topSetupVisible ? <MoreVertical className="size-[14px] text-[var(--ds-text-secondary)]" strokeWidth={1.5} /> : undefined}
          >
            Severe right shoulder pain and limited range of motion following a fall 3 days ago. Patient reports sharp pain (8/10)
            with overhead movements and difficulty sleeping on right side.
          </PanelCard>

          <PanelCard title="First visit" compact rightSlot={<Tag tone="amber">Today</Tag>}>
            <div className="pt-[8px]">
              <p className="font-['Inter',sans-serif] text-[34px] font-semibold leading-none text-[var(--ds-text-primary)]">
                Apr 14 <span className="text-[18px] text-[var(--ds-text-secondary)]">2026</span>
              </p>
              <p className="mt-[8px] font-['Inter',sans-serif] text-[12px] leading-[18px] text-[var(--ds-text-secondary)]">Intake evaluation</p>
            </div>
          </PanelCard>
        </div>

        <div className="mt-[16px] rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] p-[16px]">
          <div className="mb-[12px] flex items-center justify-between">
            <p className="font-['Inter',sans-serif] text-[18px] font-semibold leading-[28px] text-[var(--ds-text-primary)]">Referred by</p>
            <div className="flex items-center gap-[8px]">
              <button
                type="button"
                onClick={onOpenReferral}
                {...(ctaHints.has(CTA_HINT.VIEW_REFERRAL) ? { 'data-cta-hint': CTA_HINT.VIEW_REFERRAL } : {})}
                className={`rounded-[var(--ds-radius-button)] bg-[var(--ds-bg-accent-purple)] px-[16px] py-[8px] font-['Inter',sans-serif] text-[13px] font-semibold leading-[20px] text-[var(--ds-primary-action)] ${ctaHighlightClass(ctaHints.has(CTA_HINT.VIEW_REFERRAL), 'button')}`}
              >
                View Referral Document
              </button>
              {topSetupVisible && <MoreVertical className="size-[14px] text-[var(--ds-text-secondary)]" strokeWidth={1.5} />}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[24px] font-['Inter',sans-serif] text-[13px] leading-[20px]">
            <div>
              <p className="text-[var(--ds-text-secondary)]">Provider</p>
              <p className="font-medium text-[var(--ds-text-primary)]">Dr. Samantha Wickram, MD</p>
            </div>
            <div>
              <p className="text-[var(--ds-text-secondary)]">Specialty</p>
              <p className="font-medium text-[var(--ds-text-primary)]">Orthopedic Surgery</p>
            </div>
            <div>
              <p className="text-[var(--ds-text-secondary)]">Date referred</p>
              <p className="font-medium text-[var(--ds-text-primary)]">Mar 12, 2026</p>
            </div>
          </div>
          <div className="mt-[16px] rounded-[var(--ds-radius-card)] border border-[var(--ds-success)] bg-[var(--ds-success-bg)] p-[12px] font-['Inter',sans-serif] text-[13px] font-medium leading-[20px] text-[var(--ds-text-primary)]">
            Arthroscopic rotator cuff repair performed. Recommend conservative PT approach with reassessment in 6 weeks.
          </div>
        </div>

        <div className="mt-[16px]">
          <p className="mb-[12px] font-['Inter',sans-serif] text-[18px] font-semibold leading-[28px] text-[var(--ds-text-secondary)]">
            Pain assessment
          </p>
          <div className={`grid grid-cols-2 gap-[16px] ${topSetupVisible ? 'items-start' : ''}`}>
            <PanelCard
              title="Current pain level"
              titleIcon={<TriangleIcon />}
              rightSlot={topSetupVisible ? <MoreVertical className="size-[14px] text-[var(--ds-text-secondary)]" strokeWidth={1.5} /> : undefined}
            >
              <div className="flex items-end justify-between">
                <span className="font-['Inter',sans-serif] text-[58px] font-semibold leading-none text-[var(--ds-danger)]">8</span>
                <span className="pb-[8px] font-['Inter',sans-serif] text-[14px] text-[var(--ds-text-secondary)]">out of 10</span>
              </div>
              <div className="mt-[16px] h-[12px] rounded-[var(--ds-radius-pill)] bg-gradient-to-r from-[var(--ds-success)] via-[var(--ds-warning-surface)] to-[var(--ds-danger)]" />
              <div className="mt-[8px] flex justify-between font-['Inter',sans-serif] text-[11px] leading-[16px] text-[var(--ds-text-secondary)]">
                <span>No pain</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
              <div className="mt-[16px] grid grid-cols-2 gap-[12px]">
                <DetailPill label="Pain type" value="Sharp, stabbing" />
                <DetailPill label="Frequency" value="Constant" />
                <DetailPill label="Aggravating factors" value="Overhead reach" />
                <DetailPill label="Relieving factors" value="Rest, ice" />
              </div>
            </PanelCard>

            <div className={topSetupVisible ? 'relative z-10 translate-x-[-44px] translate-y-[-28px]' : ''}>
              <PanelCard
                title="Pain location"
                titleIcon={<MapPinMini />}
                rightSlot={topSetupVisible ? <MoreVertical className="size-[14px] text-[var(--ds-text-secondary)]" strokeWidth={1.5} /> : undefined}
              >
                <div
                  className={`rounded-[var(--ds-radius-card)] p-[16px] ${
                    topSetupVisible
                      ? 'border border-[var(--ds-border-accent)] bg-[var(--ds-bg-primary)] shadow-[var(--ds-shadow-card)]'
                      : 'bg-[var(--ds-bg-secondary)]'
                  }`}
                >
                  <div className="flex justify-center">
                    <img src={imgBodyDiagram} alt="Body diagram" className="h-[220px] object-contain" />
                  </div>
                  <div className="mt-[16px] rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-[16px] py-[12px] font-['Inter',sans-serif] text-[13px] leading-[20px] text-[var(--ds-text-primary)]">
                    <span className="mr-[8px] inline-block size-[8px] rounded-full bg-[var(--ds-danger)]" aria-hidden />
                    Right shoulder (anterior)
                  </div>
                </div>
              </PanelCard>
            </div>
          </div>
        </div>

        {answered && (
          <div className="mt-[16px] rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-secondary)] p-[16px] font-['Inter',sans-serif] text-[13px] leading-[20px] text-[var(--ds-text-primary)]">
            No significant past medical history.
          </div>
        )}
      </div>
    </div>
  );
}
