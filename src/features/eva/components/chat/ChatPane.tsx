import { useEffect, useRef } from 'react';
import { ChevronUp, History } from 'lucide-react';
import { SendHorizontalIcon } from '../icons/SendHorizontalIcon';
import type { ChatItem, PanelMode, WorkflowStage } from '../../types';
import type { CtaHintId } from '../../utils/ctaHints';
import { CTA_HINT } from '../../utils/ctaHints';
import { AudioControls } from '../audio/AudioControls';
import { ChatBubble } from './ChatBubble';

/** Chat shell for the Eva workspace (`figma-make-moment3` layout: header, transcript, Ask Eva). */
export function ChatPane({
  chatItems,
  chatInput,
  onInputChange,
  onSubmit,
  onQuickAction,
  stage,
  sessionSeconds,
  onOpenSummary,
  onSchedulerViewUnconfirmed,
  onSchedulerViewNoShow,
  onMoment3CheckIn,
  panelMode,
  sharedScreenshotsLayout,
  ctaHints,
  schedulerChrome,
}: {
  chatItems: ChatItem[];
  chatInput: string;
  onInputChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onQuickAction: (label: string) => void;
  stage: WorkflowStage;
  sessionSeconds: number;
  onOpenSummary: () => void;
  onSchedulerViewUnconfirmed?: () => void;
  onSchedulerViewNoShow?: () => void;
  onMoment3CheckIn?: () => void;
  panelMode?: PanelMode;
  /** With `?sharedscreenshots` and Conversation mode, composer spans chat column width (transcript unchanged). */
  sharedScreenshotsLayout?: boolean;
  ctaHints: ReadonlySet<CtaHintId>;
  /** When set, use scheduler chat chrome even if `stage` is not `scheduler` (e.g. clinician moment). */
  schedulerChrome?: boolean;
}) {
  const showHistory = stage === 'session' || stage === 'sessionAccepted' || stage === 'sessionStopped';
  const schedulerChromeVisual = schedulerChrome ?? stage === 'scheduler';
  const finalInputPlaceholder =
    schedulerChromeVisual
      ? 'Ask Eva anything: Patients, insurance, schedule...'
      : stage === 'finalized'
        ? 'Ask Eva anything — patients, insurance, schedule...'
        : 'Ask eva about your schedule...';
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chatScroll = chatScrollRef.current;
    if (!chatScroll) return;
    chatScroll.scrollTo({
      top: chatScroll.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatItems]);

  const figmaChatHeaderVisible = showHistory;
  /** Focused mode: composer only, bottom-left floating overlay (see EvaWorkflowApp). */
  const focusedComposerOnly = panelMode === 'rightOnly';
  const focusedComposerPlaceholder =
    'Ask Eva anything: Patients, insurance, schedule...';
  const conversationScreenshotComposerFullWidth =
    panelMode === 'leftOnly' && Boolean(sharedScreenshotsLayout);
  const skipFigmaHeader = !figmaChatHeaderVisible || focusedComposerOnly;

  return (
    <div
      data-name="ChatPane"
      className={`box-border font-['Inter',sans-serif] ${
        focusedComposerOnly ? 'm-0 w-full' : 'm-0 flex min-h-0 flex-1 flex-col'
      }`}
    >
      <div
        className={
          focusedComposerOnly
            ? 'flex w-full flex-col bg-transparent'
            : 'flex min-h-0 flex-1 flex-col overflow-hidden bg-[#ffffff]'
        }
      >
        {skipFigmaHeader ? null : (
          <header
            className="relative z-[3] min-h-[64px] w-full shrink-0 bg-[#fcfcfd]"
            data-name="ChatPaneHeader"
          >
            <div className="relative flex min-h-[64px] w-full flex-row items-center">
              <div className="flex size-full min-h-[inherit] items-center justify-between px-4 pb-[9px] pt-2">
                <div className="flex min-w-0 flex-1 items-center gap-5">
                  <div className="flex shrink-0 items-center gap-1.5 text-[14px] font-medium leading-5 text-[#64748b]">
                    <History className="size-4 shrink-0" strokeWidth={1.25} aria-hidden />
                    History
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

        <div
          ref={chatScrollRef}
          className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-gutter:stable] px-8 py-6 ${focusedComposerOnly ? 'hidden' : ''}`}
        >
          <div className="mx-auto flex w-full max-w-[720px] flex-col gap-10">
            {chatItems.map((item) => (
              <ChatBubble
                key={item.id}
                item={item}
                sessionSeconds={sessionSeconds}
                onOpenSummary={onOpenSummary}
                highlightPatientSummary={ctaHints.has(CTA_HINT.OPEN_PREVISIT_SUMMARY)}
                onSchedulerViewUnconfirmed={onSchedulerViewUnconfirmed}
                onSchedulerViewNoShow={onSchedulerViewNoShow}
                onMoment3CheckIn={onMoment3CheckIn}
                schedulerChrome={schedulerChromeVisual}
                onQuickAction={onQuickAction}
                ctaHints={ctaHints}
              />
            ))}
          </div>
        </div>

        <div
          className={`shrink-0 pb-2 pt-2 ${focusedComposerOnly ? 'bg-transparent px-0' : `${conversationScreenshotComposerFullWidth ? 'px-8' : 'px-4'}`}`}
        >
          <div
            className={
              conversationScreenshotComposerFullWidth
                ? 'box-border flex h-[112px] w-full min-w-0 flex-col rounded-[12px] bg-[#f3f4f7] p-4'
                : focusedComposerOnly
                  ? 'box-border flex w-full min-w-0 flex-row items-center gap-3 rounded-[12px] border border-[#E2E8F0] bg-white px-4 py-4 shadow-[0px_4px_20px_rgba(15,23,42,0.08)]'
                  : 'mx-auto box-border flex h-[112px] w-full max-w-full flex-col rounded-[12px] bg-[#f3f4f7] p-4'
            }
          >
            {focusedComposerOnly ? (
              <>
                <textarea
                  value={chatInput}
                  onChange={(event) => onInputChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      onSubmit(chatInput);
                    }
                  }}
                  rows={1}
                  className="box-border min-h-[28px] min-w-0 flex-1 resize-none overflow-hidden border-none bg-transparent py-0.5 font-['Inter',sans-serif] text-[16px] font-normal leading-[28px] text-[#020617] outline-none placeholder:text-[#64748b]"
                  placeholder={focusedComposerPlaceholder}
                  aria-label="Message Eva"
                />
                <AudioControls size="md" variant="micOnly" />
                <button
                  type="button"
                  onClick={() => onSubmit(chatInput)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#C4B5FD] text-white transition hover:bg-[#A78BFA]"
                  aria-label="Send message"
                >
                  <SendHorizontalIcon className="size-4" />
                </button>
              </>
            ) : (
              <>
                <textarea
                  value={chatInput}
                  onChange={(event) => onInputChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      onSubmit(chatInput);
                    }
                  }}
                  rows={1}
                  className='box-border h-[28px] min-h-[28px] w-full resize-none overflow-hidden border-none bg-transparent py-0 font-["Inter",sans-serif] text-[16px] font-normal leading-[28px] text-[#020617] outline-none placeholder:text-[#64748b]'
                  placeholder={finalInputPlaceholder}
                  aria-label="Message Eva"
                />
                <div className="mt-5 flex h-8 min-h-8 shrink-0 items-center justify-between gap-2">
                  <div className="flex min-w-0 justify-start" data-name="ChatPaneQuickActions">
                    <button
                      type="button"
                      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-[#eaecf0] px-3 text-[14px] font-medium text-[#64748B]"
                    >
                      Quick Actions
                      <ChevronUp className="size-3.5 opacity-70" strokeWidth={2} aria-hidden />
                    </button>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <AudioControls size="md" variant="micOnly" />
                    <button
                      type="button"
                      onClick={() => onSubmit(chatInput)}
                      className="flex size-8 shrink-0 items-center justify-center rounded-[12px] bg-[#4E37F6] text-white transition hover:bg-[#4338ca]"
                      aria-label="Send message"
                    >
                      <SendHorizontalIcon className="size-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
