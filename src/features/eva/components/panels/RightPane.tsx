import { useRef } from 'react';
import type { WorkflowStage } from '../../types';
import type { CtaHintId } from '../../utils/ctaHints';
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
  ctaHints: ReadonlySet<CtaHintId>;
}) {
  const soapScrollRef = useRef<HTMLDivElement | null>(null);

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
        className={`relative h-full px-[32px] py-[32px] ${referralOpen ? 'overflow-hidden' : 'overflow-y-auto'}`}
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
    <div ref={soapScrollRef} className="h-full overflow-y-auto px-[32px] py-[24px]" data-name="RightPaneSoap">
      <div className="min-h-full rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-[24px] shadow-[var(--ds-shadow-card)]">
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
          scrollContainerRef={soapScrollRef}
          ctaHints={ctaHints}
        />
      </div>
    </div>
  );
}
