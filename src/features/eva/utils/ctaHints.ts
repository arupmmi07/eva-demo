import type { WorkflowStage } from '../types';

/** DOM / prop target ids for guided clicks */
export const CTA_HINT = {
  OPEN_PREVISIT_SUMMARY: 'open-previsit-summary',
  BEGIN_SESSION: 'begin-session',
  VIEW_REFERRAL: 'view-referral',
  CLOSE_REFERRAL: 'close-referral',
  SAVE_SETUP_DEFAULT: 'save-setup-default',
  SLEEP_POSITION: 'sleep-position',
  ACCEPT_SLEEP: 'accept-sleep',
  STOP_SESSION: 'stop-session',
  REVIEW_FINALIZE: 'review-finalize',
  SHARE_PATIENT: 'share-patient',
} as const;

export type CtaHintId = (typeof CTA_HINT)[keyof typeof CTA_HINT];

export function getActiveCtaHints(p: {
  stage: WorkflowStage;
  referralOpen: boolean;
  topSetupVisible: boolean;
  recordingActive: boolean;
  sessionPaused: boolean;
  showHighlight: boolean;
  sleepTableVisible: boolean;
  sleepDisturbanceAccepted: boolean;
}): Set<CtaHintId> {
  const s = new Set<CtaHintId>();

  if (p.stage === 'dashboard') {
    s.add(CTA_HINT.OPEN_PREVISIT_SUMMARY);
    return s;
  }

  if (p.referralOpen) {
    s.add(CTA_HINT.CLOSE_REFERRAL);
    return s;
  }

  if (p.stage === 'summaryCustomizing' && p.topSetupVisible) {
    s.add(CTA_HINT.SAVE_SETUP_DEFAULT);
    return s;
  }

  if (['summary', 'summaryReady', 'summaryAnswered'].includes(p.stage) && !p.topSetupVisible) {
    s.add(CTA_HINT.BEGIN_SESSION);
    s.add(CTA_HINT.VIEW_REFERRAL);
    return s;
  }

  if (p.stage === 'session' && p.recordingActive && !p.sessionPaused) {
    if (p.sleepTableVisible) {
      s.add(CTA_HINT.ACCEPT_SLEEP);
      return s;
    }
    if (p.showHighlight) {
      if (!p.sleepDisturbanceAccepted) {
        s.add(CTA_HINT.SLEEP_POSITION);
      }
      s.add(CTA_HINT.STOP_SESSION);
      return s;
    }
    return s;
  }

  if (p.stage === 'sessionAccepted' && p.recordingActive && !p.sessionPaused) {
    s.add(CTA_HINT.STOP_SESSION);
    return s;
  }

  if (p.stage === 'sessionStopped') {
    s.add(CTA_HINT.REVIEW_FINALIZE);
    return s;
  }

  if (p.stage === 'finalized') {
    s.add(CTA_HINT.SHARE_PATIENT);
    return s;
  }

  return s;
}

export function ctaHighlightClass(
  isTargeted: boolean,
  rounded: 'pill' | 'button' | 'card' | 'circle' | 'none' = 'button',
) {
  if (!isTargeted) return '';
  const radius =
    rounded === 'pill'
      ? 'rounded-[var(--ds-radius-pill)]'
      : rounded === 'card'
        ? 'rounded-[var(--ds-radius-card)]'
        : rounded === 'circle'
          ? 'rounded-full'
          : rounded === 'button'
            ? 'rounded-[var(--ds-radius-button)]'
            : '';
  return `ds-cta-highlight ${radius}`;
}
