import { AppRail } from './components/layout/AppRail';
import { CenterDock } from './components/layout/CenterDock';
import { TopHeader } from './components/layout/TopHeader';
import { ChatPane } from './components/chat/ChatPane';
import { RightPane } from './components/panels/RightPane';
import { useEvaWorkflow } from './hooks/useEvaWorkflow';

export function EvaWorkflowApp() {
  const workflow = useEvaWorkflow();

  return (
    <div
      data-name="EvaWorkflowApp"
      className="h-screen overflow-hidden bg-[var(--ds-bg-secondary)] font-['Inter',sans-serif] text-[var(--ds-text-primary)]"
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
          />

          <div className="relative flex min-h-0 flex-1 overflow-hidden">
            <div
              className={`grid min-h-0 min-w-0 flex-1 overflow-hidden ${
                workflow.panelMode === 'both'
                  ? 'grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'
                  : workflow.panelMode === 'leftOnly'
                    ? 'grid-cols-[minmax(0,1fr)_0px]'
                    : 'grid-cols-[0px_minmax(0,1fr)]'
              }`}
            >
              <section
                className={`relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden border-r ${
                  workflow.stage === 'scheduler'
                    ? 'border-[rgba(0,9,50,0.1)] bg-[#eef2f7]'
                    : 'border-[var(--ds-border)] bg-[var(--ds-bg-primary)]'
                }`}
              >
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
                  ctaHints={workflow.ctaHints}
                />
              </section>

              <section
                className={`relative min-h-0 min-w-0 overflow-hidden ${
                  workflow.stage === 'scheduler' ? 'bg-[#fafbfc]' : 'bg-[var(--ds-bg-secondary)]'
                }`}
              >
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
