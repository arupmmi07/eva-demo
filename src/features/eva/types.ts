export type WorkflowStage =
  | 'scheduler'
  | 'dashboard'
  | 'summary'
  | 'summaryCustomizing'
  | 'summaryReady'
  | 'summaryAnswered'
  | 'session'
  | 'sessionAccepted'
  | 'sessionStopped'
  | 'finalized';

export type ChatKind =
  | 'eva'
  | 'user'
  | 'patient-card'
  | 'insight'
  | 'session-widget'
  | 'prompt'
  | 'cascade-unconfirmed-card'
  | 'cascade-noshow-card'
  /** Inline “Suggested actions” chips; scrolls with the thread (scheduler + main workflow). */
  | 'suggestion-chips';

/** Right pane accordion when `stage === 'scheduler'`. */
export type SchedulerExpandedPanel =
  | 'none'
  | 'unconfirmed'
  | 'potentialNoShow'
  | 'scheduleChanges'
  | 'todaysPatients'
  | 'unansweredMessages'
  | 'outstandingCopays';

export type PanelMode = 'both' | 'leftOnly' | 'rightOnly';

export type HeaderMode = 'default' | 'setup' | 'session-disabled' | 'session-active' | 'share';

export interface ChatItem {
  id: string;
  kind: ChatKind;
  content?: string;
  timestamp?: string;
  /** Required when `kind === 'suggestion-chips'`. */
  suggestionLabels?: string[];
}
