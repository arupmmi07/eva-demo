import { ChevronDown, MoreVertical } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { cn } from '@/app/components/ui/utils';
import { DailyScheduleCalendarIcon } from './DailyScheduleCalendarIcon';

function CardMenuTrigger() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-7 shrink-0 rounded-xl border-[rgba(0,9,50,0.08)] bg-background"
          aria-label="More options"
        >
          <MoreVertical className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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

/** Matches `DailyScheduleLanding` `headerVariant="minimal"` (moment6). */
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

function DailyScheduleRow({
  time,
  name,
  visitType,
  status,
  tone,
  nameMuted,
  showDivider,
}: {
  time: string;
  name: string;
  visitType: string;
  status: string;
  tone: 'green' | 'amber' | 'blue';
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
        {time}
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
          {name}
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2 font-[Inter,sans-serif] text-[12px] leading-[18px] text-[#64748b]">
          <span>{visitType}</span>
          <StatusBadge tone={tone}>{status}</StatusBadge>
        </div>
      </div>
    </article>
  );
}

/** Same rows as `DailyScheduleLanding` (moment6). */
const LEFT: {
  time: string;
  name: string;
  type: string;
  status: string;
  tone: 'green' | 'amber' | 'blue';
  nameMuted?: boolean;
}[] = [
  {
    time: '8:00',
    name: 'Sarah Mitchell',
    type: 'New patient',
    status: 'Checked In',
    tone: 'green',
    nameMuted: true,
  },
  {
    time: '8:30',
    name: 'Carlos Torres',
    type: 'Follow-up',
    status: 'Checked In',
    tone: 'green',
  },
  { time: '9:00', name: 'Priya Ramachandran', type: 'Urgent', status: 'Waiting', tone: 'amber' },
  { time: '9:30', name: 'David Park', type: 'Follow-up', status: 'Incoming', tone: 'blue' },
];

const RIGHT: { time: string; name: string; type: string; status: string; tone: 'green' | 'amber' | 'blue' }[] = [
  { time: '10:00', name: 'Isabel Nguyen', type: 'New Patient', status: 'Incoming', tone: 'blue' },
  { time: '10:30', name: 'Aerin Kyle', type: 'New patient', status: 'Incoming', tone: 'blue' },
  { time: '11:00', name: 'Marcus Webb', type: 'Follow-up', status: 'Incoming', tone: 'blue' },
  { time: '11:30', name: 'Lin Chen', type: 'Follow-up', status: 'Incoming', tone: 'blue' },
];

const TILES = [
  { title: 'Messages', subtitle: 'XXX Items' },
  { title: 'No Show Risk / High Cancellation Risk', subtitle: 'XXX Items' },
  { title: 'Incomplete Notes', subtitle: 'XXX Items' },
  { title: 'Co-Signatures Pending', subtitle: 'XXX Items' },
];

const kpiTileClass =
  'flex min-h-[240px] flex-col items-center justify-center rounded-[12px] border border-[#c9d8ee] bg-[#e8f0fa] px-3 py-4 text-center shadow-none';

/**
 * Daily schedule + KPI grid for moment5 — schedule card matches moment6 `DailyScheduleLanding`
 * (`headerVariant="minimal"`, rows, marker, KPI sky tiles).
 */
export function ScheduleSpatialRightPane({ dataName }: { dataName: string }) {
  return (
    <div
      className="mx-auto min-h-0 w-full min-w-0 max-w-[1100px] space-y-4 bg-[#F8F9FB] pb-10 font-[Inter,sans-serif] text-sm font-normal leading-5 text-[#020617] antialiased"
      data-name={dataName}
    >
      <section className="overflow-hidden rounded-xl border border-[rgba(0,9,50,0.12)] bg-white shadow-[0px_1px_2px_rgba(15,23,42,0.04)]">
        <div className="flex h-[50px] items-center justify-between gap-3 border-b border-[rgba(0,9,50,0.08)] px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <DailyScheduleCalendarIcon className="size-7" />
            <div className="min-w-0">
              <h1 className="text-[13px] font-semibold leading-5 tracking-tight text-[#020617]">Daily Schedule</h1>
              <p className="text-[11px] font-medium leading-4 text-[#64748b]">11 items to attend</p>
            </div>
          </div>
          <CardMenuTrigger />
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-0 md:grid-cols-2">
          <div className="min-w-0 border-[rgba(0,9,50,0.08)] px-2.5 pb-1 pt-0 sm:px-4 md:border-r">
            {LEFT.map((row, idx) => (
              <div key={row.time} className="min-w-0">
                <DailyScheduleRow
                  time={row.time}
                  name={row.name}
                  visitType={row.type}
                  status={row.status}
                  tone={row.tone}
                  nameMuted={row.nameMuted}
                  showDivider={idx !== LEFT.length - 1}
                />
                {idx === 0 ? <ScheduleNowMarkerRow /> : null}
              </div>
            ))}
          </div>
          <div className="min-w-0 px-2.5 sm:px-4">
            {RIGHT.map((row, idx) => (
              <DailyScheduleRow
                key={row.time}
                time={row.time}
                name={row.name}
                visitType={row.type}
                status={row.status}
                tone={row.tone}
                showDivider={idx !== RIGHT.length - 1}
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
          {TILES.map((t) => (
            <div key={t.title} className={kpiTileClass}>
              <p className="text-balance font-[Inter,sans-serif] text-[13px] font-semibold leading-[18px] text-[#020617] sm:text-[14px] sm:leading-5">
                {t.title}
              </p>
              <p className="mt-1 font-[Inter,sans-serif] text-[12px] font-medium leading-4 text-[#64748b]">
                {t.subtitle}
              </p>
            </div>
          ))}
        </div>
    </div>
  );
}
