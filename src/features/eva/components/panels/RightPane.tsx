import { useRef } from 'react';
import type { SchedulerExpandedPanel, WorkflowStage } from '../../types';
import type { UnconfirmedId } from '../../scheduler/schedulerData';
import type { CtaHintId } from '../../utils/ctaHints';
import { SchedulerRightPane, type SchedulerToast } from '../../scheduler/SchedulerRightPane';
import { DashboardSurface } from '../dashboard/DashboardSurface';
import { FinalizedSurface } from '../finalized/FinalizedSurface';
import { ReferralDrawer } from '../summary/ReferralDrawer';
import { SummarySurface } from '../summary/SummarySurface';
import { SoapSurface } from '../soap/SoapSurface';

export function RightPane({
  stage,
  referralOpen,
  topSetupVisible,
  recordingActive,
  sessionPaused,
  sessionSeconds,
  showHighlight,
  sleepTableVisible,
  sleepDisturbanceAccepted,
  chiefComplaint,
  chiefComplaintFocused,
  mentionVisible,
  clarificationApplied,
  leftPanelCollapsed,
  schedulerExpanded,
  schedulerReminders,
  schedulerSamMoved,
  schedulerGoodNews,
  schedulerToasts,
  onSchedulerExpand,
  onSchedulerResend,
  onSchedulerMarkSamNoShow,
  onSchedulerDismissToast,
  onOpenSummary,
  onOpenReferral,
  onCloseReferral,
  onBeginSession,
  onSleepPosition,
  onAcceptSleep,
  onPause,
  onStop,
  onChiefComplaintChange,
  onChiefComplaintFocus,
  onSelectMention,
  onDismissClinicalTags,
  ctaHints,
}: {
  stage: WorkflowStage;
  referralOpen: boolean;
  topSetupVisible: boolean;
  recordingActive: boolean;
  sessionPaused: boolean;
  sessionSeconds: number;
  showHighlight: boolean;
  sleepTableVisible: boolean;
  sleepDisturbanceAccepted: boolean;
  chiefComplaint: string;
  chiefComplaintFocused: boolean;
  mentionVisible: boolean;
  clarificationApplied: boolean;
  leftPanelCollapsed: boolean;
  schedulerExpanded: SchedulerExpandedPanel;
  schedulerReminders: Record<UnconfirmedId, boolean>;
  schedulerSamMoved: boolean;
  schedulerGoodNews: boolean;
  schedulerToasts: SchedulerToast[];
  onSchedulerExpand: (panel: SchedulerExpandedPanel) => void;
  onSchedulerResend: (id: UnconfirmedId) => void;
  onSchedulerMarkSamNoShow: () => void;
  onSchedulerDismissToast: (id: string) => void;
  onOpenSummary: () => void;
  onOpenReferral: () => void;
  onCloseReferral: () => void;
  onBeginSession: (includeUserMessage?: boolean) => void;
  onSleepPosition: () => void;
  onAcceptSleep: () => void;
  onPause: () => void;
  onStop: () => void;
  onChiefComplaintChange: (value: string) => void;
  onChiefComplaintFocus: (focused: boolean) => void;
  onSelectMention: (value: string) => void;
  onDismissClinicalTags: () => void;
  ctaHints: ReadonlySet<CtaHintId>;
}) {
  const soapScrollRef = useRef<HTMLDivElement | null>(null);

  if (stage === 'scheduler') {
    return (
      <SchedulerRightPane
        expanded={schedulerExpanded}
        onExpand={onSchedulerExpand}
        remindersSent={schedulerReminders}
        onResendReminder={onSchedulerResend}
        samMovedToNoShow={schedulerSamMoved}
        onMarkSamNoShow={onSchedulerMarkSamNoShow}
        toasts={schedulerToasts}
        onDismissToast={onSchedulerDismissToast}
        goodNewsFired={schedulerGoodNews}
        onOpenPreVisitSummary={onOpenSummary}
      />
    );
  }

  if (stage === 'dashboard') {
    return (
      <div className="h-full overflow-y-auto" data-name="RightPaneDashboard">
        <DashboardSurface onOpenSummary={onOpenSummary} ctaHints={ctaHints} />
      </div>
    );
  }

  if (stage === 'finalized') {
    return (
      <div className="h-full overflow-y-auto" data-name="RightPaneFinalized">
        <FinalizedSurface clarificationApplied={clarificationApplied} />
      </div>
    );
  }

  if (stage === 'summary' || stage === 'summaryCustomizing' || stage === 'summaryReady' || stage === 'summaryAnswered') {
    return (
      <div
        className={`relative h-full px-3 py-3 ${referralOpen ? 'overflow-hidden' : 'overflow-y-auto'}`}
        data-name="RightPaneSummary"
      >
        <SummarySurface
          disabledActions={topSetupVisible}
          topSetupVisible={topSetupVisible}
          answered={stage === 'summaryAnswered'}
          onOpenReferral={onOpenReferral}
          onBeginSession={() => onBeginSession()}
          ctaHints={ctaHints}
        />
        {referralOpen && <ReferralDrawer onClose={onCloseReferral} ctaHints={ctaHints} />}
      </div>
    );
  }

  return (
    <div ref={soapScrollRef} className="h-full overflow-y-auto px-3 py-3" data-name="RightPaneSoap">
      <div className="min-h-full rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-[15px] shadow-[var(--ds-shadow-card)]">
        <SoapSurface
          stage={stage}
          recordingActive={recordingActive}
          sessionPaused={sessionPaused}
          sessionSeconds={sessionSeconds}
          showHighlight={showHighlight}
          sleepTableVisible={sleepTableVisible}
          sleepDisturbanceAccepted={sleepDisturbanceAccepted}
          chiefComplaint={chiefComplaint}
          chiefComplaintFocused={chiefComplaintFocused}
          mentionVisible={mentionVisible}
          leftPanelCollapsed={leftPanelCollapsed}
          onSleepPosition={onSleepPosition}
          onAcceptSleep={onAcceptSleep}
          onPause={onPause}
          onStop={onStop}
          onChiefComplaintChange={onChiefComplaintChange}
          onChiefComplaintFocus={onChiefComplaintFocus}
          onSelectMention={onSelectMention}
          onDismissClinicalTags={onDismissClinicalTags}
          scrollContainerRef={soapScrollRef}
          ctaHints={ctaHints}
        />
      </div>
    </div>
  );
}
