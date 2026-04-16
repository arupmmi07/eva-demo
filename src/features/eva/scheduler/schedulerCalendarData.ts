/** Day grid for Cascade scheduler (April 2026 storyline). */

export const SCHEDULER_DOCTORS = ['Dr. Arushi Kumar', 'Dr. Aris J.', 'Dr. Park'] as const;

export type AppointmentTone = 'validated' | 'copay' | 'evaluation' | 'overdue';

export interface CalendarAppointment {
  id: string;
  /** Minutes from 7:00 AM (0 = 7:00). */
  startFrom7: number;
  durationMin: number;
  doctorIndex: 0 | 1 | 2;
  patient: string;
  visitType: string;
  tags: string[];
  tone: AppointmentTone;
}

/** Visible window: 7:00 AM – 12:30 PM (330 min). */
export const CALENDAR_RANGE_MIN = 330;

/** Current time marker (07:47). */
export const NOW_FROM_7_MIN = 47;

export const CALENDAR_APPOINTMENTS: CalendarAppointment[] = [
  {
    id: 'a1',
    startFrom7: 60,
    durationMin: 45,
    doctorIndex: 0,
    patient: 'Anna Brooks',
    visitType: 'Follow-Up',
    tags: ['Validated'],
    tone: 'validated',
  },
  {
    id: 'a2',
    startFrom7: 30,
    durationMin: 50,
    doctorIndex: 1,
    patient: 'Carlos Vega',
    visitType: 'Follow-Up',
    tags: ['Co-Pay Due'],
    tone: 'copay',
  },
  {
    id: 'a3',
    startFrom7: 75,
    durationMin: 55,
    doctorIndex: 2,
    patient: 'Sarah Miller',
    visitType: 'Evaluation',
    tags: ['Evaluation', 'Validated'],
    tone: 'evaluation',
  },
  {
    id: 'a4',
    startFrom7: 120,
    durationMin: 40,
    doctorIndex: 0,
    patient: 'Sasha Kyle',
    visitType: 'Follow-Up',
    tags: ['Validated'],
    tone: 'validated',
  },
  {
    id: 'a5',
    startFrom7: 105,
    durationMin: 45,
    doctorIndex: 1,
    patient: 'Sophia Lewis',
    visitType: 'Follow-Up',
    tags: ['Co-Pay Due'],
    tone: 'copay',
  },
  {
    id: 'a6',
    startFrom7: 150,
    durationMin: 50,
    doctorIndex: 2,
    patient: 'Ethan Hall',
    visitType: 'Follow-Up',
    tags: ['Co-Pay Due', 'Evaluation'],
    tone: 'copay',
  },
  {
    id: 'a7',
    startFrom7: 180,
    durationMin: 45,
    doctorIndex: 0,
    patient: 'Isabella Clark',
    visitType: 'Follow-Up',
    tags: ['Co-Pay Due'],
    tone: 'copay',
  },
  {
    id: 'a8',
    startFrom7: 165,
    durationMin: 40,
    doctorIndex: 1,
    patient: 'James Martin',
    visitType: 'Evaluation',
    tags: ['Evaluation'],
    tone: 'evaluation',
  },
  {
    id: 'a9',
    startFrom7: 200,
    durationMin: 50,
    doctorIndex: 2,
    patient: 'Liam Johnson',
    visitType: 'Follow-Up',
    tags: ['Validated'],
    tone: 'validated',
  },
  {
    id: 'a10',
    startFrom7: 225,
    durationMin: 50,
    doctorIndex: 1,
    patient: 'Aiden Lee',
    visitType: 'Follow-Up',
    tags: ['Overdue Balance'],
    tone: 'overdue',
  },
];
