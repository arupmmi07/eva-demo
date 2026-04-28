import type { ReactNode } from 'react';
import { ChevronDown, MoreVertical } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';
import { DailyScheduleCalendarIcon } from './DailyScheduleCalendarIcon';
import type { LandingOnlyMomentId } from '../momentLandings';
import { Moment4SpatialRightPane } from './moment4/Moment4SpatialRightPane';
import { Moment5SpatialRightPane } from './moment5/Moment5SpatialRightPane';
import { Moment8SpatialRightPane } from './moment8/Moment8SpatialRightPane';
import { Moment9SpatialRightPane } from './moment9/Moment9SpatialRightPane';
import { Moment10SpatialRightPane } from './moment10/Moment10SpatialRightPane';

function CardMenu() {
  return (
    <button
      type="button"
      className="rounded-lg p-1.5 text-[#64748b] transition hover:bg-[#f1f5f9]"
      aria-label="Menu"
    >
      <MoreVertical className="size-4" strokeWidth={1.5} />
    </button>
  );
}

function StatusBadge({ children, tone }: { children: ReactNode; tone: 'green' | 'amber' | 'blue' }) {
  const cls =
    tone === 'green'
      ? 'border-transparent bg-[#2E7D321A] text-[#1B5E20]'
      : tone === 'amber'
        ? 'border-transparent bg-[#EF6C001A] text-[#E65100]'
        : 'border-transparent bg-[#3D5AFE1A] text-[#3F51B5]';
  return (
    <span
      className={cn(
        'shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold leading-4 tracking-normal',
        cls,
      )}
    >
      {children}
    </span>
  );
}

/** Current-time marker between 8:00 and 8:30 — matches spatial reference. */
function ScheduleNowMarkerRow() {
  return (
    <div
      className="relative h-[2px] min-h-[2px] shrink-0 border-b border-[rgba(0,9,50,0.06)]"
      aria-hidden
    >
      <div className="pointer-events-none absolute bottom-0 left-[-8px] right-0 h-[2px] rounded-sm bg-red-500" />
      <div className="pointer-events-none absolute bottom-[-5px] left-[-10px] size-2 rounded-full bg-red-500" />
    </div>
  );
}

type ScheduleRowModel = {
  time: string;
  name: string;
  type: string;
  status: string;
  tone: 'green' | 'amber' | 'blue';
};

function DailyScheduleRow({
  row,
  nameMuted,
  showDivider,
}: {
  row: ScheduleRowModel;
  nameMuted?: boolean;
  showDivider: boolean;
}) {
  return (
    <article
      className={cn(
        'relative grid min-w-0 grid-cols-[minmax(2.75rem,3.75rem)_minmax(0,1fr)] gap-x-2 py-3',
        showDivider && 'border-b border-[rgba(0,9,50,0.06)]',
      )}
    >
      <div className="pt-0.5 font-[Inter,sans-serif] text-[12px] font-semibold tabular-nums text-[#64748b]">
        {row.time}
      </div>
      <div className="relative min-w-0 pr-8">
        <button
          type="button"
          className="absolute right-0 top-0 flex size-7 items-center justify-center rounded-md text-[#64748b] hover:bg-[#f1f5f9]"
          aria-label="Expand appointment"
        >
          <ChevronDown className="size-4" strokeWidth={2} />
        </button>
        <p
          className={cn(
            'font-[Inter,sans-serif] text-[14px] font-semibold leading-5 text-[#020617]',
            nameMuted && 'font-medium text-[#94a3b8]',
          )}
        >
          {row.name}
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2 font-[Inter,sans-serif] text-[12px] leading-[18px] text-[#64748b]">
          <span>{row.type}</span>
          <StatusBadge tone={row.tone}>{row.status}</StatusBadge>
        </div>
      </div>
    </article>
  );
}

function DailyScheduleLanding({
  bottomCards,
  cardTone,
  headerVariant = 'rich',
  bottomKpiMinHeightPx = 104,
}: {
  bottomCards: { title: string; subtitle: string }[];
  cardTone: 'slate' | 'sky';
  /** `minimal` matches `public/moment6/Spatial.png` (icon + title + menu only). */
  headerVariant?: 'rich' | 'minimal';
  /** KPI tile min-height; moment6 uses 240 to match moment5 `Card` tiles. */
  bottomKpiMinHeightPx?: 104 | 240;
}) {
  const leftCol: ScheduleRowModel[] = [
    { time: '8:00', name: 'Sarah Mitchell', type: 'New patient', status: 'Checked In', tone: 'green' },
    { time: '8:30', name: 'Carlos Torres', type: 'Follow-up', status: 'Checked In', tone: 'green' },
    { time: '9:00', name: 'Priya Ramachandran', type: 'Urgent', status: 'Waiting', tone: 'amber' },
    { time: '9:30', name: 'David Park', type: 'Follow-up', status: 'Incoming', tone: 'blue' },
  ];
  const rightCol: ScheduleRowModel[] = [
    { time: '10:00', name: 'Isabel Nguyen', type: 'New Patient', status: 'Incoming', tone: 'blue' },
    { time: '10:30', name: 'Aerin Kyle', type: 'New patient', status: 'Incoming', tone: 'blue' },
    { time: '11:00', name: 'Marcus Webb', type: 'Follow-up', status: 'Incoming', tone: 'blue' },
    { time: '11:30', name: 'Lin Chen', type: 'Follow-up', status: 'Incoming', tone: 'blue' },
  ];

  const bottomCardClass = cn(
    'flex flex-col items-center justify-center rounded-[12px] border px-3 py-4 text-center shadow-none',
    bottomKpiMinHeightPx === 240 ? 'min-h-[240px]' : 'min-h-[104px]',
    cardTone === 'sky'
      ? 'border-[#c9d8ee] bg-[#e8f0fa]'
      : 'border-[rgba(0,9,50,0.08)] bg-[#f1f5f9]',
  );

  return (
    <div className="mx-auto min-h-0 w-full min-w-0 max-w-[1100px] space-y-4 bg-[#F8F9FB] pb-10 font-[Inter,sans-serif] antialiased">
      <section className="overflow-hidden rounded-xl border border-[rgba(0,9,50,0.12)] bg-white shadow-[0px_1px_2px_rgba(15,23,42,0.04)]">
        {headerVariant === 'minimal' ? (
          <div className="flex h-[50px] items-center justify-between gap-3 border-b border-[rgba(0,9,50,0.08)] px-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <DailyScheduleCalendarIcon className="size-7 shrink-0" />
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold leading-5 tracking-tight text-[#020617]">Daily Schedule</h3>
                <p className="text-[11px] font-medium leading-4 text-[#64748b]">11 items to attend</p>
              </div>
            </div>
            <CardMenu />
          </div>
        ) : (
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[rgba(0,9,50,0.08)] px-4 py-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="mt-0.5 shrink-0">
                <DailyScheduleCalendarIcon className="size-7" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[#020617]">Daily Schedule</h3>
                <p className="text-[12px] font-medium text-[#64748b]">11 items to attend</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              <div className="hidden rounded-lg border border-[rgba(0,9,50,0.12)] bg-[#f8fafc] px-2 py-1 text-[11px] font-semibold text-[#64748b] sm:block">
                Dr. Park
              </div>
              <div className="flex rounded-lg border border-[rgba(0,9,50,0.12)] p-0.5 text-[11px] font-semibold">
                <span className="rounded-md bg-white px-2 py-1 text-[#020617] shadow-sm">Current</span>
                <span className="px-2 py-1 text-[#64748b]">Check-in History</span>
              </div>
              <CardMenu />
            </div>
          </div>
        )}
        <div className="grid min-w-0 grid-cols-1 gap-0 md:grid-cols-2">
          <div className="min-w-0 border-[rgba(0,9,50,0.08)] px-2.5 pb-1 pt-0 sm:px-4 md:border-r">
            {leftCol.map((row, idx) => (
              <div key={row.time} className="min-w-0">
                <DailyScheduleRow
                  row={row}
                  nameMuted={idx === 0}
                  showDivider={idx !== leftCol.length - 1}
                />
                {idx === 0 ? <ScheduleNowMarkerRow /> : null}
              </div>
            ))}
          </div>
          <div className="min-w-0 px-2.5 sm:px-4">
            {rightCol.map((row, idx) => (
              <DailyScheduleRow
                key={row.time}
                row={row}
                showDivider={idx !== rightCol.length - 1}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end border-t border-[rgba(0,9,50,0.12)] px-3 py-2.5 sm:px-4">
          <button
            type="button"
            className="text-[12px] font-semibold leading-4 text-[#3D5AFE] transition hover:underline"
          >
            View full schedule →
          </button>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-6">
        {bottomCards.map((c) => (
          <div key={c.title} className={bottomCardClass}>
            <p className="text-balance font-[Inter,sans-serif] text-[13px] font-semibold leading-[18px] text-[#020617] sm:text-[14px] sm:leading-5">
              {c.title}
            </p>
            <p className="mt-1 font-[Inter,sans-serif] text-[12px] font-medium leading-4 text-[#64748b]">
              {c.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Bottom tiles for moment6 — `public/moment6/Spatial.png`. */
const moment6SpatialKpis = [
  { title: 'Messages', subtitle: 'XXX Items' },
  { title: 'No Show Risk / High Cancellation Risk', subtitle: 'XXX Items' },
  { title: 'Incomplete Notes', subtitle: 'XXX Items' },
  { title: 'Co-Signatures Pending', subtitle: 'XXX Items' },
];

const defaultKpis = [
  { title: 'Clinic Health', subtitle: 'XXX Items' },
  { title: 'Referral Queue', subtitle: 'XXX Items' },
  { title: 'Appointment Risk', subtitle: 'XXX Items' },
  { title: 'Payment Collection', subtitle: 'XXX Items' },
];

export function MomentLandingSurface({ momentId }: { momentId: LandingOnlyMomentId }) {
  switch (momentId) {
    case 'moment4':
      return <Moment4SpatialRightPane />;
    case 'moment5':
      return <Moment5SpatialRightPane />;
    case 'moment12':
      return (
        <DailyScheduleLanding bottomCards={defaultKpis} cardTone="slate" bottomKpiMinHeightPx={240} />
      );
    case 'moment6':
      return (
        <DailyScheduleLanding
          bottomCards={moment6SpatialKpis}
          cardTone="sky"
          headerVariant="minimal"
          bottomKpiMinHeightPx={240}
        />
      );
    case 'moment7':
      return (
        <DailyScheduleLanding bottomCards={defaultKpis} cardTone="slate" bottomKpiMinHeightPx={240} />
      );
    case 'moment8':
      return <Moment8SpatialRightPane />;
    case 'moment9':
      return <Moment9SpatialRightPane />;
    case 'moment10':
      return <Moment10SpatialRightPane />;
    case 'moment11':
      return <Moment10SpatialRightPane dataName="Moment11SpatialRightPane" />;
    case 'moment13':
      return <Moment10SpatialRightPane dataName="Moment13SpatialRightPane" />;
    default: {
      const _e: never = momentId;
      return _e;
    }
  }
}
