import type { ReactNode } from 'react';
import {
  Briefcase,
  ChevronDown,
  Columns2,
  FileText,
  LayoutGrid,
  Search,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { cn } from '@/app/components/ui/utils';
import soapPatientAvatar from '@/assets/454e804c0c0a65927356b922ba37d88ac95d6327.jpg';

const AI_CHIPS = ['Grip Strength', 'Sleep Position', 'Pain Medication Use', 'Radiation Pattern'] as const;

/** Far-right rail order per `public/moment8/Spatial.png` (not alphabetical I/H swap). */
const SOAP_RAIL_LETTERS = ['S', 'O', 'A', 'P', 'I', 'H', 'C'] as const;

function StartScribeIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M6.99999 1.1665C5.84627 1.1665 4.71845 1.50862 3.75917 2.1496C2.79988 2.79057 2.05221 3.70161 1.6107 4.76752C1.16918 5.83342 1.05366 7.00631 1.27874 8.13786C1.50383 9.26942 2.0594 10.3088 2.8752 11.1246C3.69101 11.9404 4.73041 12.496 5.86197 12.7211C6.99352 12.9462 8.16641 12.8306 9.23231 12.3891C10.2982 11.9476 11.2093 11.2 11.8502 10.2407C12.4912 9.28138 12.8333 8.15356 12.8333 6.99984C12.8333 6.23379 12.6824 5.47525 12.3893 4.76752C12.0961 4.05978 11.6665 3.41672 11.1248 2.87505C10.5831 2.33337 9.94005 1.90369 9.23231 1.61054C8.52458 1.31739 7.76604 1.1665 6.99999 1.1665ZM6.99999 11.6665C6.07701 11.6665 5.17476 11.3928 4.40733 10.88C3.6399 10.3672 3.04176 9.63841 2.68855 8.78569C2.33535 7.93297 2.24293 6.99466 2.42299 6.08942C2.60306 5.18417 3.04752 4.35265 3.70016 3.70001C4.35281 3.04736 5.18433 2.6029 6.08957 2.42284C6.99482 2.24277 7.93313 2.33519 8.78585 2.6884C9.63857 3.04161 10.3674 3.63975 10.8802 4.40718C11.393 5.17461 11.6667 6.07686 11.6667 6.99984C11.6667 8.23751 11.175 9.4245 10.2998 10.2997C9.42465 11.1748 8.23767 11.6665 6.99999 11.6665ZM6.99999 3.49984C6.30776 3.49984 5.63107 3.70511 5.0555 4.08969C4.47992 4.47428 4.03132 5.0209 3.76641 5.66045C3.50151 6.29999 3.4322 7.00372 3.56724 7.68265C3.70229 8.36159 4.03563 8.98523 4.52512 9.47471C5.0146 9.9642 5.63824 10.2975 6.31718 10.4326C6.99611 10.5676 7.69984 10.4983 8.33938 10.2334C8.97893 9.96851 9.52555 9.51991 9.91014 8.94433C10.2947 8.36876 10.5 7.69207 10.5 6.99984C10.5 6.07158 10.1312 5.18134 9.47487 4.52496C8.81849 3.86859 7.92825 3.49984 6.99999 3.49984ZM6.99999 9.33317C6.5385 9.33317 6.08738 9.19632 5.70366 8.93993C5.31995 8.68354 5.02088 8.31913 4.84427 7.89277C4.66767 7.4664 4.62146 6.99725 4.71149 6.54463C4.80153 6.092 5.02375 5.67624 5.35008 5.34992C5.6764 5.0236 6.09216 4.80137 6.54478 4.71134C6.9974 4.62131 7.46656 4.66751 7.89292 4.84412C8.31928 5.02072 8.6837 5.31979 8.94009 5.70351C9.19648 6.08722 9.33333 6.53835 9.33333 6.99984C9.33333 7.61868 9.08749 8.21217 8.64991 8.64975C8.21232 9.08734 7.61883 9.33317 6.99999 9.33317Z"
        fill="white"
      />
    </svg>
  );
}

function IntakeBadge() {
  return (
    <Badge className="ml-2 shrink-0 border-0 bg-[var(--ds-warning-surface)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--ds-warning-text)]">
      INTAKE
    </Badge>
  );
}

function SoapField({
  label,
  children,
  badge,
}: {
  label: string;
  children: ReactNode;
  badge?: boolean;
}) {
  return (
    <div className="min-w-0 border-t border-[var(--ds-border)] pt-4 first:border-t-0 first:pt-0">
      <p className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-wide text-[var(--ds-text-secondary)]">
        {label}
      </p>
      <div className="mt-1 flex flex-wrap items-start gap-x-1 font-[Inter,sans-serif] text-[13px] font-normal leading-relaxed text-[var(--ds-text-primary)]">
        <span className="min-w-0">{children}</span>
        {badge ? <IntakeBadge /> : null}
      </div>
    </div>
  );
}

type Moment8SpatialRightPaneProps = {
  dataName?: string;
  /** Moment9 / moment10: Save Draft + Review & Finalise header, Accept Note on Subjective, rail active `#4F46E5` / `#FFFFFF`. */
  variant?: 'moment8' | 'moment9' | 'moment10';
};

/**
 * Moment8 right pane — `public/moment8/Spatial.png` (SOAP Notes + Subjective + rail).
 * Built with Radix primitives + `--ds-*` tokens; fluid width for the scheduler right column.
 * `dataName` / `variant` let moment9+ reuse this surface with distinct chrome.
 */
export function Moment8SpatialRightPane({
  dataName = 'Moment8SpatialRightPane',
  variant = 'moment8',
}: Moment8SpatialRightPaneProps = {}) {
  const isReviewFlow = variant === 'moment9' || variant === 'moment10';
  return (
    <div
      className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-y-auto px-2 pb-6 pt-2 font-[Inter,sans-serif] text-[14px] font-normal leading-5 text-[var(--ds-text-primary)] antialiased sm:px-3 sm:pt-3"
      data-name={dataName}
    >
      {/*
        Matches `moment8.html`: topbar full width of content area; `.rail` is a sibling of patient + soap
        stack so the SOAP strip runs along the right of both cards (see `moment8.css` `.rail`).
      */}
      <div className="mx-auto flex w-full min-w-0 max-w-[940px] flex-1 flex-col gap-3">
        <header className="flex w-full min-w-0 flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <h2 className="font-[Inter,sans-serif] text-[18px] font-semibold leading-7 tracking-tight text-[var(--ds-text-primary)] sm:text-[20px]">
              SOAP Notes
            </h2>
            {!isReviewFlow ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 shrink-0 gap-1 rounded-[var(--ds-radius-button)] border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-3 font-[Inter,sans-serif] text-[12px] font-semibold text-[var(--ds-text-primary)]"
              >
                Initial Evaluation
                <ChevronDown className="size-4 opacity-70" strokeWidth={2} />
              </Button>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            {isReviewFlow ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 shrink-0 rounded-[var(--ds-radius-button)] border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-3 font-[Inter,sans-serif] text-[12px] font-semibold text-[var(--ds-text-primary)]"
              >
                Save Draft
              </Button>
            ) : null}
            <Button
              type="button"
              size="sm"
              className="h-9 shrink-0 gap-2 rounded-[var(--ds-radius-button)] bg-[#2E04E8] px-4 font-[Inter,sans-serif] text-[12px] font-semibold text-white hover:brightness-[0.97]"
            >
              {isReviewFlow ? null : <StartScribeIcon />}
              {isReviewFlow ? 'Review & Finalise →' : 'Start Scribe'}
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 lg:min-w-0">
            <Card className="overflow-hidden rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] shadow-sm">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-wrap gap-4">
                  <div
                    className="size-14 shrink-0 overflow-hidden rounded-full bg-[var(--ds-bg-tertiary)] bg-cover bg-center bg-no-repeat ring-1 ring-[var(--ds-border)]"
                    style={{ backgroundImage: `url(${soapPatientAvatar})` }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <div className="min-w-0">
                        <p className="font-[Inter,sans-serif] text-[16px] font-semibold leading-6 text-[var(--ds-text-primary)]">
                          Diane M
                        </p>
                        <p className="mt-0.5 font-[Inter,sans-serif] text-[13px] font-normal leading-5 text-[var(--ds-text-secondary)]">
                          58 y | Female | DOB April 21, 1968
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="link"
                        className="ml-auto h-auto shrink-0 self-start p-0 text-right font-[Inter,sans-serif] text-[12px] font-semibold text-[var(--ds-primary-action)]"
                      >
                        View Referral Document →
                      </Button>
                    </div>

                    <div className="mt-4 space-y-2 font-[Inter,sans-serif] text-[12px] leading-snug text-[var(--ds-text-secondary)]">
                      <p className="flex flex-wrap items-start gap-2">
                        <Briefcase className="mt-0.5 size-4 shrink-0 text-[var(--ds-text-secondary)]" strokeWidth={1.75} />
                        <span>
                          <span className="font-semibold text-[var(--ds-text-primary)]">Visit</span> : 1 of 12 · Initial
                          Evaluation · Week 0
                        </span>
                      </p>
                      <p className="flex flex-wrap items-start gap-2">
                        <FileText className="mt-0.5 size-4 shrink-0 text-[var(--ds-text-secondary)]" strokeWidth={1.75} />
                        <span>
                          <span className="font-semibold text-[var(--ds-text-primary)]">Payer</span> : Medicare Part B
                        </span>
                      </p>
                      <p className="flex flex-wrap items-start gap-2">
                        <FileText className="mt-0.5 size-4 shrink-0 text-[var(--ds-text-secondary)]" strokeWidth={1.75} />
                        <span>
                          <span className="font-semibold text-[var(--ds-text-primary)]">Primary Diagnosis</span> : M75.11,
                          Complete rotator cuff tear, right shoulder, not specified as traumatic
                        </span>
                      </p>
                      <p className="flex flex-wrap items-start gap-2">
                        <FileText className="mt-0.5 size-4 shrink-0 text-[var(--ds-text-secondary)]" strokeWidth={1.75} />
                        <span>
                          <span className="font-semibold text-[var(--ds-text-primary)]">Secondary Diagnosis</span> :
                          M79.621, Pain in right upper arm, post-surgical
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="min-h-[min(360px,50vh)] min-w-0 flex-1 overflow-hidden rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] shadow-sm lg:min-h-[420px] lg:rounded-r-none lg:border-r-0">
              <CardContent className="flex h-full flex-col p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2 border-b border-[var(--ds-border)] pb-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--ds-primary-action)] font-[Inter,sans-serif] text-[12px] font-bold text-white">
                    S
                  </span>
                  <h3 className="min-w-0 font-[Inter,sans-serif] text-[15px] font-semibold leading-5 text-[var(--ds-text-primary)]">
                    Subjective
                  </h3>
                  <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
                    {isReviewFlow ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 shrink-0 rounded-[var(--ds-radius-button)] border-[var(--ds-primary-action)] bg-[var(--ds-bg-primary)] px-3 font-[Inter,sans-serif] text-[12px] font-semibold text-[var(--ds-primary-action)] hover:bg-[var(--ds-bg-accent-purple)]"
                      >
                        Accept Note
                      </Button>
                    ) : null}
                    <span className="flex items-center gap-1 rounded-[var(--ds-radius-button)] border border-[var(--ds-border)] bg-[var(--ds-bg-tertiary)] px-2 py-1 font-[Inter,sans-serif] text-[11px] font-semibold text-[var(--ds-text-secondary)]">
                      3 items
                      <ChevronDown className="size-3.5 opacity-70" strokeWidth={2} />
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-[Inter,sans-serif] text-[12px] font-semibold text-[var(--ds-primary-action)]">
                    <Sparkles className="size-4 shrink-0" strokeWidth={1.75} />
                    AI Suggestions
                  </div>
                  <Button type="button" variant="ghost" size="icon" className="size-8 shrink-0 text-muted-foreground" aria-label="Search">
                    <Search className="size-4" strokeWidth={1.75} />
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {AI_CHIPS.map((t) => (
                    <Button
                      key={t}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-auto rounded-full border-[var(--ds-border)] bg-[var(--ds-bg-tertiary)] px-3 py-1.5 font-[Inter,sans-serif] text-[12px] font-medium text-[var(--ds-text-primary)]"
                    >
                      + {t}
                    </Button>
                  ))}
                </div>

                <div className="mt-6 min-h-0 flex-1 space-y-0 overflow-y-auto">
                  <SoapField label="Chief complaint" badge>
                    Pain in the right shoulder and inability to move hand for overhead activities.
                  </SoapField>
                  <SoapField label="History of present condition" badge>
                    The patient reports a gradual onset of right shoulder pain over the past 3–4 months. She was diagnosed
                    with a rotator cuff complete tear for which she got operated 10 weeks prior to evaluation.
                  </SoapField>
                  <SoapField label="Pain presentation" badge>
                    On the Numeric Pain Rating Scale (NPRS), the patient reports 8/10 pain with movement and 6/10 at rest.
                  </SoapField>
                  <SoapField label="Patient goals" badge>
                    Patient desires to return to a prior level of function like gardening, cooking.
                  </SoapField>
                  <SoapField label="Past medical history">Hypertension, currently managed.</SoapField>
                </div>
              </CardContent>
            </Card>
          </div>

          <nav
            className={cn(
              'flex shrink-0 flex-row flex-wrap items-start justify-start gap-2 rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-transparent px-2 py-2 shadow-none',
              'lg:w-8 lg:min-w-[32px] lg:max-w-[32px] lg:flex-col lg:flex-nowrap lg:items-start lg:justify-start lg:gap-3 lg:self-stretch lg:rounded-none lg:border-0 lg:px-1 lg:py-3',
            )}
            aria-label="SOAP sections"
          >
            <span className="font-[Inter,sans-serif] text-[9px] font-semibold uppercase tracking-wide text-[var(--ds-text-secondary)] lg:hidden">
              SOAP
            </span>
            <span className="hidden font-[Inter,sans-serif] text-[9px] font-semibold uppercase tracking-wide text-[var(--ds-text-secondary)] [writing-mode:vertical-rl] lg:block">
              SOAP
            </span>

            <div className="flex flex-row flex-wrap items-start justify-start gap-2 lg:flex-col lg:gap-2">
              {SOAP_RAIL_LETTERS.map((l, i) => (
                <span
                  key={l}
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-[var(--ds-radius-button)] font-[Inter,sans-serif] text-[11px] font-semibold leading-none',
                    i === 0
                      ? isReviewFlow
                        ? 'bg-[#4F46E5] text-[#FFFFFF] shadow-sm'
                        : 'bg-[#475569] text-white shadow-sm'
                      : 'bg-transparent text-[var(--ds-text-secondary)]',
                  )}
                >
                  {l}
                </span>
              ))}
            </div>

            <div className="flex flex-row items-start gap-1.5 lg:flex-col lg:gap-2">
              <button
                type="button"
                className="flex size-6 shrink-0 items-center justify-center rounded border border-transparent bg-transparent text-[var(--ds-text-secondary)] transition-colors hover:border-[var(--ds-border)] hover:bg-transparent hover:text-[var(--ds-primary-action)]"
                aria-label="Grid layout"
              >
                <LayoutGrid className="size-3.5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                className="flex size-6 shrink-0 items-center justify-center rounded border border-transparent bg-transparent text-[var(--ds-text-secondary)] transition-colors hover:border-[var(--ds-border)] hover:bg-transparent hover:text-[var(--ds-primary-action)]"
                aria-label="Column layout"
              >
                <Columns2 className="size-3.5" strokeWidth={1.75} />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
