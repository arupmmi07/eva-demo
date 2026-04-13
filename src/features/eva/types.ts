export type WorkflowStage =
  | 'dashboard'
  | 'summary'
  | 'summaryCustomizing'
  | 'summaryReady'
  | 'summaryAnswered'
  | 'session'
  | 'sessionAccepted'
  | 'sessionStopped'
  | 'finalized';

export type ChatKind = 'eva' | 'user' | 'patient-card' | 'insight' | 'session-widget' | 'prompt';

export type PanelMode = 'both' | 'leftOnly' | 'rightOnly';

export type HeaderMode = 'default' | 'setup' | 'session-disabled' | 'session-active' | 'share';

export interface ChatItem {
  id: string;
  kind: ChatKind;
  content?: string;
  timestamp?: string;
}
