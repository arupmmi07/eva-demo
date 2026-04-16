import { Fragment, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Calendar,
  Check,
  ChevronUp,
  CircleSlash2,
  MessageSquareDot,
  MoreVertical,
  Phone,
  User,
} from 'lucide-react';
import {
  OUTSTANDING_COPAYS,
  POTENTIAL_NO_SHOWS_SEED,
  SCHEDULE_CHANGES,
  TODAY_PATIENTS,
  UNANSWERED_THREADS,
  type PotentialNoShowPatient,
  type UnconfirmedId,
  UNCONFIRMED_PATIENTS,
  type UnconfirmedPatient,
} from './schedulerData';
import type { SchedulerExpandedPanel } from '../types';
import { SchedulerCalendar } from './SchedulerCalendar';

export interface SchedulerToast {
  id: string;
  title: string;
  body: string;
}

const card = 'rounded-xl border border-[rgba(0,9,50,0.12)] bg-white shadow-[0_1px_3px_rgba(0,9,50,0.06)]';

/** Full-width expanded shell: same KPI tile grows with list as children (sc2 / sc3). */
const expandedShell =
  'w-full min-w-0 overflow-hidden rounded-2xl border bg-[#f4f6ff] shadow-[0_0_0_1px_rgba(123,137,244,0.2),0_4px_20px_rgba(0,9,50,0.08)]';

function KpiTileHeader({
  label,
  count,
  sub,
  badgeCount,
  Icon,
}: {
  label: string;
  count: number | string;
  sub?: string;
  badgeCount?: number;
  Icon: LucideIcon;
}) {
  const showBadge = badgeCount !== undefined;
  return (
    <div className="relative flex min-h-[92px] items-center gap-2.5 px-2.5 py-3 sm:gap-3 sm:px-3.5">
      {showBadge ? (
        <span className="absolute right-2.5 top-1/2 flex h-[22px] min-w-[22px] -translate-y-1/2 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[11px] font-bold leading-none text-white shadow-sm">
          {badgeCount}
        </span>
      ) : null}
      <div className="flex shrink-0 items-center self-center text-[#94a3b8]" aria-hidden>
        <Icon className="size-[22px] sm:size-6" strokeWidth={1.65} />
      </div>
      <div className="min-w-0 flex-1 self-center pr-8">
        <span className="block line-clamp-2 text-[11px] font-medium leading-snug text-[#64748b]">{label}</span>
        {sub ? <span className="mt-1 block line-clamp-1 text-[10px] leading-tight text-[#94a3b8]">{sub}</span> : null}
      </div>
    </div>
  );
}

function ExpandedKpiUnified({
  label,
  count,
  sub,
  badgeCount,
  listLabel,
  onCollapse,
  Icon,
  children,
}: {
  label: string;
  count: number | string;
  sub?: string;
  badgeCount?: number;
  listLabel: string;
  onCollapse: () => void;
  Icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section className={expandedShell}>
      <button
        type="button"
        onClick={onCollapse}
        className="relative w-full border-[rgba(123,137,244,0.35)] bg-white/90 text-left transition"
        aria-label="Collapse section"
      >
        <KpiTileHeader label={label} count={count} sub={sub} badgeCount={badgeCount} Icon={Icon} />
      </button>
      <div className="bg-gradient-to-b from-white to-slate-50/90 px-3 py-4 sm:px-6 sm:py-5">
        <ul className="m-0 flex w-full min-w-0 list-none flex-col gap-2.5 p-0">{children}</ul>
      </div>
    </section>
  );
}

const LIST_LABEL_BY_PANEL: Partial<Record<SchedulerExpandedPanel, string>> = {
  unconfirmed: 'Appointments',
  potentialNoShow: 'Patients',
  scheduleChanges: 'Updates',
  todaysPatients: 'Appointments',
  unansweredMessages: 'Threads',
  outstandingCopays: 'Accounts',
};

interface SchedulerRightPaneProps {
  expanded: SchedulerExpandedPanel;
  onExpand: (panel: SchedulerExpandedPanel) => void;
  remindersSent: Record<UnconfirmedId, boolean>;
  onResendReminder: (id: UnconfirmedId) => void;
  samMovedToNoShow: boolean;
  onMarkSamNoShow: () => void;
  toasts: SchedulerToast[];
  onDismissToast: (id: string) => void;
  goodNewsFired: boolean;
  onOpenPreVisitSummary: () => void;
}

function KpiCard({
  label,
  count,
  sub,
  active,
  onClick,
  badgeCount,
  Icon,
}: {
  label: string;
  count: number | string;
  sub?: string;
  active: boolean;
  onClick: () => void;
  badgeCount?: number;
  Icon: LucideIcon;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left transition ${
        active
          ? 'rounded-xl border bg-[#f4f6ff] shadow-[0_0_0_1px_rgba(123,137,244,0.25)]'
          : 'rounded-xl border border-[rgba(0,9,50,0.12)] bg-white shadow-[0_1px_3px_rgba(0,9,50,0.06)] hover:border-[rgba(0,9,50,0.18)]'
      }`}
    >
      <KpiTileHeader label={label} count={count} sub={sub} badgeCount={badgeCount} Icon={Icon} />
    </button>
  );
}

function UnconfirmedRow({
  p,
  sent,
  onResend,
  onMenuMarkNoShow,
  showSamKebab,
  nested = false,
}: {
  p: UnconfirmedPatient;
  sent: boolean;
  onResend: () => void;
  onMenuMarkNoShow?: () => void;
  showSamKebab: boolean;
  /** When true, render as a child row inside the expanded panel (sc2 / sc3). */
  nested?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen]);

  const lastLine = p.id === 'sam' ? '1 of 3 reminders sent · Last: Apr 14, 7:00 AM' : p.remindersLabel;

  const rowClass = nested
    ? 'rounded-xl border border-[rgba(0,9,50,0.08)] bg-white px-4 py-3.5 shadow-sm'
    : `${card} p-4`;

  return (
    <div className={rowClass}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-[15px] font-semibold tracking-tight text-slate-900">{p.name}</h4>
            {p.id === 'sam' && showSamKebab ? (
              <div className="relative shrink-0" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label="More actions"
                >
                  <MoreVertical className="size-4" />
                </button>
                {menuOpen ? (
                  <div className="absolute right-0 top-9 z-30 min-w-[200px] rounded-lg border border-[rgba(0,9,50,0.12)] bg-white py-1 shadow-lg">
                    <button
                      type="button"
                      className="block w-full px-3 py-2.5 text-left text-[13px] text-slate-800 hover:bg-slate-50"
                      onClick={() => {
                        setMenuOpen(false);
                        onMenuMarkNoShow?.();
                      }}
                    >
                      Mark as potential no-show
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <p className="mt-1 text-[12px] font-medium text-slate-500">
            {p.time} · {p.doctor} · {p.visitType}
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-sky-400/90 transition-all"
              style={{ width: p.id === 'angela' ? '66%' : p.id === 'maria' ? '100%' : '33%' }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">{lastLine}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end justify-center self-stretch pt-1">
          <button
            type="button"
            onClick={onResend}
            disabled={sent}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold transition ${
              sent
                ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80'
                : 'border border-[rgba(0,9,50,0.14)] bg-white text-slate-700 shadow-sm hover:bg-slate-50'
            }`}
          >
            {sent ? (
              <>
                <Check className="size-3.5 shrink-0 stroke-[2.5]" />
                Reminder Sent
              </>
            ) : (
              'Resend reminder'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function NoShowCard({ p, nested = false }: { p: PotentialNoShowPatient; nested?: boolean }) {
  const accent =
    p.risk === 'High Risk'
      ? 'border-l-[3px] border-l-red-500'
      : p.risk === 'Moderate'
        ? 'border-l-[3px] border-l-amber-400'
        : 'border-l-[3px] border-l-slate-200';
  const riskClass =
    p.risk === 'High Risk' ? 'text-red-600' : p.risk === 'Moderate' ? 'text-amber-700' : 'text-slate-500';

  const shell = nested
    ? `rounded-xl border border-[rgba(0,9,50,0.08)] bg-white px-4 py-3.5 shadow-sm ${accent}`
    : `${card} p-4 ${accent}`;

  return (
    <div className={shell}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[15px] font-semibold text-slate-900">
            {p.name}
            {p.risk ? <span className={`ml-1.5 text-[12px] font-semibold ${riskClass}`}>· {p.risk}</span> : null}
          </div>
          <p className="mt-1 text-[12px] font-medium text-slate-500">
            {p.time} · {p.doctor}
          </p>
          <p className="mt-2 text-[12px] leading-snug text-slate-600">{p.detail}</p>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[rgba(0,9,50,0.12)] bg-white px-3 py-2 text-[12px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Phone className="size-3.5 text-slate-500" />
          Call
        </button>
      </div>
    </div>
  );
}

export function SchedulerRightPane({
  expanded,
  onExpand,
  remindersSent,
  onResendReminder,
  samMovedToNoShow,
  onMarkSamNoShow,
  toasts,
  onDismissToast,
  goodNewsFired,
  onOpenPreVisitSummary,
}: SchedulerRightPaneProps) {
  const noShowList: PotentialNoShowPatient[] = samMovedToNoShow
    ? [
        {
          id: 'sam',
          name: 'Sam Greene',
          risk: 'High Risk',
          time: '2:30 PM',
          doctor: 'Dr. Aris',
          detail: 'Stopped answering messages since last week but attended all the previous sessions.',
        },
        ...POTENTIAL_NO_SHOWS_SEED,
      ]
    : POTENTIAL_NO_SHOWS_SEED;

  const unconfirmedBase = UNCONFIRMED_PATIENTS.filter((p) => !(samMovedToNoShow && p.id === 'sam'));
  const unconfirmedVisible = goodNewsFired ? unconfirmedBase.filter((p) => p.id === 'sam') : unconfirmedBase;
  const unconfirmedCount = goodNewsFired ? unconfirmedVisible.length : unconfirmedBase.length;

  const todaysPatientCount = TODAY_PATIENTS.length;
  const scheduleChangeCount = SCHEDULE_CHANGES.length;
  const unansweredCount = UNANSWERED_THREADS.length;
  const copayCount = OUTSTANDING_COPAYS.length;
  const noShowCount = noShowList.length;

  const kpiDefs = useMemo(
    () => [
      {
        panel: 'unconfirmed' as const,
        label: 'Unconfirmed Appointments',
        count: unconfirmedCount,
        badge: unconfirmedCount,
        sub: undefined as string | undefined,
        Icon: Calendar,
      },
      {
        panel: 'potentialNoShow' as const,
        label: 'Potential No-Shows',
        count: noShowCount,
        badge: noShowCount,
        sub: undefined,
        Icon: CircleSlash2,
      },
      {
        panel: 'todaysPatients' as const,
        label: "Today's Patients",
        count: todaysPatientCount,
        badge: todaysPatientCount,
        sub: undefined,
        Icon: User,
      },
      {
        panel: 'unansweredMessages' as const,
        label: 'Unanswered Patient Messages',
        count: unansweredCount,
        badge: unansweredCount,
        sub: undefined,
        Icon: MessageSquareDot,
      },
      {
        panel: 'outstandingCopays' as const,
        label: 'Outstanding Copays',
        count: copayCount,
        badge: copayCount,
        // sub: '$625 past 14 days',
        Icon: Calendar,
      },
      {
        panel: 'scheduleChanges' as const,
        label: 'Schedule Changes',
        count: scheduleChangeCount,
        badge: scheduleChangeCount,
        sub: undefined,
        Icon: Calendar,
      },
    ],
    [
      unconfirmedCount,
      noShowCount,
      todaysPatientCount,
      unansweredCount,
      copayCount,
      scheduleChangeCount,
    ],
  );

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-[#fafbfc]">
      <div className="pointer-events-none absolute right-4 top-4 z-20 flex max-w-[340px] flex-col gap-2.5">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-[0_8px_30px_rgba(0,9,50,0.12)]"
          >
            <div className="flex justify-between gap-3">
              <div>
                <div className="text-[14px] font-semibold text-emerald-900">{t.title}</div>
                <div className="mt-1 text-[12px] leading-snug text-emerald-800/90">{t.body}</div>
              </div>
              <button
                type="button"
                className="shrink-0 self-start text-[11px] font-medium text-emerald-700 underline-offset-2 hover:underline"
                onClick={() => onDismissToast(t.id)}
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <div className="w-full min-w-0 max-w-[1200px] mx-auto">
          {/* KPI: 2 per row; expanded option becomes one full-width card (same header) + children (sc2/sc3). */}
          <div className="mb-5 grid grid-cols-2 gap-3">
            {[0, 1, 2].map((rowIdx) => {
              const left = kpiDefs[rowIdx * 2];
              const right = kpiDefs[rowIdx * 2 + 1];
              const leftOpen = expanded === left.panel;
              const rightOpen = expanded === right.panel;
              const rowOpen = leftOpen || rightOpen;

              if (!rowOpen) {
                return (
                  <Fragment key={rowIdx}>
                    <KpiCard
                      key={left.panel}
                      label={left.label}
                      count={left.count}
                      sub={left.sub}
                      active={expanded === left.panel}
                      badgeCount={left.badge}
                      Icon={left.Icon}
                      onClick={() => onExpand(expanded === left.panel ? 'none' : left.panel)}
                    />
                    <KpiCard
                      key={right.panel}
                      label={right.label}
                      count={right.count}
                      sub={right.sub}
                      active={expanded === right.panel}
                      badgeCount={right.badge}
                      Icon={right.Icon}
                      onClick={() => onExpand(expanded === right.panel ? 'none' : right.panel)}
                    />
                  </Fragment>
                );
              }

              const activeDef = leftOpen ? left : right;
              const siblingDef = leftOpen ? right : left;
              const listLabel = (LIST_LABEL_BY_PANEL[expanded] ?? 'Items') as string;

              let expandedChildren: ReactNode = null;
              if (expanded === 'unconfirmed') {
                expandedChildren = (
                  <>
                    {unconfirmedVisible.map((p) => (
                      <li key={p.id} className="min-w-0">
                        <UnconfirmedRow
                          nested
                          p={p}
                          sent={remindersSent[p.id]}
                          onResend={() => onResendReminder(p.id)}
                          onMenuMarkNoShow={onMarkSamNoShow}
                          showSamKebab={goodNewsFired && !samMovedToNoShow}
                        />
                      </li>
                    ))}
                  </>
                );
              } else if (expanded === 'potentialNoShow') {
                expandedChildren = (
                  <>
                    {noShowList.map((p) => (
                      <li key={p.id} className="min-w-0">
                        <NoShowCard nested p={p} />
                      </li>
                    ))}
                  </>
                );
              } else if (expanded === 'scheduleChanges') {
                expandedChildren = (
                  <>
                    {SCHEDULE_CHANGES.map((row) => (
                      <li key={row.id} className="min-w-0">
                        <div className="rounded-xl border border-[rgba(0,9,50,0.1)] bg-white px-4 py-3.5 shadow-sm">
                          <span
                            className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                              row.status === 'cancellation'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {row.status === 'cancellation' ? 'Cancellation' : 'Filled'}
                          </span>
                          <div className="mt-2 text-[14px] font-semibold text-slate-900">{row.title}</div>
                          <div className="text-[12px] font-medium text-slate-500">{row.subtitle}</div>
                          {row.meta ? (
                            <div className="mt-3 text-[12px] text-sky-700">
                              {row.id === 'c4' ? (
                                <>
                                  <div className="font-medium text-slate-700">{row.meta}</div>
                                  <div className="mt-2 h-2 w-full max-w-md overflow-hidden rounded-full bg-slate-200">
                                    <div className="h-full w-[40%] rounded-full bg-sky-500" />
                                  </div>
                                  <div className="mt-1 text-[11px] text-slate-500">40% complete</div>
                                </>
                              ) : (
                                <span className="font-medium">{row.meta}</span>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </>
                );
              } else if (expanded === 'todaysPatients') {
                expandedChildren = (
                  <>
                    {TODAY_PATIENTS.map((row) => (
                      <li key={row.id} className="min-w-0">
                        <TodayPatientRow nested row={row} onOpenPreVisitSummary={onOpenPreVisitSummary} />
                      </li>
                    ))}
                  </>
                );
              } else if (expanded === 'unansweredMessages') {
                expandedChildren = (
                  <>
                    {UNANSWERED_THREADS.map((t) => (
                      <li key={t.id} className="min-w-0">
                        <div className="rounded-xl border border-[rgba(0,9,50,0.08)] bg-white px-4 py-3.5 shadow-sm">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold text-slate-900">{t.patient}</p>
                              <p className="mt-1 text-[12px] leading-snug text-slate-600">{t.preview}</p>
                            </div>
                            <span className="shrink-0 text-[11px] font-medium text-slate-400">{t.timeLabel}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
                );
              } else if (expanded === 'outstandingCopays') {
                expandedChildren = (
                  <>
                    {OUTSTANDING_COPAYS.map((c) => (
                      <li key={c.id} className="min-w-0">
                        <div className="rounded-xl border border-[rgba(0,9,50,0.08)] bg-white px-4 py-3.5 shadow-sm">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-[13px] font-semibold text-slate-900">{c.patient}</span>
                            <span className="text-[13px] font-semibold text-slate-800">{c.amount}</span>
                          </div>
                          <p className="mt-1 text-[11px] font-medium text-slate-500">{c.daysPast} days past due</p>
                        </div>
                      </li>
                    ))}
                  </>
                );
              }

              return (
                <Fragment key={rowIdx}>
                  <div className="col-span-2 w-full min-w-0">
                    <ExpandedKpiUnified
                      label={activeDef.label}
                      count={activeDef.count}
                      sub={activeDef.sub}
                      badgeCount={activeDef.badge}
                      listLabel={listLabel}
                      Icon={activeDef.Icon}
                      onCollapse={() => onExpand('none')}
                    >
                      {expandedChildren}
                    </ExpandedKpiUnified>
                  </div>
                  <KpiCard
                    key={siblingDef.panel}
                    label={siblingDef.label}
                    count={siblingDef.count}
                    sub={siblingDef.sub}
                    active={expanded === siblingDef.panel}
                    badgeCount={siblingDef.badge}
                    Icon={siblingDef.Icon}
                    onClick={() => onExpand(siblingDef.panel)}
                  />
                  <div className="min-w-0" aria-hidden />
                </Fragment>
              );
            })}
          </div>

          <div className="mt-1">
            <SchedulerCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

function TodayPatientRow({
  row,
  onOpenPreVisitSummary,
  nested = false,
}: {
  row: (typeof TODAY_PATIENTS)[number];
  onOpenPreVisitSummary: () => void;
  nested?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const shell = nested
    ? 'flex items-center justify-between rounded-xl border border-[rgba(0,9,50,0.08)] bg-white px-4 py-3 shadow-sm'
    : 'flex items-center justify-between rounded-xl border border-[rgba(0,9,50,0.1)] bg-white px-4 py-3 shadow-sm';

  return (
    <div className={shell}>
      <div>
        <div className="text-[14px] font-semibold text-slate-900">{row.name}</div>
        <div className="mt-0.5 text-[12px] font-medium text-slate-500">
          {row.time} · {row.doctor} · {row.visitType}
        </div>
      </div>
      <div className="relative" ref={ref}>
        <button
          type="button"
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <MoreVertical className="size-4" />
        </button>
        {open ? (
          <div className="absolute right-0 top-10 z-30 min-w-[200px] rounded-xl border border-[rgba(0,9,50,0.12)] bg-white py-1 shadow-lg">
            <button
              type="button"
              className="block w-full px-4 py-2.5 text-left text-[13px] text-slate-800 hover:bg-slate-50"
              onClick={() => {
                setOpen(false);
                onOpenPreVisitSummary();
              }}
            >
              Open pre visit summary
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
