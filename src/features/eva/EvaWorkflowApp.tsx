import type { MomentId } from '@/moments/momentTypes';
import { AppRail } from './components/layout/AppRail';
import { CenterDock } from './components/layout/CenterDock';
import { TopHeader } from './components/layout/TopHeader';
import { ChatPane } from './components/chat/ChatPane';
import { RightPane } from './components/panels/RightPane';
import { useEvaWorkflow } from './hooks/useEvaWorkflow';

export function EvaWorkflowApp({ momentId }: { momentId: MomentId }) {
  const workflow = useEvaWorkflow({ momentId });

  return (
    <div
      data-name="EvaWorkflowApp"
      className="h-screen overflow-hidden bg-[#fcfcfd] font-['Inter',sans-serif] text-[var(--ds-text-primary)]"
    >
      <div className="flex h-full">
        <AppRail />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <TopHeader
            mode={workflow.headerMode}
            title={workflow.headerTitle}
            saveDraftEnabled={workflow.saveDraftEnabled}
            reviewEnabled={workflow.reviewEnabled}
            onFinalize={workflow.finalizeReview}
            setupVisible={workflow.topSetupVisible}
            onSetupResolve={workflow.resolveCustomization}
            ctaHints={workflow.ctaHints}
            momentId={momentId}
          />

          <div className="relative flex min-h-0 flex-1 overflow-hidden">
            <div
              className={`grid min-h-0 min-w-0 flex-1 overflow-hidden ${
                workflow.panelMode === 'both'
                  ? 'grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'
                  : workflow.panelMode === 'leftOnly'
                    ? 'grid-cols-[minmax(0,1fr)_0px]'
                    : 'grid-cols-[0px_minmax(0,1fr)]'
              } bg-[#fcfcfd]${workflow.panelMode === 'both' ? ' gap-2 p-2' : ''}`}
            >
              <section className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden border-transparent bg-[#fcfcfd]">
                <ChatPane
                  chatItems={workflow.chatItems}
                  chatInput={workflow.chatInput}
                  onInputChange={workflow.setChatInput}
                  onSubmit={workflow.submitChat}
                  onQuickAction={workflow.selectSuggestion}
                  stage={workflow.stage}
                  sessionSeconds={workflow.sessionSeconds}
                  onOpenSummary={workflow.openSummaryFromUser}
                  onSchedulerViewUnconfirmed={() => workflow.expandSchedulerPanel('unconfirmed')}
                  onSchedulerViewNoShow={() => workflow.expandSchedulerPanel('potentialNoShow')}
                  onMoment3CheckIn={momentId === 'moment3' ? () => workflow.openM3CheckIn() : undefined}
                  figmaWorkspaceShell
                  ctaHints={workflow.ctaHints}
                  schedulerChrome={workflow.shellSchedulerChrome}
                />
              </section>

              <section className="relative min-h-0 min-w-0 overflow-hidden rounded-[12px] bg-[#f8fafc]">
                <RightPane
                  stage={workflow.stage}
                  referralOpen={workflow.referralOpen}
                  topSetupVisible={workflow.topSetupVisible}
                  recordingActive={workflow.recordingActive}
                  sessionPaused={workflow.sessionPaused}
                  sessionSeconds={workflow.sessionSeconds}
                  showHighlight={workflow.showHighlight}
                  sleepTableVisible={workflow.sleepTableVisible}
                  sleepDisturbanceAccepted={workflow.sleepDisturbanceAccepted}
                  chiefComplaint={workflow.chiefComplaint}
                  chiefComplaintFocused={workflow.chiefComplaintFocused}
                  mentionVisible={workflow.mentionVisible}
                  clarificationApplied={workflow.clarificationApplied}
                  leftPanelCollapsed={workflow.leftPanelCollapsed}
                  schedulerExpanded={workflow.schedulerPanel}
                  schedulerReminders={workflow.schedulerReminders}
                  schedulerSamMoved={workflow.schedulerSamMoved}
                  schedulerGoodNews={workflow.schedulerGoodNews}
                  schedulerToasts={workflow.schedulerToasts}
                  onSchedulerExpand={workflow.expandSchedulerPanel}
                  onSchedulerResend={workflow.resendSchedulerReminder}
                  onSchedulerMarkSamNoShow={workflow.markSamNoShow}
                  onSchedulerDismissToast={workflow.dismissSchedulerToast}
                  onOpenSummary={workflow.openSummaryFromUser}
                  onOpenReferral={() => workflow.setReferralOpen(true)}
                  onCloseReferral={workflow.closeReferral}
                  onBeginSession={workflow.beginSession}
                  onSleepPosition={() => workflow.setSleepTableVisible(true)}
                  onAcceptSleep={workflow.acceptSleepSuggestion}
                  onPause={workflow.togglePause}
                  onStop={workflow.stopSession}
                  onChiefComplaintChange={workflow.handleChiefComplaintChange}
                  onChiefComplaintFocus={workflow.setChiefComplaintFocused}
                  onSelectMention={workflow.insertMention}
                  onDismissClinicalTags={workflow.dismissClinicalTags}
                  ctaHints={workflow.ctaHints}
                  schedulerRightSlot={workflow.momentUi.schedulerRightSlot}
                  clinicalDualRight={workflow.momentUi.clinicalDualRight}
                  momentId={momentId}
                  m3CheckInInvoiceOpen={workflow.m3CheckInInvoiceOpen}
                  m3InvoiceInstanceKey={workflow.m3InvoiceInstanceKey}
                  onM3OpenCheckInFromPanel={() => workflow.openM3CheckIn({ withUserEcho: true })}
                  onM3CompleteCheckIn={workflow.completeM3CheckIn}
                />
              </section>
            </div>

            <CenterDock panelMode={workflow.panelMode} onPanelModeChange={workflow.setPanelMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
