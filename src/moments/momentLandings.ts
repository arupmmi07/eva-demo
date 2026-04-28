import type { MomentId } from './momentTypes';

/** Moments that use static right-pane landings (no scheduler KPI storyline yet). */
export const LANDING_ONLY_MOMENT_IDS = [
  'moment4',
  'moment5',
  'moment6',
  'moment7',
  'moment8',
  'moment9',
  'moment10',
  'moment11',
  'moment12',
  'moment13',
] as const satisfies readonly MomentId[];

export type LandingOnlyMomentId = (typeof LANDING_ONLY_MOMENT_IDS)[number];

export function isLandingOnlyMoment(momentId: MomentId): momentId is LandingOnlyMomentId {
  return (LANDING_ONLY_MOMENT_IDS as readonly string[]).includes(momentId);
}
