import type { ReactNode } from 'react';
import { CalendarDays, ChevronRight, MoreVertical } from 'lucide-react';
import type { LandingOnlyMomentId } from '../momentLandings';
import { Moment4SpatialRightPane } from './moment4/Moment4SpatialRightPane';
import { Moment5SpatialRightPane } from './moment5/Moment5SpatialRightPane';
import { Moment10SpatialRightPane } from './moment10/Moment10SpatialRightPane';

function ViewAllLink() {
  return (
    <button
      type="button"
      className="text-[12px] font-semibold text-[#4E37F6] transition hover:text-[#4338ca]"
    >
      View all
    </button>
  );
}

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

function SectionShell({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <section className="rounded-[12px] border border-[rgba(0,9,50,0.12)] bg-white p-4 shadow-sm">
      <header className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold leading-snug text-[#020617]">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-[12px] font-medium text-[#64748b]">{subtitle}</p> : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {right ?? (
            <>
              <ViewAllLink />
              <CardMenu />
            </>
          )}
        </div>
      </header>
      {children}
    </section>
  );
}

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[rgba(0,9,50,0.08)] bg-[#f8fafc] px-3 py-2.5">
      <p className="text-[11px] font-medium text-[#64748b]">{label}</p>
      <p className="mt-0.5 text-[18px] font-semibold tabular-nums text-[#020617]">{value}</p>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2">
      <div className="mb-1 flex justify-between text-[12px]">
        <span className="font-medium text-[#64748b]">{label}</span>
        <span className="font-semibold text-[#020617]">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
        <div
          className="h-full rounded-full bg-[#4E37F6]"
          style={{ width: value.replace(/%/g, '') + '%' }}
        />
      </div>
    </div>
  );
}

/**
 * Right-column operations dashboard (moment12) — built as semantic HTML + Tailwind
 * to match the design; not a screenshot embed.
 */
function OperationsDashboard() {
  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-4 pb-10 font-['Inter',sans-serif]">
      <SectionShell title="Today · Cascade PT">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCell label="Visits" value="216" />
          <MetricCell label="Providers" value="18" />
          <MetricCell label="Utilization" value="82%" />
          <MetricCell label="Open slots" value="12" />
        </div>
        <ProgressRow label="Doc completion" value="74%" />
        <ProgressRow label="Notes on-time" value="68%" />
      </SectionShell>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionShell title="Locations & Providers">
          <ul className="space-y-3">
            <li className="rounded-lg border border-[rgba(0,9,50,0.08)] bg-[#f8fafc] p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-[#020617]">Location 1 · Downtown</p>
                  <p className="mt-1 text-[12px] text-[#64748b]">108 visits · 9 providers</p>
                  <p className="mt-2 text-[11px] font-medium text-[#64748b]">
                    Utilization <span className="font-semibold text-[#020617]">84%</span>
                    <span className="mx-1.5 text-[#cbd5e1]">·</span>
                    Doc <span className="font-semibold text-[#020617]">78%</span>
                    <span className="mx-1.5 text-[#cbd5e1]">·</span>
                    On-time <span className="font-semibold text-[#020617]">72%</span>
                  </p>
                </div>
                <ChevronRight className="mt-0.5 size-4 shrink-0 text-[#94a3b8]" strokeWidth={2} aria-hidden />
              </div>
            </li>
            <li className="rounded-lg border border-[rgba(0,9,50,0.08)] bg-[#f8fafc] p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-[#020617]">Location 2 · Westside</p>
                  <p className="mt-1 text-[12px] text-[#64748b]">108 visits · 9 providers</p>
                  <p className="mt-2 text-[11px] font-medium text-[#64748b]">
                    Utilization <span className="font-semibold text-[#020617]">80%</span>
                    <span className="mx-1.5 text-[#cbd5e1]">·</span>
                    Doc <span className="font-semibold text-[#020617]">70%</span>
                    <span className="mx-1.5 text-[#cbd5e1]">·</span>
                    On-time <span className="font-semibold text-[#020617]">64%</span>
                  </p>
                  <p className="mt-2 text-[11px] font-semibold text-red-600">Doc completion ↓ 3 weeks</p>
                </div>
                <ChevronRight className="mt-0.5 size-4 shrink-0 text-[#94a3b8]" strokeWidth={2} aria-hidden />
              </div>
            </li>
          </ul>
        </SectionShell>

        <SectionShell title="Provider Experience">
          <ul className="space-y-2 text-[13px]">
            {[
              ['Dr. Chen', 'Unsigned notes at 3 closeouts'],
              ['Dr. Singh', 'Finalization lag > 24 hrs for 3 weeks'],
              ['Dr. Sia', 'On track'],
            ].map(([name, note]) => (
              <li
                key={name}
                className="flex items-center justify-between gap-2 rounded-lg border border-[rgba(0,9,50,0.08)] bg-[#f8fafc] px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-[#020617]">{name}</p>
                  <p className="text-[12px] text-[#64748b]">{note}</p>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg border border-[rgba(0,9,50,0.12)] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#020617]"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </SectionShell>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionShell title="Payer Performance">
          <ul className="space-y-2">
            {[
              ['Aetna PPO', 'Healthy', 'bg-emerald-50 text-emerald-800', '94%', '12d', '3%'],
              ['BCBS PPO', 'Normal', 'bg-slate-100 text-slate-700', '89%', '18d', '6%'],
              ['Medicare Part B', 'Normal', 'bg-slate-100 text-slate-700', '96%', '22d', '2%'],
            ].map(([payer, badge, badgeCls, clean, pay, denial]) => (
              <li
                key={payer}
                className="rounded-lg border border-[rgba(0,9,50,0.08)] bg-[#f8fafc] px-3 py-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[14px] font-semibold text-[#020617]">{payer}</span>
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeCls}`}>
                    {badge}
                  </span>
                </div>
                <p className="mt-2 text-[11px] font-medium text-[#64748b]">
                  Clean <span className="font-semibold text-[#020617]">{clean}</span>
                  <span className="mx-1.5 text-[#cbd5e1]">·</span>
                  Pay <span className="font-semibold text-[#020617]">{pay}</span>
                  <span className="mx-1.5 text-[#cbd5e1]">·</span>
                  Denial <span className="font-semibold text-[#020617]">{denial}</span>
                </p>
              </li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell title="Claims Overview">
          <div className="grid grid-cols-2 gap-2">
            {[
              ['Submitted', '142'],
              ['Adjudication', '68'],
              ['Pending', '31'],
              ['Attention', '6'],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`rounded-lg border px-3 py-2.5 ${i === 3 ? 'border-red-200 bg-red-50' : 'border-[rgba(0,9,50,0.08)] bg-[#f8fafc]'}`}
              >
                <p className="text-[11px] font-medium text-[#64748b]">{k}</p>
                <p className={`text-[16px] font-semibold ${i === 3 ? 'text-red-700' : 'text-[#020617]'}`}>{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-[#64748b]">
            Avg velocity (14 days) · Denial rate (90d){' '}
            <span className="font-semibold text-emerald-600">4.2%</span>
          </p>
        </SectionShell>
      </div>

      <SectionShell title="Anomaly Detected">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-[#020617]">Aetna PPO</p>
            <p className="mt-1 text-[14px] leading-relaxed text-[#334155]">
              Pattern present for 3 consecutive weeks. Unsigned notes recurring for 2 providers at Location 2.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
            <button
              type="button"
              className="rounded-[10px] bg-[#4E37F6] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#4338ca]"
            >
              Open Trend
            </button>
            <button
              type="button"
              className="rounded-[10px] border border-[rgba(0,9,50,0.14)] bg-white px-4 py-2 text-[13px] font-semibold text-[#020617] shadow-sm transition hover:bg-[#f8fafc]"
            >
              Notify Clinic Director
            </button>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}

function StatusBadge({ children, tone }: { children: ReactNode; tone: 'green' | 'amber' | 'blue' }) {
  const cls =
    tone === 'green'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : tone === 'amber'
        ? 'bg-amber-50 text-amber-900 border-amber-200'
        : 'bg-sky-50 text-sky-800 border-sky-200';
  return (
    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${cls}`}>
      {children}
    </span>
  );
}

function DailyScheduleLanding({
  bottomCards,
  cardTone,
}: {
  bottomCards: { title: string; subtitle: string }[];
  cardTone: 'slate' | 'sky';
}) {
  const leftCol = [
    { time: '8:00', name: 'Sarah Mitchell', type: 'New patient', status: 'Checked In' as const, tone: 'green' as const },
    { time: '8:30', name: 'Carlos Torres', type: 'Follow-up', status: 'Checked In' as const, tone: 'green' as const },
    { time: '9:00', name: 'Priya Ramachandran', type: 'Urgent', status: 'Waiting' as const, tone: 'amber' as const },
    { time: '9:30', name: 'David Park', type: 'Follow-up', status: 'Incoming' as const, tone: 'blue' as const },
  ];
  const rightCol = [
    { time: '10:00', name: 'Isabel Nguyen', type: 'Follow-up', status: 'Incoming' as const, tone: 'blue' as const },
    { time: '10:30', name: 'Aerin Kyle', type: 'New patient', status: 'Incoming' as const, tone: 'blue' as const },
    { time: '11:00', name: 'Marcus Webb', type: 'Follow-up', status: 'Incoming' as const, tone: 'blue' as const },
    { time: '11:30', name: 'Lin Chen', type: 'Follow-up', status: 'Incoming' as const, tone: 'blue' as const },
  ];

  const cardBg = cardTone === 'sky' ? 'bg-sky-50/80 border-sky-100' : 'bg-[#f1f5f9] border-[rgba(0,9,50,0.08)]';

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-4 pb-10 font-['Inter',sans-serif]">
      <section className="rounded-[12px] border border-[rgba(0,9,50,0.12)] bg-white shadow-sm">
        <div className="flex items-start justify-between border-b border-[rgba(0,9,50,0.08)] px-4 py-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff] text-[#4E37F6]">
              <CalendarDays className="size-4" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#020617]">Daily Schedule</h3>
              <p className="text-[12px] font-medium text-[#64748b]">11 items to attend</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
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
        <div className="grid gap-0 p-4 md:grid-cols-2 md:gap-4">
          <ul className="space-y-0 divide-y divide-[rgba(0,9,50,0.06)]">
            {leftCol.map((row, idx) => (
              <li key={row.time} className="relative py-3 pl-3">
                {idx === 1 ? (
                  <div
                    className="absolute left-0 top-0 z-[1] flex w-full items-center"
                    aria-hidden
                  >
                    <span className="size-2 shrink-0 rounded-full bg-red-500" />
                    <span className="h-px min-w-0 flex-1 bg-red-500/90" />
                  </div>
                ) : null}
                <p className="text-[12px] font-semibold text-[#64748b]">{row.time}</p>
                <p className="text-[14px] font-semibold text-[#020617]">{row.name}</p>
                <p className="text-[12px] text-[#64748b]">{row.type}</p>
                <div className="mt-1.5">
                  <StatusBadge tone={row.tone}>{row.status}</StatusBadge>
                </div>
              </li>
            ))}
          </ul>
          <ul className="space-y-0 divide-y divide-[rgba(0,9,50,0.06)] md:border-l md:border-[rgba(0,9,50,0.06)] md:pl-4">
            {rightCol.map((row) => (
              <li key={row.time} className="py-3">
                <p className="text-[12px] font-semibold text-[#64748b]">{row.time}</p>
                <p className="text-[14px] font-semibold text-[#020617]">{row.name}</p>
                <p className="text-[12px] text-[#64748b]">{row.type}</p>
                <div className="mt-1.5">
                  <StatusBadge tone={row.tone}>{row.status}</StatusBadge>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end border-t border-[rgba(0,9,50,0.08)] px-4 py-2">
          <button type="button" className="text-[12px] font-semibold text-[#4E37F6] hover:underline">
            View full schedule →
          </button>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {bottomCards.map((c) => (
          <div
            key={c.title}
            className={`flex min-h-[120px] flex-col items-center justify-center rounded-[12px] border p-4 text-center ${cardBg}`}
          >
            <p className="text-[14px] font-semibold text-[#020617]">{c.title}</p>
            <p className="mt-1 text-[12px] font-medium text-[#64748b]">{c.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SoapNotesLanding() {
  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[900px] flex-col gap-3 overflow-y-auto pb-8 font-['Inter',sans-serif]">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[20px] font-semibold text-[#020617]">SOAP Notes</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-[rgba(0,9,50,0.14)] bg-white px-3 py-2 text-[12px] font-semibold text-[#020617] shadow-sm"
          >
            Save Draft
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#4E37F6] px-3 py-2 text-[12px] font-semibold text-white shadow-sm"
          >
            Review &amp; Finalise →
          </button>
        </div>
      </header>

      <section className="rounded-[12px] border border-[rgba(0,9,50,0.12)] bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="size-14 shrink-0 overflow-hidden rounded-full bg-slate-200" />
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-semibold text-[#020617]">Diane M</p>
            <p className="text-[13px] text-[#64748b]">Age: 58 · Female · April 21, 1968</p>
            <button type="button" className="mt-1 text-[12px] font-semibold text-[#4E37F6] hover:underline">
              View Referral Document →
            </button>
            <p className="mt-3 text-[12px] text-[#64748b]">
              Visit: 1 of 12 — Initial Evaluation — Week 0 · Payer: Medicare Part B
            </p>
            <div className="mt-3 space-y-2 text-[12px] leading-snug text-[#334155]">
              <p>
                <span className="font-semibold text-[#020617]">Primary Diagnosis</span> M75.11 — Complete rotator cuff
                tear, right shoulder
              </p>
              <p>
                <span className="font-semibold text-[#020617]">Secondary Diagnosis</span> M79.621 — Pain in right upper
                arm
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-0 flex-1 gap-2">
        <div className="min-h-[480px] min-w-0 flex-1 rounded-[12px] border border-[rgba(0,9,50,0.12)] bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 border-b border-[rgba(0,9,50,0.08)] pb-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#4E37F6] text-[12px] font-bold text-white">
              S
            </span>
            <h3 className="text-[15px] font-semibold text-[#020617]">Subjective</h3>
            <span className="ml-auto rounded-lg border border-[rgba(0,9,50,0.12)] bg-[#f8fafc] px-2 py-1 text-[11px] font-semibold text-[#64748b]">
              3 items
            </span>
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-[#64748b]">AI Suggestions</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {['Grip Strength', 'Sleep Position', 'Pain Medication Use', 'Radiation Pattern'].map((t) => (
              <button
                key={t}
                type="button"
                className="rounded-full border border-[rgba(0,9,50,0.12)] bg-[#f8fafc] px-3 py-1.5 text-[12px] font-medium text-[#020617]"
              >
                + {t}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-4 text-[13px] leading-relaxed text-[#334155]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#64748b]">Chief complaint</p>
              <p className="mt-1">
                Pain in the right shoulder and inability to move hand for overhead activities.
                <span className="ml-2 rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-orange-800">
                  INTAKE
                </span>
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#64748b]">History of present condition</p>
              <p className="mt-1 rounded-md bg-yellow-50/80 p-2">
                Following surgery, the patient reports incomplete recovery of shoulder function and difficulty with
                overhead reach.
              </p>
            </div>
          </div>
        </div>
        <nav
          className="flex w-10 shrink-0 flex-col items-center gap-2 rounded-[12px] border border-[rgba(0,9,50,0.08)] bg-white py-3 text-[10px] font-bold text-[#64748b] shadow-sm"
          aria-label="SOAP sections"
        >
          {['S', 'O', 'I', 'H', 'A', 'P', 'C'].map((l, i) => (
            <span
              key={l}
              className={`flex size-7 items-center justify-center rounded-full ${i === 0 ? 'bg-[#4E37F6] text-white' : 'bg-[#f1f5f9]'}`}
            >
              {l}
            </span>
          ))}
        </nav>
      </section>
    </div>
  );
}

function EmptyFocusedLanding() {
  return (
    <div
      className="flex h-full min-h-[400px] flex-1 items-center justify-center font-['Inter',sans-serif] text-[14px] text-[#94a3b8]"
      data-name="MomentEmptyRight"
    >
      Workspace canvas
    </div>
  );
}

const defaultKpis = [
  { title: 'Clinic Health', subtitle: 'XXX Items' },
  { title: 'Referral Queue', subtitle: 'XXX Items' },
  { title: 'Appointment Risk', subtitle: 'XXX Items' },
  { title: 'Payment Collection', subtitle: 'XXX Items' },
];

const riskKpis = [
  { title: 'Clinic Health', subtitle: 'XXX Items' },
  { title: 'Referral Queue', subtitle: 'XXX Items' },
  { title: 'No-show Risk', subtitle: 'XXX Items' },
  { title: 'Payment Collection', subtitle: 'XXX Items' },
];

const messagesKpis = [
  { title: 'Messages', subtitle: 'XXX Items' },
  { title: 'No Show Risk', subtitle: 'High Cancellation Risk · XXX Items' },
  { title: 'Incomplete Notes', subtitle: 'XXX Items' },
  { title: 'Co-Signatures Pending', subtitle: 'XXX Items' },
];

export function MomentLandingSurface({ momentId }: { momentId: LandingOnlyMomentId }) {
  switch (momentId) {
    case 'moment4':
      return <Moment4SpatialRightPane />;
    case 'moment5':
      return <Moment5SpatialRightPane />;
    case 'moment12':
      return <OperationsDashboard />;
    case 'moment6':
    case 'moment7':
      return <DailyScheduleLanding bottomCards={defaultKpis} cardTone="slate" />;
    case 'moment8':
      return <DailyScheduleLanding bottomCards={riskKpis} cardTone="slate" />;
    case 'moment9':
      return <DailyScheduleLanding bottomCards={messagesKpis} cardTone="sky" />;
    case 'moment10':
      return <Moment10SpatialRightPane />;
    case 'moment11':
      return <SoapNotesLanding />;
    case 'moment13':
      return <EmptyFocusedLanding />;
    default: {
      const _e: never = momentId;
      return _e;
    }
  }
}
