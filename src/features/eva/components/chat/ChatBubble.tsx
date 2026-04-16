import { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { ChatItem } from '../../types';
import { imgPatient } from '../../assets';
import {
  CHAT_POTENTIAL_NOSHOW_SC1,
  UNCONFIRMED_PATIENTS,
  chatVisitTypeLabel,
} from '../../scheduler/schedulerData';
import type { CtaHintId } from '../../utils/ctaHints';
import { CTA_HINT, chatChipLabelToCtaHint, ctaHighlightClass } from '../../utils/ctaHints';
import { formatSessionClock } from '../../utils/format';
import { Tag } from '../shared/primitives';

/** Scheduler left-chat KPI cards — match `card` in SchedulerRightPane (sc1 / sc2 tiles). */
const SCHEDULER_CASCADE_SHELL =
  'box-border w-full min-w-0 overflow-hidden rounded-xl border border-[rgba(0,9,50,0.12)] bg-white text-left shadow-[0_1px_3px_rgba(0,9,50,0.06)]';

/** Left-chat KPI blocks (unconfirmed, no-show) — matches scheduler column tint. */
const SCHEDULER_CASCADE_TINT_SHELL =
  'box-border w-full min-w-0 overflow-hidden rounded-xl border border-[rgba(0,9,50,0.12)] bg-[#eef2f7] text-left shadow-[0_1px_3px_rgba(0,9,50,0.06)]';

/** Same chrome as patient-card / insight when thread is no longer on scheduler (archived KPI rows). */
const THREAD_ARCHIVE_CARD =
  'box-border w-full min-w-0 rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-4 text-left shadow-[var(--ds-shadow-card)]';

function cascadeItemCountLabel(count: number) {
  return `${count} item${count === 1 ? '' : 's'}`;
}

/** sc1 chat card row: `Name · Visit type | Time · Doctor` */
function CascadeSc1Line({
  name,
  visitType,
  time,
  doctor,
}: {
  name: string;
  visitType: string;
  time: string;
  doctor: string;
}) {
  const vt = chatVisitTypeLabel(visitType);
  return (
    <p className="w-full text-left text-[12px] leading-relaxed text-slate-700">
      <span className="font-semibold text-slate-900">{name}</span>
      <span className="text-slate-400"> · </span>
      <span>{vt}</span>
      <span className="text-slate-300"> | </span>
      <span className="text-slate-600">{time}</span>
      <span className="text-slate-300"> · </span>
      <span className="text-slate-600">{doctor}</span>
    </p>
  );
}

/** Left-chat KPI-style cascade (sc1 / sc2): title + “N items”, Open + chevron; list expands/collapses. */
function ChatCascadeUnconfirmedCard({ onOpen, readOnly = false }: { onOpen: () => void; readOnly?: boolean }) {
  const [expanded, setExpanded] = useState(true);
  if (readOnly) {
    return (
      <div
        data-name="ChatCascadeUnconfirmed"
        className={`flex flex-col font-['Inter',sans-serif] box-border w-full min-w-0 rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[#eef2f7] p-4 text-left shadow-[var(--ds-shadow-card)]`}
      >
        <p className="font-['Inter',sans-serif] text-[13px] font-semibold leading-snug text-[var(--ds-text-primary)]">
          Unconfirmed Appointments
        </p>
        <p className="mt-0.5 font-['Inter',sans-serif] text-[11px] font-medium leading-none text-slate-500">
          {cascadeItemCountLabel(UNCONFIRMED_PATIENTS.length)}
        </p>
        <ul className="mt-3 min-h-0 w-full space-y-2.5 border-t border-[var(--ds-border)] pt-3 text-left font-['Inter',sans-serif]">
          {UNCONFIRMED_PATIENTS.map((p, i) => (
            <li
              key={p.id}
              className={i < UNCONFIRMED_PATIENTS.length - 1 ? 'border-b border-[var(--ds-border)] pb-2.5' : ''}
            >
              <CascadeSc1Line name={p.name} visitType={p.visitType} time={p.time} doctor={p.doctor} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div
      data-name="ChatCascadeUnconfirmed"
      className={`flex flex-col font-['Inter',sans-serif] ${SCHEDULER_CASCADE_TINT_SHELL}`}
    >
      <div className="flex items-start justify-between gap-2 px-4 pb-3 pt-4 text-left">
        <div className="min-w-0 flex-1">
          <p className="font-['Inter',sans-serif] text-[13px] font-semibold leading-snug tracking-tight text-slate-900">
            Unconfirmed Appointments
          </p>
          <p className="mt-0.5 font-['Inter',sans-serif] text-[11px] font-medium leading-none text-slate-500">
            {cascadeItemCountLabel(UNCONFIRMED_PATIENTS.length)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={onOpen}
            className="rounded-lg border border-[rgba(0,9,50,0.12)] bg-slate-50/90 px-3 py-1.5 text-[12px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            Open
          </button>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="rounded-lg border border-[rgba(0,9,50,0.12)] bg-white p-1.5 text-slate-600 shadow-sm transition hover:bg-slate-50"
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse appointment list' : 'Expand appointment list'}
          >
            {expanded ? (
              <ChevronUp className="size-4" strokeWidth={2} aria-hidden />
            ) : (
              <ChevronDown className="size-4" strokeWidth={2} aria-hidden />
            )}
          </button>
        </div>
      </div>
      {expanded ? (
        <ul className="m-0 min-h-0 w-full list-none border-t border-[rgba(0,9,50,0.1)] p-0 text-left font-['Inter',sans-serif]">
          {UNCONFIRMED_PATIENTS.map((p, i) => (
            <li
              key={p.id}
              className="border-b border-[rgba(0,9,50,0.1)] px-4 py-2.5 last:border-b-0 last:pb-4"
            >
              <CascadeSc1Line name={p.name} visitType={p.visitType} time={p.time} doctor={p.doctor} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ChatCascadeNoShowCard({ onOpen, readOnly = false }: { onOpen: () => void; readOnly?: boolean }) {
  const [expanded, setExpanded] = useState(true);
  if (readOnly) {
    return (
      <div
        data-name="ChatCascadeNoShow"
        className={`flex flex-col font-['Inter',sans-serif] box-border w-full min-w-0 rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[#eef2f7] p-4 text-left shadow-[var(--ds-shadow-card)]`}
      >
        <p className="font-['Inter',sans-serif] text-[13px] font-semibold leading-snug text-[var(--ds-text-primary)]">
          Potential No-Shows
        </p>
        <p className="mt-0.5 font-['Inter',sans-serif] text-[11px] font-medium leading-none text-slate-500">
          {cascadeItemCountLabel(1)}
        </p>
        <ul className="mt-3 min-h-0 w-full border-t border-[var(--ds-border)] pt-3 text-left font-['Inter',sans-serif]">
          <li>
            <CascadeSc1Line
              name={CHAT_POTENTIAL_NOSHOW_SC1.name}
              visitType={CHAT_POTENTIAL_NOSHOW_SC1.visitType ?? 'Follow-up'}
              time={CHAT_POTENTIAL_NOSHOW_SC1.time}
              doctor={CHAT_POTENTIAL_NOSHOW_SC1.doctor}
            />
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div
      data-name="ChatCascadeNoShow"
      className={`flex flex-col font-['Inter',sans-serif] ${SCHEDULER_CASCADE_TINT_SHELL}`}
    >
      <div className="flex items-start justify-between gap-2 px-4 pb-3 pt-4 text-left">
        <div className="min-w-0 flex-1">
          <p className="font-['Inter',sans-serif] text-[13px] font-semibold leading-snug tracking-tight text-slate-900">
            Potential No-Shows
          </p>
          <p className="mt-0.5 font-['Inter',sans-serif] text-[11px] font-medium leading-none text-slate-500">
            {cascadeItemCountLabel(1)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={onOpen}
            className="rounded-lg border border-[rgba(0,9,50,0.12)] bg-slate-50/90 px-3 py-1.5 text-[12px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            Open
          </button>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="rounded-lg border border-[rgba(0,9,50,0.12)] bg-white p-1.5 text-slate-600 shadow-sm transition hover:bg-slate-50"
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse patient list' : 'Expand patient list'}
          >
            {expanded ? (
              <ChevronUp className="size-4" strokeWidth={2} aria-hidden />
            ) : (
              <ChevronDown className="size-4" strokeWidth={2} aria-hidden />
            )}
          </button>
        </div>
      </div>
      {expanded ? (
        <ul className="m-0 min-h-0 w-full list-none border-t border-[rgba(0,9,50,0.1)] p-0 text-left font-['Inter',sans-serif]">
          <li className="border-b-0 px-4 pb-3 pt-2.5">
            <CascadeSc1Line
              name={CHAT_POTENTIAL_NOSHOW_SC1.name}
              visitType={CHAT_POTENTIAL_NOSHOW_SC1.visitType ?? 'Follow-up'}
              time={CHAT_POTENTIAL_NOSHOW_SC1.time}
              doctor={CHAT_POTENTIAL_NOSHOW_SC1.doctor}
            />
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export function ChatBubble({
  item,
  sessionSeconds,
  onOpenSummary,
  highlightPatientSummary = false,
  onSchedulerViewUnconfirmed,
  onSchedulerViewNoShow,
  schedulerChrome = false,
  onQuickAction,
  ctaHints,
}: {
  item: ChatItem;
  sessionSeconds: number;
  onOpenSummary: () => void;
  highlightPatientSummary?: boolean;
  onSchedulerViewUnconfirmed?: () => void;
  onSchedulerViewNoShow?: () => void;
  schedulerChrome?: boolean;
  onQuickAction?: (label: string) => void;
  ctaHints?: ReadonlySet<CtaHintId>;
}) {
  if (item.kind === 'suggestion-chips') {
    const labels = item.suggestionLabels ?? [];
    const body = (
      <>
        <p
          className={`mb-3 text-left text-[11px] font-medium leading-none tracking-wide ${
            schedulerChrome ? 'text-slate-500' : 'text-[var(--ds-text-muted)]'
          }`}
        >
          Suggested actions
        </p>
        <div className="flex flex-wrap gap-2">
          {labels.map((label, idx) => {
            const hint = chatChipLabelToCtaHint(label);
            const isHighlighted = Boolean(ctaHints && hint !== null && ctaHints.has(hint));
            return (
              <button
                key={`${item.id}-${idx}`}
                type="button"
                onClick={() => onQuickAction?.(label)}
                {...(isHighlighted && hint ? { 'data-cta-hint': hint } : {})}
                aria-label={label}
                className={`inline-flex min-h-[40px] max-w-full cursor-pointer items-center justify-start gap-2 border border-[var(--ds-border-accent)] px-4 py-2 font-['Inter',sans-serif] text-[12px] font-medium leading-snug text-[var(--ds-primary-action)] transition ${
                  schedulerChrome
                    ? 'rounded-[10px] bg-[#eef2f7] hover:bg-[#e4e9f1]'
                    : 'rounded-[var(--ds-radius-pill)] bg-white hover:bg-[var(--ds-bg-secondary)]'
                } ${ctaHighlightClass(isHighlighted, schedulerChrome ? 'none' : 'pill')}`}
              >
                <span
                  className="inline-flex size-[18px] shrink-0 items-center justify-center text-[var(--ds-primary-action)]"
                  aria-hidden
                >
                  <ArrowUpRight className="size-3.5" strokeWidth={2} />
                </span>
                <span className="inline-flex min-w-0 items-center text-left">{label}</span>
              </button>
            );
          })}
        </div>
      </>
    );
    /** sc1 / sc2: suggested actions sit in the chat column with no outer card — only the chip pills are bordered. */
    return (
      <div
        data-name="ChatSuggestionChips"
        className={`flex w-full min-w-0 flex-col justify-start text-left font-['Inter',sans-serif] ${
          schedulerChrome ? '' : 'max-w-[min(100%,440px)]'
        }`}
      >
        {body}
      </div>
    );
  }

  if (item.kind === 'cascade-unconfirmed-card') {
    return (
      <ChatCascadeUnconfirmedCard
        readOnly={!schedulerChrome}
        onOpen={() => onSchedulerViewUnconfirmed?.()}
      />
    );
  }

  if (item.kind === 'cascade-noshow-card') {
    return <ChatCascadeNoShowCard readOnly={!schedulerChrome} onOpen={() => onSchedulerViewNoShow?.()} />;
  }

  if (item.kind === 'patient-card') {
    return (
      <div
        data-name="ChatPatientCard"
        className="w-full rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-[16px] shadow-[var(--ds-shadow-card)]"
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
        className="w-full p-[16px] font-['Inter',sans-serif] text-[13px] font-normal leading-[24px] text-[var(--ds-text-primary)]"
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
        className="w-full rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-[16px] shadow-[var(--ds-shadow-card)]"
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
        className="w-fit rounded-[var(--ds-radius-pill)] border border-[var(--ds-border-accent)] bg-[var(--ds-warning-surface)] px-[16px] py-[8px] font-['Inter',sans-serif] text-[12px] font-medium leading-[18px] text-[var(--ds-warning-text)]"
      >
        {item.content}
      </div>
    );
  }

  const isUser = item.kind === 'user';
  return (
    <div
      className={`flex min-w-0 w-full ${isUser ? 'justify-end' : 'justify-start'}`}
      data-name={isUser ? 'ChatUser' : 'ChatEva'}
    >
      <div
        className={
          isUser
            ? 'flex w-full min-w-0 flex-col items-end gap-1.5'
            : 'w-full min-w-0'
        }
      >
        {!isUser && (
          <div
            className={`mb-2 flex items-center justify-between gap-3 font-['Inter',sans-serif] text-[11px] font-semibold uppercase leading-none tracking-[0.08em] ${
              schedulerChrome ? 'text-indigo-600' : 'text-[var(--ds-primary-accent)]'
            }`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                  schedulerChrome
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-[var(--ds-bg-accent-purple)] text-[var(--ds-primary-action)]'
                }`}
              >
                ✦
              </span>
              <span className="truncate">EVA</span>
            </div>
            {item.timestamp ? (
              <time
                className={`shrink-0 text-[11px] font-medium normal-case tracking-normal ${
                  schedulerChrome ? 'text-slate-400' : 'text-[var(--ds-text-muted)]'
                }`}
              >
                {item.timestamp}
              </time>
            ) : null}
          </div>
        )}
        <div
          className={
            isUser
              ? `inline-block max-w-[80%] min-w-0 break-words text-left font-['Inter',sans-serif] text-[14px] font-normal leading-relaxed bg-[#eef2f7] px-4 py-3 text-[var(--ds-text-primary)] ${
                  schedulerChrome
                    ? 'rounded-2xl shadow-sm'
                    : 'rounded-[var(--ds-radius-card)] shadow-[var(--ds-shadow-card)]'
                }`
              : schedulerChrome
                ? `whitespace-pre-wrap border-0 bg-transparent px-0 py-2 text-left font-['Inter',sans-serif] text-[14px] font-normal leading-relaxed text-slate-800 shadow-none`
                : `box-border w-full min-w-0 p-4 font-['Inter',sans-serif] text-[14px] font-normal leading-relaxed text-[var(--ds-text-primary)]`
          }
        >
          {item.content}
        </div>
        {isUser && item.timestamp ? (
          <div
            className={`max-w-[80%] text-[11px] font-medium text-right ${
              schedulerChrome ? 'text-slate-400' : 'text-[var(--ds-text-muted)]'
            }`}
          >
            {item.timestamp}
          </div>
        ) : null}
      </div>
    </div>
  );
}
