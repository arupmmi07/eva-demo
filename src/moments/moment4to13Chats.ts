import type { ChatItem } from '@/features/eva/types';

/** Moment4 opening thread — left chat per payer / COB brief + suggested actions. */
export const MOMENT4_INITIAL: ChatItem[] = [
  {
    id: 'm4-e',
    kind: 'eva',
    contentIsHtml: true,
    content: `<p>Good morning David. Before we dive into your typical Monday morning summary, two things.</p>
<p>First, a win: Cigna authorization denials are down from 75 per cycle to 9. I've been automatically initiating authorizations ahead of visits, flagging expiring ones before they lapse, and catching provider credentialing gaps before claims go out.</p>
<p>Second, a new pattern: UnitedHealthcare Coordination of Benefits denials are trending up — 11 flagged this cycle. COB relies on patient disclosure of secondary coverage. I've already routed the affected claims to your billing team.</p>
<p>Would you also like me to flag these patients to your front office for coverage verification at their next visit?</p>`,
    timestamp: '08:56 am',
  },
  {
    id: 'm4-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Flag front office', 'Show me my summary'],
    timestamp: '08:56 am',
  },
];

/** Opening thread from `public/moment5/Chat.png` (Maya / front-desk morning brief). */
export const MOMENT5_INITIAL: ChatItem[] = [
  {
    id: 'm5-e',
    kind: 'eva',
    contentIsHtml: true,
    content: `<p>Good morning Maya. Here's where today stands.</p>
<ul>
<li>You have 102 visits on the schedule across 9 providers. 27 of those are new patient evaluations.</li>
<li>4 cancellations came in over the weekend through the patient portal. All 4 were automatically rescheduled before this morning.</li>
<li>10 new referrals arrived at Location 1 over the weekend — all entered, 6 already scheduled, 3 in process. 1 did not respond. I will follow up later today and escalate to you if needed.</li>
<li>Of your 27 new patients today, 20 have completed their digital patient intake. 7 have not. I'll flag those at check-in.</li>
<li>5 slots remain open — I've identified candidates to fill them and have outreach queued.</li>
</ul>`,
    timestamp: '08:56 am',
  },
  {
    id: 'm5-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Call Marcus', 'Show me referral list', 'Show me the 11 flagged patients'],
    timestamp: '08:56 am',
  },
];

export const MOMENT6_INITIAL: ChatItem[] = [
  {
    id: 'm6-e',
    kind: 'eva',
    content: 'Good afternoon, Jordan. What can I help you with?',
    timestamp: '08:56 am',
  },
];

export const MOMENT7_INITIAL: ChatItem[] = [
  {
    id: 'm7-e',
    kind: 'eva',
    content:
      "Here are Sarah Chen's check-in details. Co-pay is due. Would you like to charge the card on file?",
    timestamp: '09:02 am',
  },
  {
    id: 'm7-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Run card on file', 'View other payment options'],
    timestamp: '09:02 am',
  },
];

export const MOMENT8_INITIAL: ChatItem[] = [
  { id: 'm8-u', kind: 'user', content: 'Give me my end of day summary', timestamp: '05:12 pm' },
  {
    id: 'm8-e',
    kind: 'eva',
    content:
      '• 102 visits completed\n• 27 new patients\n• 4 cancellations\n• 6 referrals pending follow-up',
    timestamp: '05:12 pm',
  },
  {
    id: 'm8-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Bring up the referrals'],
    timestamp: '05:12 pm',
  },
];

export const MOMENT9_INITIAL: ChatItem[] = [
  {
    id: 'm9-e',
    kind: 'eva',
    content:
      'Daily snapshot: visits are on track, two payer threads need attention, and the afternoon block has three open slots.',
    timestamp: '02:18 pm',
  },
  {
    id: 'm9-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Call Marcus', 'Show me referral list', 'Show me the 11 flagged patients'],
    timestamp: '02:18 pm',
  },
];

export const MOMENT10_INITIAL: ChatItem[] = [
  {
    id: 'm10-e',
    kind: 'eva',
    content:
      'SOAP workspace is ready. Start scribe when you begin the visit — I will structure Subjective first, then follow your sections.',
    timestamp: '08:12 am',
  },
];

export const MOMENT11_INITIAL: ChatItem[] = [
  { id: 'm11-u', kind: 'user', content: 'Schedule Sarah for her next block of sessions.', timestamp: '11:05 am' },
  {
    id: 'm11-e',
    kind: 'eva',
    content:
      'Here are twelve available slots across the next three weeks. Pick one to hold, or ask me to narrow by provider.',
    timestamp: '11:05 am',
  },
  {
    id: 'm11-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Confirm', 'Show me more options'],
    timestamp: '11:05 am',
  },
];

/** Prior moment5 payer brief — kept for moment12 while moment5 uses schedule + spatial UI. */
export const MOMENT12_INITIAL: ChatItem[] = [
  {
    id: 'm12-e',
    kind: 'eva',
    content:
      'Here is a concise read on payer friction this week: Cigna authorization denials are up on therapy codes, and UnitedHealthcare is asking for Coordination of Benefits on three active cases.',
    timestamp: '10:02 am',
  },
  {
    id: 'm12-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Flag front office', 'Show me my summary'],
    timestamp: '10:02 am',
  },
];

export const MOMENT13_INITIAL: ChatItem[] = [...MOMENT6_INITIAL];
