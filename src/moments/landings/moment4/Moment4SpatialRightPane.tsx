import type { ReactNode } from 'react';
import { ChevronRight, MoreVertical } from 'lucide-react';

/** Spatial / moment4 right pane — values & structure from `public/landing-moments/Spatial.png` (2684×3272 export). */
const BG = '#F8F9FB';
const CARD = '#ffffff';
const BORDER = 'rgba(0, 9, 50, 0.12)';
const BORDER_SOFT = 'rgba(0, 9, 50, 0.08)';
const TEXT = '#020617';
const MUTED = '#64748b';
const LINK = '#4E37F6';
const ALERT = '#9A3412';

function CardChrome({
  title,
  children,
  headerRight,
}: {
  title: string;
  children: ReactNode;
  headerRight?: ReactNode;
}) {
  return (
    <section
      className="rounded-[12px] border border-solid bg-white shadow-[0px_1px_2px_rgba(15,23,42,0.04)]"
      style={{ borderColor: BORDER, backgroundColor: CARD }}
    >
      <header className="flex items-start justify-between gap-3 border-b border-solid px-4 pb-3 pt-4" style={{ borderColor: BORDER_SOFT }}>
        <h2 className="font-['Inter',sans-serif] text-[15px] font-semibold leading-5 tracking-[-0.01em]" style={{ color: TEXT }}>
          {title}
        </h2>
        {headerRight ?? (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="font-['Inter',sans-serif] text-[12px] font-semibold leading-none transition hover:opacity-80"
              style={{ color: LINK }}
            >
              View all
            </button>
            <button type="button" className="rounded-[12px] border border-solid p-1 text-[#94a3b8] transition hover:bg-[#f1f5f9]" aria-label="More options">
              <MoreVertical className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </header>
      <div className="px-4 pb-4 pt-3">{children}</div>
    </section>
  );
}

function CardChromeTitleOnly({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      className="rounded-[12px] border border-solid bg-white shadow-[0px_1px_2px_rgba(15,23,42,0.04)]"
      style={{ borderColor: BORDER, backgroundColor: CARD }}
    >
      <header className="flex items-center justify-between gap-3 border-b border-solid px-4 pb-3 pt-4" style={{ borderColor: BORDER_SOFT }}>
        <h2 className="font-['Inter',sans-serif] text-[15px] font-semibold leading-5 tracking-[-0.01em]" style={{ color: TEXT }}>
          {title}
        </h2>
        <button type="button" className="rounded-[12px] border border-solid p-1 text-[#94a3b8] transition hover:bg-[#f1f5f9]" aria-label="More options">
          <MoreVertical className="size-4" strokeWidth={1.5} />
        </button>
      </header>
      <div className="px-4 pb-4 pt-3">{children}</div>
    </section>
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
          className="rounded-[10px] border border-solid px-3 py-3"
          style={{ borderColor: BORDER_SOFT, backgroundColor: '#F8FAFC' }}
        >
          <p className="font-['Inter',sans-serif] text-[11px] font-medium leading-4" style={{ color: MUTED }}>
            {c.label}
          </p>
          <p className="mt-1 font-['Inter',sans-serif] text-[20px] font-semibold tabular-nums leading-7 tracking-[-0.02em]" style={{ color: TEXT }}>
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
    <div className="mt-3 border-t border-solid" style={{ borderColor: BORDER_SOFT }}>
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`flex items-center justify-between py-[10px] font-['Inter',sans-serif] text-[12px] leading-4 ${i > 0 ? 'border-t border-solid' : ''}`}
          style={{ borderColor: BORDER_SOFT }}
        >
          <span style={{ color: MUTED }}>{r.label}</span>
          <span className="font-semibold tabular-nums" style={{ color: TEXT }}>
            {r.value}
          </span>
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
          <p className="font-['Inter',sans-serif] text-[14px] font-semibold leading-5" style={{ color: TEXT }}>
            {title}
          </p>
          <p className="mt-1 font-['Inter',sans-serif] text-[12px] font-normal leading-4" style={{ color: MUTED }}>
            {visitsLine}
          </p>
          <div
            className="mt-3 inline-flex max-w-full flex-wrap items-center gap-x-1 rounded-[10px] border border-solid px-3 py-2 font-['Inter',sans-serif] text-[11px] font-medium leading-4"
            style={{ borderColor: BORDER_SOFT, backgroundColor: '#F1F5F9', color: MUTED }}
          >
            {utilLine}
          </div>
          {alert ? (
            <p className="mt-2 font-['Inter',sans-serif] text-[11px] font-semibold leading-4" style={{ color: ALERT }}>
              {alert}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="flex size-8 shrink-0 items-center justify-center rounded-[8px] border border-solid bg-white transition hover:bg-[#f8fafc]"
          style={{ borderColor: BORDER_SOFT }}
          aria-label="Open location"
        >
          <ChevronRight className="size-4 text-[#94a3b8]" strokeWidth={2} />
        </button>
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
  badgeStyle,
}: {
  name: string;
  clean: string;
  pay: string;
  denial: string;
  badge: string;
  badgeStyle: { bg: string; text: string; border: string };
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-2 border-t border-solid py-3 first:border-t-0 first:pt-0" style={{ borderColor: BORDER_SOFT }}>
      <div className="min-w-0 flex-1">
        <p className="font-['Inter',sans-serif] text-[14px] font-semibold leading-5" style={{ color: TEXT }}>
          {name}
        </p>
        <p className="mt-1 font-['Inter',sans-serif] text-[11px] font-medium leading-4" style={{ color: MUTED }}>
          Clean <span className="font-semibold text-[#020617]">{clean}</span>
          <span className="mx-1 text-[#cbd5e1]">·</span>
          Pay <span className="font-semibold text-[#020617]">{pay}</span>
          <span className="mx-1 text-[#cbd5e1]">·</span>
          Denial <span className="font-semibold text-[#020617]">{denial}</span>
        </p>
      </div>
      <span
        className="shrink-0 rounded-md border px-2 py-0.5 font-['Inter',sans-serif] text-[10px] font-bold uppercase leading-4 tracking-[0.04em]"
        style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text, borderColor: badgeStyle.border, borderWidth: 1, borderStyle: 'solid' }}
      >
        {badge}
      </span>
    </div>
  );
}

function ProviderRow({ name, note }: { name: string; note: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-solid py-3 first:border-t-0 first:pt-0" style={{ borderColor: BORDER_SOFT }}>
      <div className="min-w-0">
        <p className="font-['Inter',sans-serif] text-[14px] font-semibold leading-5" style={{ color: TEXT }}>
          {name}
        </p>
        <p className="mt-0.5 font-['Inter',sans-serif] text-[12px] font-normal leading-4" style={{ color: MUTED }}>
          {note}
        </p>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-[8px] border border-solid bg-white px-3 py-1.5 font-['Inter',sans-serif] text-[11px] font-semibold leading-4 transition hover:bg-[#f8fafc]"
        style={{ borderColor: BORDER }}
      >
        View
      </button>
    </div>
  );
}

export function Moment4SpatialRightPane() {
  return (
    <div
      className="min-h-full w-full font-['Inter',sans-serif]"
      style={{ backgroundColor: BG }}
      data-name="Moment4SpatialRightPane"
    >
      <div className="mx-auto w-full max-w-[1342px] space-y-4 pb-8 pt-0">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CardChrome title="Today · Cascade PT">
            <MetricQuad />
            <DocNotesRows />
          </CardChrome>

          <CardChromeTitleOnly title="Locations & Providers">
            <div className="divide-y divide-solid" style={{ borderColor: BORDER_SOFT }}>
              <div className="pb-4">
                <LocationBlock
                  title="Location 1 · Downtown"
                  visitsLine="108 visits · 9 providers"
                  utilLine={
                    <>
                      Utilization <span className="font-semibold text-[#020617]">84%</span>
                      <span className="mx-1">·</span>
                      Doc <span className="font-semibold text-[#020617]">78%</span>
                      <span className="mx-1">·</span>
                      On-time <span className="font-semibold text-[#020617]">72%</span>
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
                      Utilization <span className="font-semibold text-[#020617]">80%</span>
                      <span className="mx-1">·</span>
                      Doc <span className="font-semibold text-[#020617]">70%</span>
                      <span className="mx-1">·</span>
                      On-time <span className="font-semibold text-[#020617]">64%</span>
                    </>
                  }
                  alert="Doc completion ↓ 3 weeks"
                />
              </div>
            </div>
          </CardChromeTitleOnly>

          <CardChrome title="Payer Performance">
            <div>
              <PayerRow
                name="Aetna PPO"
                clean="94%"
                pay="12d"
                denial="3%"
                badge="Healthy"
                badgeStyle={{ bg: '#ECFDF5', text: '#166534', border: '#bbf7d0' }}
              />
              <PayerRow
                name="BCBS PPO"
                clean="89%"
                pay="18d"
                denial="6%"
                badge="Normal"
                badgeStyle={{ bg: '#F3F4F6', text: '#475569', border: '#e2e8f0' }}
              />
              <PayerRow
                name="Medicare Part B"
                clean="96%"
                pay="22d"
                denial="2%"
                badge="Normal"
                badgeStyle={{ bg: '#F3F4F6', text: '#475569', border: '#e2e8f0' }}
              />
            </div>
          </CardChrome>

          <CardChrome title="Provider Experience">
            <ProviderRow name="Dr. Chen" note="Unsigned notes at 3 closeouts" />
            <ProviderRow name="Dr. Singh" note="Finalization lag > 24 hrs for 3 weeks" />
            <ProviderRow name="Dr. Sia" note="Finalization lag > 24 hrs for 3 weeks" />
          </CardChrome>
        </div>

        <CardChrome title="Anomaly Detected">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <p className="font-['Inter',sans-serif] text-[14px] font-semibold leading-5" style={{ color: TEXT }}>
              Aetna PPO
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                className="rounded-[10px] border border-solid bg-white px-4 py-2 font-['Inter',sans-serif] text-[13px] font-semibold leading-4 transition hover:bg-[#f8fafc]"
                style={{ borderColor: BORDER }}
              >
                Open Trend
              </button>
              <button
                type="button"
                className="rounded-[10px] border border-solid bg-white px-4 py-2 font-['Inter',sans-serif] text-[13px] font-semibold leading-4 transition hover:bg-[#f8fafc]"
                style={{ borderColor: BORDER }}
              >
                Notify Clinic Director
              </button>
            </div>
          </div>
          <div className="mt-3 space-y-1 font-['Inter',sans-serif] text-[14px] font-normal leading-[22px]" style={{ color: '#334155' }}>
            <p>Pattern present for 3 consecutive weeks.</p>
            <p>Unsigned notes recurring for 2 providers at Location 2.</p>
          </div>
        </CardChrome>
      </div>
    </div>
  );
}
