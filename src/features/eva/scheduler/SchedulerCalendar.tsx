import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  CALENDAR_APPOINTMENTS,
  CALENDAR_RANGE_MIN,
  NOW_FROM_7_MIN,
  SCHEDULER_DOCTORS,
  type AppointmentTone,
  type CalendarAppointment,
} from './schedulerCalendarData';

const COL_HEIGHT_PX = 312;

const toneStyles: Record<
  AppointmentTone,
  { bar: string; bg: string; tagValidated: string; tagMuted: string }
> = {
  validated: {
    bar: 'bg-emerald-500',
    bg: 'bg-emerald-50/95',
    tagValidated: 'text-emerald-700',
    tagMuted: 'text-slate-500',
  },
  copay: {
    bar: 'bg-amber-400',
    bg: 'bg-amber-50/95',
    tagValidated: 'text-amber-800',
    tagMuted: 'text-slate-500',
  },
  evaluation: {
    bar: 'bg-indigo-500',
    bg: 'bg-indigo-50/95',
    tagValidated: 'text-indigo-800',
    tagMuted: 'text-slate-500',
  },
  overdue: {
    bar: 'bg-red-500',
    bg: 'bg-red-50/95',
    tagValidated: 'text-red-800',
    tagMuted: 'text-slate-500',
  },
};

function AppointmentBlock({ appt }: { appt: CalendarAppointment }) {
  const topPct = (appt.startFrom7 / CALENDAR_RANGE_MIN) * 100;
  const heightPct = (appt.durationMin / CALENDAR_RANGE_MIN) * 100;
  const t = toneStyles[appt.tone];

  return (
    <div
      className={`pointer-events-none absolute left-[3px] right-[3px] overflow-hidden rounded-md border border-[rgba(0,9,50,0.08)] shadow-sm ${t.bg}`}
      style={{ top: `${topPct}%`, height: `${Math.max(heightPct, 11)}%` }}
    >
      <div className={`absolute left-0 top-0 h-full w-[3px] ${t.bar}`} />
      <div className="pl-2.5 pr-1 pt-1">
        <div className="text-[11px] font-semibold leading-tight text-slate-900">{appt.patient}</div>
        <div className="mt-0.5 text-[9px] font-medium text-slate-500">{appt.visitType}</div>
        <div className="mt-1 flex flex-wrap gap-1">
          {appt.tags.map((tag) => {
            const isVal = tag === 'Validated';
            const cls = isVal ? t.tagValidated : t.tagMuted;
            return (
              <span key={tag} className={`text-[8px] font-semibold uppercase tracking-wide ${cls}`}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const HOUR_LABELS = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];

export function SchedulerCalendar() {
  const nowLinePct = (NOW_FROM_7_MIN / CALENDAR_RANGE_MIN) * 100;

  return (
    <section
      className="overflow-hidden rounded-xl border border-[rgba(0,9,50,0.12)] bg-white shadow-[0_1px_3px_rgba(0,9,50,0.06)]"
      data-name="SchedulerCalendar"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(0,9,50,0.08)] px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
            aria-label="Previous"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-[15px] font-semibold tracking-tight text-slate-900">April 2026</span>
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
            aria-label="Next"
          >
            <ChevronRight className="size-4" />
          </button>
          <button
            type="button"
            className="ml-1 rounded-lg border border-[rgba(0,9,50,0.12)] bg-white px-3 py-1 text-[12px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Today
          </button>
        </div>
        <div className="flex rounded-lg border border-[rgba(0,9,50,0.1)] bg-slate-50/90 p-0.5">
          {(['Day', 'Week', 'Month', 'Year'] as const).map((v, i) => (
            <button
              key={v}
              type="button"
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${
                i === 0 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-[600px]">
          {/* Time labels */}
          <div className="w-[52px] shrink-0 border-r border-[rgba(0,9,50,0.08)] bg-slate-50/40">
            <div
              className="h-9 border-b border-[rgba(0,9,50,0.08)]"
              aria-hidden
            />
            {HOUR_LABELS.map((label) => (
              <div
                key={label}
                className="flex h-[52px] items-start justify-end border-b border-[rgba(0,9,50,0.05)] pr-2 pt-0.5 text-[10px] font-medium text-slate-400"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Doctor columns */}
          <div className="grid min-w-0 flex-1 grid-cols-3">
            {SCHEDULER_DOCTORS.map((name, docIdx) => (
              <div
                key={name}
                className="border-r border-[rgba(0,9,50,0.08)] last:border-r-0"
                style={{ height: COL_HEIGHT_PX + 36 }}
              >
                <div className="flex h-9 items-center justify-center border-b border-[rgba(0,9,50,0.08)] bg-slate-50/50 px-1 text-center text-[10px] font-semibold leading-tight text-slate-800">
                  {name}
                </div>
                <div className="relative bg-white" style={{ height: COL_HEIGHT_PX }}>
                  {HOUR_LABELS.map((_, h) => (
                    <div
                      key={h}
                      className="pointer-events-none absolute left-0 right-0 border-t border-slate-100"
                      style={{ top: `${(h / HOUR_LABELS.length) * 100}%` }}
                    />
                  ))}
                  {/* Current time */}
                  <div
                    className="pointer-events-none absolute left-0 right-0 z-20 flex items-center"
                    style={{ top: `${nowLinePct}%` }}
                  >
                    <div className="h-[2px] flex-1 rounded-full bg-violet-500 shadow-sm" />
                    <span className="ml-1 shrink-0 rounded bg-violet-500 px-1.5 py-0.5 text-[9px] font-bold leading-none text-white shadow-sm">
                      07:47 AM
                    </span>
                  </div>
                  {CALENDAR_APPOINTMENTS.filter((a) => a.doctorIndex === docIdx).map((a) => (
                    <AppointmentBlock key={a.id} appt={a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
