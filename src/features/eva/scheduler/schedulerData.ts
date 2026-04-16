export type UnconfirmedId = 'angela' | 'maria' | 'sam';

export interface UnconfirmedPatient {
  id: UnconfirmedId;
  name: string;
  time: string;
  doctor: string;
  visitType: string;
  remindersLabel: string;
}

export const UNCONFIRMED_PATIENTS: UnconfirmedPatient[] = [
  {
    id: 'angela',
    name: 'Angela Wu',
    time: '10:00 AM',
    doctor: 'Dr. Kumar',
    visitType: 'Follow-up',
    remindersLabel: '2 of 3 reminders sent',
  },
  {
    id: 'maria',
    name: 'Maria Santos',
    time: '1:00 PM',
    doctor: 'Dr. Aris',
    visitType: 'Initial Eval',
    remindersLabel: '3 of 3 reminders sent',
  },
  {
    id: 'sam',
    name: 'Sam Greene',
    time: '2:30 PM',
    doctor: 'Dr. Aris',
    visitType: 'Follow-up',
    remindersLabel: '1 of 3 reminders sent',
  },
];

export interface PotentialNoShowPatient {
  id: string;
  name: string;
  risk: string;
  time: string;
  doctor: string;
  detail: string;
  /** Optional; used when rendering sc1-style chat lines (`Name · type | time · doctor`). */
  visitType?: string;
}

export const POTENTIAL_NO_SHOWS_SEED: PotentialNoShowPatient[] = [
  {
    id: 'isabella',
    name: 'Isabella Clark',
    risk: 'High Risk',
    time: '11:00 AM',
    doctor: 'Dr. Kumar',
    detail: 'Missed last 2 appointments',
  },
  {
    id: 'james',
    name: 'James Martinez',
    risk: 'Moderate',
    time: '3:00 PM',
    doctor: 'Dr. Park',
    detail: 'No confirmation response',
  },
  {
    id: 'maria-ns',
    name: 'Maria Santos',
    risk: 'Moderate',
    time: '1:00 PM',
    doctor: 'Dr. Aris',
    detail: 'No confirmation response',
  },
  {
    id: 'aiden',
    name: 'Aiden Lee',
    risk: 'Moderate',
    time: '4:30 PM',
    doctor: 'Dr. Kumar',
    detail: 'Outstanding balance reminder',
  },
];

/**
 * Left-chat “Potential No-Shows” preview row — matches new-design sc1
 * (`D. Martinez · Follow up | 4:00 PM · Dr. Kumar`).
 */
export const CHAT_POTENTIAL_NOSHOW_SC1: PotentialNoShowPatient = {
  id: 'd-martinez-chat',
  name: 'D. Martinez',
  risk: 'High Risk',
  time: '4:00 PM',
  doctor: 'Dr. Kumar',
  detail: 'Likely no-show',
  visitType: 'Follow-up',
};

/** Visit labels as shown in sc1 chat cards (e.g. “Follow up”, “Initial Evaluation”). */
export function chatVisitTypeLabel(visitType: string): string {
  const v = visitType.trim();
  if (v === 'Follow-up' || v === 'Follow-Up') return 'Follow up';
  if (v === 'Initial Eval') return 'Initial Evaluation';
  return v;
}

export interface TodayPatientRow {
  id: string;
  name: string;
  time: string;
  doctor: string;
  visitType: string;
}

export const TODAY_PATIENTS: TodayPatientRow[] = [
  { id: 'p1', name: 'Diane M', time: '9:00 AM', doctor: 'Dr. Kumar', visitType: 'Initial Eval' },
  { id: 'p2', name: 'Anna Brooks', time: '9:30 AM', doctor: 'Dr. Kumar', visitType: 'Follow-Up' },
  { id: 'p3', name: 'Carlos Vega', time: '10:15 AM', doctor: 'Dr. Aris', visitType: 'Follow-Up' },
];

export interface ScheduleChangeRow {
  id: string;
  title: string;
  subtitle: string;
  status: 'cancellation' | 'filled';
  meta?: string;
}

export interface UnansweredThreadRow {
  id: string;
  patient: string;
  preview: string;
  timeLabel: string;
}

/** Demo threads; KPI count = this array’s length. */
export const UNANSWERED_THREADS: UnansweredThreadRow[] = [
  {
    id: 'um1',
    patient: 'Jordan Ellis',
    preview: 'Can I move my Tuesday PT to Thursday?',
    timeLabel: '18m ago',
  },
  {
    id: 'um2',
    patient: 'Priya Nair',
    preview: 'Insurance card updated — need confirmation before visit.',
    timeLabel: '1h ago',
  },
  {
    id: 'um3',
    patient: 'Leo Han',
    preview: 'Post-op brace rubbing — is that normal?',
    timeLabel: '3h ago',
  },
  {
    id: 'um4',
    patient: 'Morgan Tate',
    preview: 'Running late by 15 min for 2:00 — still OK?',
    timeLabel: 'Yesterday',
  },
];

export interface OutstandingCopayRow {
  id: string;
  patient: string;
  amount: string;
  daysPast: number;
}

/** Demo accounts; KPI count = this array’s length. */
export const OUTSTANDING_COPAYS: OutstandingCopayRow[] = [
  { id: 'cp1', patient: 'Diane M', amount: '$45', daysPast: 3 },
  { id: 'cp2', patient: 'Carlos Vega', amount: '$75', daysPast: 5 },
  { id: 'cp3', patient: 'Anna Brooks', amount: '$120', daysPast: 8 },
  { id: 'cp4', patient: 'Riley Chen', amount: '$385', daysPast: 12 },
];

export const SCHEDULE_CHANGES: ScheduleChangeRow[] = [
  {
    id: 'c1',
    title: 'Marcus Rivera Cancelled — Dr. Park',
    subtitle: 'Mon 9:30 AM slot',
    status: 'cancellation',
  },
  {
    id: 'c2',
    title: 'Sarah Miller — Returning Patient',
    subtitle: 'Mon 9:30 AM · Dr. Park',
    status: 'filled',
    meta: 'Smart waitlist filled',
  },
  {
    id: 'c3',
    title: 'Shruti Gupta Cancelled — Dr. Kumar',
    subtitle: 'Mon 2:00 PM slot',
    status: 'cancellation',
  },
  {
    id: 'c4',
    title: 'John Smith — New Patient',
    subtitle: 'Mon 2:00 PM · Dr. Park',
    status: 'filled',
    meta: 'Digital intake in progress',
  },
];
