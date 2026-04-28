import type { ReactNode } from 'react';
import { ChevronRight, MoreVertical } from 'lucide-react';
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
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 text-muted-foreground"
          aria-label="More options"
        >
          <MoreVertical className="size-4" strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PanelCard({
  title,
  children,
  showViewAll = true,
}: {
  title: string;
  children: ReactNode;
  showViewAll?: boolean;
}) {
  return (
    <Card
      className={cn(
        'gap-0 overflow-hidden rounded-xl border border-[rgba(0,9,50,0.12)] bg-card shadow-[0px_1px_2px_rgba(15,23,42,0.04)]',
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-[rgba(0,9,50,0.08)] px-4 pb-3 pt-4">
        <h2 className="font-[Inter,sans-serif] text-[15px] font-semibold leading-5 tracking-tight text-[var(--ds-text-primary)]">
          {title}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          {showViewAll ? (
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 font-[Inter,sans-serif] text-[12px] font-semibold text-[#1F2933]"
            >
              View all
            </Button>
          ) : null}
          <CardMenuTrigger />
        </div>
      </div>
      <CardContent className="gap-0 px-4 pb-4 pt-3">{children}</CardContent>
    </Card>
  );
}

function MetricQuad() {
  const cells = [
    { label: 'Visits', value: '216' },
    { label: 'Providers', value: '18' },
    { label: 'Utilization', value: '82%' },
    { label: 'Open slots', value: '12' },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {cells.map((c) => (
        <div
          key={c.label}
          className="rounded-[10px]ß bg-[#F9FAFB] px-3 py-3"
        >
          <p className="font-[Inter,sans-serif] text-[11px] font-medium leading-4 text-[var(--ds-text-secondary)]">
            {c.label}
          </p>
          <p className="mt-1 font-[Inter,sans-serif] text-[20px] font-semibold tabular-nums leading-7 tracking-tight text-[var(--ds-text-primary)]">
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function DocNotesRows() {
  const rows = [
    { label: 'Doc completion', value: '74%' },
    { label: 'Notes on-time', value: '68%' },
  ];
  return (
    <div className="mt-3 border-t border-[rgba(0,9,50,0.08)]">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={cn(
            'flex items-center justify-between py-2.5 font-[Inter,sans-serif] text-[12px] leading-4',
            i > 0 && 'border-t border-[rgba(0,9,50,0.08)]',
          )}
        >
          <span className="text-[var(--ds-text-secondary)]">{r.label}</span>
          <span className="font-semibold tabular-nums text-[var(--ds-text-primary)]">{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function LocationBlock({
  title,
  visitsLine,
  utilLine,
  alert,
}: {
  title: string;
  visitsLine: string;
  utilLine: ReactNode;
  alert?: string;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-[Inter,sans-serif] text-[14px] font-semibold leading-5 text-[var(--ds-text-primary)]">
            {title}
          </p>
          <p className="mt-1 font-[Inter,sans-serif] text-[12px] font-normal leading-4 text-[var(--ds-text-secondary)]">
            {visitsLine}
          </p>
          <div className="mt-3 inline-flex max-w-full flex-wrap items-center gap-x-1 rounded-[10px] bg-[#F9FAFB] px-3 py-2 font-[Inter,sans-serif] text-[11px] font-medium leading-4 text-[var(--ds-text-secondary)]">
            {utilLine}
          </div>
          {alert ? (
            <p className="mt-2 font-[Inter,sans-serif] text-[11px] font-semibold leading-4 text-[var(--ds-warning-text)]">
              {alert}
            </p>
          ) : null}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 shrink-0 border-[rgba(0,9,50,0.08)] bg-background"
          aria-label="Open location"
        >
          <ChevronRight className="size-4 text-muted-foreground" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}

function PayerRow({
  name,
  clean,
  pay,
  denial,
  badge,
  badgeClassName,
}: {
  name: string;
  clean: string;
  pay: string;
  denial: string;
  badge: string;
  badgeClassName: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-2 border-t border-[rgba(0,9,50,0.08)] py-3 first:border-t-0 first:pt-0">
      <div className="min-w-0 flex-1">
        <p className="font-[Inter,sans-serif] text-[14px] font-semibold leading-5 text-[var(--ds-text-primary)]">
          {name}
        </p>
        <p className="mt-1 font-[Inter,sans-serif] text-[11px] font-medium leading-4 text-[var(--ds-text-secondary)]">
          Clean <span className="font-semibold text-[var(--ds-text-primary)]">{clean}</span>
          <span className="mx-1 text-slate-300">·</span>
          Pay <span className="font-semibold text-[var(--ds-text-primary)]">{pay}</span>
          <span className="mx-1 text-slate-300">·</span>
          Denial <span className="font-semibold text-[var(--ds-text-primary)]">{denial}</span>
        </p>
      </div>
      <Badge variant="outline" className={cn('shrink-0 text-[10px] font-bold uppercase tracking-wide', badgeClassName)}>
        {badge}
      </Badge>
    </div>
  );
}

function ProviderRow({ name, note }: { name: string; note: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(0,9,50,0.08)] py-3 first:border-t-0 first:pt-0">
      <div className="min-w-0">
        <p className="font-[Inter,sans-serif] text-[14px] font-semibold leading-5 text-[var(--ds-text-primary)]">
          {name}
        </p>
        <p className="mt-0.5 font-[Inter,sans-serif] text-[12px] font-normal leading-4 text-[var(--ds-text-secondary)]">
          {note}
        </p>
      </div>
      <Button type="button" variant="outline" size="sm" className="shrink-0 font-[Inter,sans-serif] text-[11px] font-semibold">
        View
      </Button>
    </div>
  );
}

/** Moment4 right pane — Radix UI primitives + Tailwind (design tokens). */
export function Moment4SpatialRightPane() {
  return (
    <div
      className="min-h-full w-full bg-[#F8F9FB] font-[Inter,sans-serif]"
      data-name="Moment4SpatialRightPane"
    >
      <div className="mx-auto w-full max-w-[1342px] space-y-4 pb-8 pt-0">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <PanelCard title="Today · Cascade PT">
            <MetricQuad />
            <DocNotesRows />
          </PanelCard>

          <PanelCard title="Locations & Providers" showViewAll={false}>
            <div className="divide-y divide-[rgba(0,9,50,0.08)]">
              <div className="pb-4">
                <LocationBlock
                  title="Location 1 · Downtown"
                  visitsLine="108 visits · 9 providers"
                  utilLine={
                    <>
                      Utilization <span className="font-semibold text-[var(--ds-text-primary)]">84%</span>
                      <span className="mx-1">·</span>
                      Doc <span className="font-semibold text-[var(--ds-text-primary)]">78%</span>
                      <span className="mx-1">·</span>
                      On-time <span className="font-semibold text-[var(--ds-text-primary)]">72%</span>
                    </>
                  }
                />
              </div>
              <div className="pt-4">
                <LocationBlock
                  title="Location 2 · Westside"
                  visitsLine="108 visits · 9 providers"
                  utilLine={
                    <>
                      Utilization <span className="font-semibold text-[var(--ds-text-primary)]">80%</span>
                      <span className="mx-1">·</span>
                      Doc <span className="font-semibold text-[var(--ds-text-primary)]">70%</span>
                      <span className="mx-1">·</span>
                      On-time <span className="font-semibold text-[var(--ds-text-primary)]">64%</span>
                    </>
                  }
                  alert="Doc completion ↓ 3 weeks"
                />
              </div>
            </div>
          </PanelCard>

          <PanelCard title="Payer Performance">
            <div>
              <PayerRow
                name="Aetna PPO"
                clean="94%"
                pay="12d"
                denial="3%"
                badge="Healthy"
                badgeClassName="border-emerald-200 bg-emerald-50 text-emerald-800"
              />
              <PayerRow
                name="BCBS PPO"
                clean="89%"
                pay="18d"
                denial="6%"
                badge="Normal"
                badgeClassName="border-slate-200 bg-slate-100 text-slate-700"
              />
              <PayerRow
                name="Medicare Part B"
                clean="96%"
                pay="22d"
                denial="2%"
                badge="Normal"
                badgeClassName="border-slate-200 bg-slate-100 text-slate-700"
              />
            </div>
          </PanelCard>

          <PanelCard title="Provider Experience">
            <ProviderRow name="Dr. Chen" note="Unsigned notes at 3 closeouts" />
            <ProviderRow name="Dr. Singh" note="Finalization lag > 24 hrs for 3 weeks" />
            <ProviderRow name="Dr. Sia" note="Finalization lag > 24 hrs for 3 weeks" />
          </PanelCard>
        </div>

        <PanelCard title="Anomaly Detected">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <p className="font-[Inter,sans-serif] text-[14px] font-semibold leading-5 text-[var(--ds-text-primary)]">
              Aetna PPO
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-[10px] border-[rgba(0,9,50,0.12)] font-[Inter,sans-serif] text-[13px] font-semibold"
              >
                Open Trend
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-[10px] border-[rgba(0,9,50,0.12)] font-[Inter,sans-serif] text-[13px] font-semibold"
              >
                Notify Clinic Director
              </Button>
            </div>
          </div>
          <div className="mt-3 space-y-1 font-[Inter,sans-serif] text-[14px] font-normal leading-[22px] text-slate-600">
            <p>Pattern present for 3 consecutive weeks.</p>
            <p>Unsigned notes recurring for 2 providers at Location 2.</p>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
