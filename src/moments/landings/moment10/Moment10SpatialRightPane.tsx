import type { ReactNode } from 'react';
import { MoreVertical } from 'lucide-react';
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
    <Card className="gap-0 overflow-hidden rounded-xl border border-[rgba(0,9,50,0.12)] bg-card shadow-[0px_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-3 border-b border-[rgba(0,9,50,0.08)] px-4 pb-3 pt-4">
        <h2 className="font-[Inter,sans-serif] text-[15px] font-semibold leading-5 tracking-tight text-[var(--ds-text-primary)]">
          {title}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          {showViewAll ? (
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 font-[Inter,sans-serif] text-[12px] font-semibold text-[var(--ds-primary-action)]"
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
          className="min-h-0 rounded-[10px] border border-[rgba(0,9,50,0.08)] bg-slate-50 px-3 py-2.5"
        >
          <p className="mb-1 font-[Inter,sans-serif] text-[11px] font-medium leading-4 text-[var(--ds-text-secondary)]">
            {c.label}
          </p>
          <p className="font-[Inter,sans-serif] text-[clamp(16px,2.8vw,20px)] font-semibold tabular-nums leading-none tracking-tight text-[var(--ds-text-primary)]">
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
    <div className="mt-2 border-t border-[rgba(0,9,50,0.08)]">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={cn(
            'flex items-center justify-between gap-3 px-0 py-2.5 font-[Inter,sans-serif] text-[12px] leading-[18px]',
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
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0 flex-1">
        <p className="font-[Inter,sans-serif] text-[14px] font-semibold leading-5 text-[var(--ds-text-primary)]">
          {title}
        </p>
        <p className="mt-1 font-[Inter,sans-serif] text-[12px] font-normal leading-[18px] text-[var(--ds-text-secondary)]">
          {visitsLine}
        </p>
        <div className="mt-2.5 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1.5 rounded-[10px] border border-[rgba(0,9,50,0.08)] bg-slate-50 px-2.5 py-2 font-[Inter,sans-serif] text-[11px] font-medium leading-4 text-[var(--ds-text-secondary)]">
          {utilLine}
        </div>
        {alert ? (
          <p className="mt-2 font-[Inter,sans-serif] text-[12px] font-semibold leading-4 text-[var(--ds-warning-text)]">
            {alert}
          </p>
        ) : null}
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-9 shrink-0 rounded-[10px] border-[var(--ds-border)] bg-background text-lg leading-none text-muted-foreground"
        aria-label="Open location"
      >
        ›
      </Button>
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
    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[rgba(0,9,50,0.08)] px-1 py-3 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="mb-1 font-[Inter,sans-serif] text-[14px] font-semibold leading-5 text-[var(--ds-text-primary)]">
          {name}
        </p>
        <p className="font-[Inter,sans-serif] text-[11px] font-medium leading-4 text-[var(--ds-text-secondary)]">
          Clean <span className="font-semibold text-[var(--ds-text-primary)]">{clean}</span>
          <span className="mx-1 text-slate-300">·</span>
          Pay <span className="font-semibold text-[var(--ds-text-primary)]">{pay}</span>
          <span className="mx-1 text-slate-300">·</span>
          Denial <span className="font-semibold text-[var(--ds-text-primary)]">{denial}</span>
        </p>
      </div>
      <Badge variant="outline" className={cn('mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-wide', badgeClassName)}>
        {badge}
      </Badge>
    </div>
  );
}

function ClaimStatGrid() {
  const cells = [
    { label: 'Submitted', value: '142', attention: false },
    { label: 'Adjudication', value: '68', attention: false },
    { label: 'Pending', value: '31', attention: false },
    { label: 'Attention', value: '6', attention: true },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 px-0.5 pb-2 pt-0">
      {cells.map((c) => (
        <div
          key={c.label}
          className={cn(
            'min-h-0 rounded-[10px] border px-3 py-2.5',
            c.attention
              ? 'border-red-500/25 bg-[var(--ds-danger-soft-bg)]'
              : 'border-[rgba(0,9,50,0.08)] bg-slate-50',
          )}
        >
          <p
            className={cn(
              'mb-1 font-[Inter,sans-serif] text-[11px] font-medium leading-4',
              c.attention ? 'text-[var(--ds-danger)]' : 'text-[var(--ds-text-secondary)]',
            )}
          >
            {c.label}
          </p>
          <p
            className={cn(
              'font-[Inter,sans-serif] text-[clamp(16px,2.8vw,20px)] font-semibold tabular-nums leading-none tracking-tight',
              c.attention ? 'text-[var(--ds-danger)]' : 'text-[var(--ds-text-primary)]',
            )}
          >
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function ClaimFooterRows() {
  return (
    <div className="border-t border-[rgba(0,9,50,0.08)]">
      <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 font-[Inter,sans-serif] text-[12px] leading-[18px] text-[var(--ds-text-secondary)]">
        <span>Avg velocity</span>
        <span className="font-semibold tabular-nums text-[var(--ds-text-primary)]">14 days</span>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[rgba(0,9,50,0.08)] px-3.5 py-2.5 font-[Inter,sans-serif] text-[12px] leading-[18px] text-[var(--ds-text-secondary)]">
        <span>Denial rate (90d)</span>
        <span className="font-semibold tabular-nums text-[var(--ds-success)]">4.2% ↓</span>
      </div>
    </div>
  );
}

/** Moment10 right pane — Radix UI + Tailwind (`public/moment10` reference); no separate CSS. */
export function Moment10SpatialRightPane() {
  return (
    <div
      className="min-h-full w-full min-w-0 bg-[#f8f9fb] font-[Inter,sans-serif] text-[14px] leading-5 text-[var(--ds-text-primary)] antialiased"
      data-name="Moment10SpatialRightPane"
    >
      <div className="mx-auto w-full max-w-full pb-[clamp(16px,3vw,32px)] pt-0">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6" aria-label="Operations overview">
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
                      <span className="text-slate-300"> · </span>
                      Doc <span className="font-semibold text-[var(--ds-text-primary)]">78%</span>
                      <span className="text-slate-300"> · </span>
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
                      <span className="text-slate-300"> · </span>
                      Doc <span className="font-semibold text-[var(--ds-text-primary)]">70%</span>
                      <span className="text-slate-300"> · </span>
                      On-time <span className="font-semibold text-[var(--ds-text-primary)]">64%</span>
                    </>
                  }
                  alert="Doc completion ↓ 3 weeks"
                />
              </div>
            </div>
          </PanelCard>

          <PanelCard title="Payer Performance">
            <div className="-mx-1">
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

          <PanelCard title="Claims Overview">
            <div className="overflow-hidden rounded-xl border border-[rgba(0,9,50,0.08)] bg-card shadow-[0px_1px_2px_rgba(15,23,42,0.04)]">
              <ClaimStatGrid />
              <ClaimFooterRows />
            </div>
          </PanelCard>
        </section>

        <section className="mt-5 md:mt-[clamp(20px,3vw,32px)]" aria-label="Anomaly">
          <PanelCard title="Anomaly Detected">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-2">
                <h3 className="font-[Inter,sans-serif] text-[14px] font-semibold leading-5 text-[var(--ds-text-primary)]">
                  Aetna PPO
                </h3>
                <p className="font-[Inter,sans-serif] text-[14px] font-normal leading-[22px] text-slate-700">
                  Pattern present for 3 consecutive weeks.
                </p>
                <p className="font-[Inter,sans-serif] text-[14px] font-normal leading-[22px] text-slate-700">
                  Unsigned notes recurring for 2 providers at Location 2.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2.5">
                <Button
                  type="button"
                  className="h-9 min-h-9 rounded-[10px] bg-[var(--ds-primary-action)] px-4 font-[Inter,sans-serif] text-[13px] font-semibold leading-[18px] text-white hover:brightness-[0.95]"
                >
                  Open trend
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 min-h-9 rounded-[10px] border-[var(--ds-border)] bg-background px-4 font-[Inter,sans-serif] text-[13px] font-semibold leading-[18px] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-tertiary)]"
                >
                  Notify clinic director
                </Button>
              </div>
            </div>
          </PanelCard>
        </section>
      </div>
    </div>
  );
}
