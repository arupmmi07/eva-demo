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

/** Opening thread from `public/moment6/Chat.png` (placeholder Eva copy). */
export const MOMENT6_INITIAL: ChatItem[] = [
  {
    id: 'm6-e',
    kind: 'eva',
    contentIsHtml: true,
    content: `<p>This is a placeholder message to show how Eva interacts and answers the user's request, giving context of what happens and suggesting follow-up actions.</p>`,
    timestamp: '08:56 am',
  },
];

/** Opening thread from `public/moment7/Chat (1).png` — Eva copy + suggested actions. */
export const MOMENT7_INITIAL: ChatItem[] = [
  {
    id: 'm7-e',
    kind: 'eva',
    contentIsHtml: true,
    content:
      '<p>Here are Sarah Chen\u2019s check-in details. Co-pay is due. Would you like to charge the card on file?</p>',
    timestamp: '09:02am',
  },
  {
    id: 'm7-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Run card on file', 'View other payment options'],
    timestamp: '09:02am',
  },
];

/** Opening thread from `public/moment8/Chat.png` (placeholder copy + `08:56 am`). */
export const MOMENT8_INITIAL: ChatItem[] = [
  {
    id: 'm8-e',
    kind: 'eva',
    contentIsHtml: true,
    content: `<p>This is a placeholder message to show how Eva interacts and answers the user\u2019s request, giving context of what happens and suggesting follow-up actions.</p>`,
    timestamp: '08:56 am',
  },
];

/** Opening thread from `public/moment9/Chat (1).png` — schedule Sarah + availability list + chips. */
export const MOMENT9_INITIAL: ChatItem[] = [
  {
    id: 'm9-u',
    kind: 'user',
    content: 'Let\u2019s schedule Sarah to come in 2 times a week for the next 6 weeks',
  },
  {
    id: 'm9-e',
    kind: 'eva',
    contentIsHtml: true,
    content: `<p>Here is some availability for Sarah based on her preferences:</p>
<ul>
<li>Session 01 \u2022 Tuesday 10 AM \u2022 April 28</li>
<li>Session 02 \u2022 Thursday 9 AM \u2022 April 30</li>
<li>Session 03 \u2022 Tuesday 10 AM \u2022 May 5</li>
<li>Session 04 \u2022 Thursday 9 AM \u2022 May 7</li>
<li>Session 05 \u2022 Tuesday 10 AM \u2022 May 12</li>
<li>Session 06 \u2022 Thursday 9 AM \u2022 May 14</li>
<li>Session 07 \u2022 Tuesday 10 AM \u2022 May 19</li>
<li>Session 08 \u2022 Thursday 9 AM \u2022 May 21</li>
<li>Session 09 \u2022 Tuesday 10 AM \u2022 May 26</li>
<li>Session 10 \u2022 Thursday 9 AM \u2022 May 28</li>
<li>Session 11 \u2022 Tuesday 10 AM \u2022 June 2</li>
<li>Session 12 \u2022 Thursday 9 AM \u2022 June 4</li>
</ul>`,
    timestamp: '08:56 am',
  },
  {
    id: 'm9-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Confirm', 'Show me more options'],
    timestamp: '08:56 am',
  },
];

/** Moment10 — chat thread intentionally empty; right pane matches moment9 (SOAP). */
export const MOMENT10_INITIAL: ChatItem[] = [];

/** Moment11 opening thread — hybrid chat: single Eva greeting + `08:56 am` (design screenshot). */
export const MOMENT11_INITIAL: ChatItem[] = [
  {
    id: 'm11-e',
    kind: 'eva',
    content: 'Good afternoon, Jordan. what can I help you with?',
    timestamp: '08:56 am',
  },
];

/** Opening thread from `public/moment12/Chat (2).png` — end-of-day summary + suggested action. */
export const MOMENT12_INITIAL: ChatItem[] = [
  {
    id: 'm12-u',
    kind: 'user',
    content: 'Give me my end of day summary.',
  },
  {
    id: 'm12-e',
    kind: 'eva',
    contentIsHtml: true,
    content: `<p>Here is the summary of today so far:</p>
<ul>
<li>Visits on Schedule: 102</li>
<li>Visits Completed: 98</li>
<li>Earnings Collected: $2,450</li>
<li>100% of copays captured at check-in</li>
<li>100 of card-on-file payments were processed automatically</li>
<li>No remaining outstanding balances</li>
</ul>
<p>Regarding schedule changes, I managed 5 last-minute cancellations and they are all rescheduled for the next following days.</p>
<p>15 Referrals arrived at Location 1, and they are all already being worked.</p>`,
    timestamp: '02:30 pm',
  },
  {
    id: 'm12-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Bring up the refferals'],
    timestamp: '02:30 pm',
  },
];

/** Moment13 chat — prior moment10 operations + SOAP intro (moment10 chat is now empty). */
export const MOMENT13_INITIAL: ChatItem[] = [
  {
    id: 'm13-e',
    kind: 'eva',
    contentIsHtml: true,
    content: `<p>Good morning. Today's operations view is ready on the right: visits, locations, payer performance, and claims.</p>
<p>When you start a visit, open SOAP from the header—I'll begin with <strong>Subjective</strong> and follow your sections.</p>`,
    timestamp: '08:12 am',
  },
  {
    id: 'm13-chips',
    kind: 'suggestion-chips',
    suggestionLabels: ['Open SOAP workspace', 'Summarize payer risks'],
    timestamp: '08:12 am',
  },
];
