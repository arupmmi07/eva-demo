import { CalendarDays, ChevronDown, MoreVertical } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { cn } from '@/app/components/ui/utils';

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

type ScheduleTone = 'green' | 'orange' | 'blue';

const badgeTone: Record<ScheduleTone, string> = {
  green: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  orange: 'border-amber-200 bg-amber-50 text-amber-900',
  blue: 'border-sky-200 bg-sky-50 text-sky-900',
};

function ScheduleRow({
  time,
  name,
  visitType,
  status,
  tone,
  active,
}: {
  time: string;
  name: string;
  visitType: string;
  status: string;
  tone: ScheduleTone;
  active?: boolean;
}) {
  return (
    <article
      className={cn(
        'relative grid grid-cols-[minmax(2.75rem,3.75rem)_minmax(0,1fr)] gap-x-2 border-b border-[rgba(0,9,50,0.06)] py-3 last:border-b-0',
        active &&
          'h-[54px] min-h-[54px] items-center overflow-hidden py-1.5 before:pointer-events-none before:absolute before:bottom-0 before:left-[-8px] before:right-0 before:h-0.5 before:rounded-sm before:bg-[var(--ds-danger)] after:pointer-events-none after:absolute after:bottom-[-6px] after:left-[-10px] after:size-3 after:rounded-full after:bg-[var(--ds-danger)]',
      )}
    >
      <div
        className={cn(
          'pt-0.5 font-[Inter,sans-serif] text-[12px] font-semibold tabular-nums text-[var(--ds-text-secondary)]',
          active && 'leading-[15px]',
        )}
      >
        {time}
      </div>
      <div className="relative min-w-0 pr-8">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 size-7 text-muted-foreground"
          aria-label="Expand appointment"
        >
          <ChevronDown className="size-4" strokeWidth={2} />
        </Button>
        <p
          className={cn(
            'font-[Inter,sans-serif] text-[14px] font-semibold leading-5 text-[var(--ds-text-primary)]',
            active && 'text-[12px] leading-[15px]',
          )}
        >
          {name}
        </p>
        <div
          className={cn(
            'mt-1 flex flex-wrap items-center justify-between gap-2 font-[Inter,sans-serif] text-[12px] leading-[18px] text-[var(--ds-text-secondary)]',
            active && 'mt-0 leading-[15px]',
          )}
        >
          <span className={cn(active && 'text-[12px]')}>{visitType}</span>
          <Badge
            variant="outline"
            className={cn(
              'shrink-0 text-[10px] font-bold uppercase tracking-wide',
              badgeTone[tone],
              active && 'text-[12px] font-semibold normal-case tracking-normal leading-[15px]',
            )}
          >
            {status}
          </Badge>
        </div>
      </div>
    </article>
  );
}

const LEFT: {
  time: string;
  name: string;
  visitType: string;
  status: string;
  tone: ScheduleTone;
  active?: boolean;
}[] = [
  { time: '8:00', name: 'Sarah Chen', visitType: 'New patient', status: 'Checked In', tone: 'green', active: true },
  { time: '8:30', name: 'Carlos Torres', visitType: 'Follow-up', status: 'Checked In', tone: 'green' },
  { time: '9:00', name: 'Priya Ramachandran', visitType: 'Urgent', status: 'Waiting', tone: 'orange' },
  { time: '9:30', name: 'David Park', visitType: 'Follow-up', status: 'Incoming', tone: 'blue' },
];

const RIGHT: { time: string; name: string; visitType: string; status: string; tone: ScheduleTone }[] = [
  { time: '10:00', name: 'Isabel Nguyen', visitType: 'New Patient', status: 'Incoming', tone: 'blue' },
  { time: '10:30', name: 'Aerin Kyle', visitType: 'Follow-up', status: 'Incoming', tone: 'blue' },
  { time: '11:00', name: 'Marcus Webb', visitType: 'New patient', status: 'Incoming', tone: 'blue' },
  { time: '11:30', name: 'Lin Chen', visitType: 'Follow-up', status: 'Incoming', tone: 'blue' },
];

const TILES = [
  { title: 'Clinic Health', subtitle: 'XXX Items' },
  { title: 'Referral Queue', subtitle: 'XXX Items' },
  { title: 'No-show Risk', subtitle: 'XXX Items' },
  { title: 'Payment Collection', subtitle: 'XXX Items' },
];

/** Moment5 right pane — Daily schedule + KPI tiles (Radix + Tailwind). */
export function Moment5SpatialRightPane() {
  return (
    <div
      className="min-h-full w-full min-w-0 bg-[#F8F9FB] pb-6 font-[Inter,sans-serif] text-sm leading-5 text-[var(--ds-text-primary)] antialiased"
      data-name="Moment5SpatialRightPane"
    >
      <main className="mx-auto w-full max-w-full pb-0 pt-0">
        <Card className="gap-0 overflow-hidden rounded-xl border border-[rgba(0,9,50,0.12)] bg-card shadow-[0px_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex h-[50px] items-center justify-between gap-3 border-b border-[rgba(0,9,50,0.08)] px-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div
                className="flex size-7 shrink-0 items-center justify-center rounded-[var(--ds-radius-card)] bg-[var(--ds-bg-accent-purple)] text-[var(--ds-primary-accent)]"
                aria-hidden
              >
                <CalendarDays className="size-3.5" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h1 className="font-[Inter,sans-serif] text-[13px] font-semibold leading-5 tracking-tight text-[var(--ds-text-primary)]">
                  Daily Schedule
                </h1>
                <p className="font-[Inter,sans-serif] text-[10px] font-medium leading-4 text-[var(--ds-text-secondary)]">
                  11 items to attend
                </p>
              </div>
            </div>
            <CardMenuTrigger />
          </div>
          <CardContent className="gap-0 p-0 px-0 pb-0 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-[rgba(0,9,50,0.08)] px-2.5 pb-1 pt-0 sm:px-4 md:border-r">
                {LEFT.map((row) => (
                  <ScheduleRow
                    key={row.time}
                    time={row.time}
                    name={row.name}
                    visitType={row.visitType}
                    status={row.status}
                    tone={row.tone}
                    active={row.active}
                  />
                ))}
              </div>
              <div className="px-2.5 sm:px-4">
                {RIGHT.map((row) => (
                  <ScheduleRow
                    key={row.time}
                    time={row.time}
                    name={row.name}
                    visitType={row.visitType}
                    status={row.status}
                    tone={row.tone}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end border-t border-[rgba(0,9,50,0.12)] px-3 py-2 sm:px-4">
              <Button
                type="button"
                variant="link"
                className="h-auto p-0 font-[Inter,sans-serif] text-[12px] font-semibold text-[var(--ds-primary-action)]"
              >
                View full schedule →
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((t) => (
            <Card
              key={t.title}
              className="flex min-h-[96px] items-center justify-center gap-0 rounded-[var(--ds-radius-card)] border border-[#d8dde4] bg-[#e9eaef] py-5 shadow-none"
            >
              <CardContent className="px-4 py-0 text-center">
                <h3 className="font-[Inter,sans-serif] text-[14px] font-semibold leading-5 text-[var(--ds-text-primary)]">
                  {t.title}
                </h3>
                <p className="mt-1 font-[Inter,sans-serif] text-[12px] font-medium leading-4 text-[var(--ds-text-secondary)]">
                  {t.subtitle}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
