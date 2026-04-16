import { useEffect, useRef } from 'react';
import { ChevronDown, History, MessageCircle, Send } from 'lucide-react';
import type { ChatItem, WorkflowStage } from '../../types';
import type { CtaHintId } from '../../utils/ctaHints';
import { CTA_HINT } from '../../utils/ctaHints';
import { AudioControls } from '../audio/AudioControls';
import { ChatBubble } from './ChatBubble';

/** One chat shell for every workflow stage — only copy and optional chrome differ. */
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
  ctaHints,
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
  ctaHints: ReadonlySet<CtaHintId>;
}) {
  const showHistory = stage === 'session' || stage === 'sessionAccepted' || stage === 'sessionStopped';
  const finalInputPlaceholder =
    stage === 'scheduler'
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

  const isScheduler = stage === 'scheduler';

  return (
    <div
      data-name="ChatPane"
      className="m-3 box-border flex min-h-0 flex-1 flex-col font-['Inter',sans-serif]"
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] shadow-[var(--ds-shadow-card)]">
        <header
          className="shrink-0 border-b border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-5 py-3"
          data-name="ChatPaneHeader"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-5 text-[12px] font-medium leading-[18px]">
              <div
                className={`flex items-center gap-1.5 pb-0.5 font-semibold ${isScheduler
                  ? 'text-indigo-600'
                  : 'border-b-2 border-[var(--ds-primary-action)] text-[var(--ds-primary-action)]'
                  }`}
              >
                <MessageCircle className="size-[14px] shrink-0" strokeWidth={1.75} aria-hidden />
                <span className="truncate tracking-tight">AI Chat</span>
              </div>
              {showHistory && !isScheduler ? (
                <div className="flex items-center gap-1.5 pb-0.5 text-[var(--ds-text-secondary)]">
                  <History className="size-[12px]" strokeWidth={1.5} aria-hidden />
                  History
                </div>
              ) : null}
            </div>
            {isScheduler ? (
              <button
                type="button"
                className="shrink-0 rounded-lg border border-[rgba(0,9,50,0.12)] bg-slate-50/90 px-3.5 py-2 text-[12px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
              >
                Tasks
              </button>
            ) : null}
          </div>
        </header>

        <div
          ref={chatScrollRef}
          className="min-h-0 flex-1 space-y-[16px] overflow-y-auto overflow-x-hidden overscroll-contain px-[50px] py-4 [scrollbar-gutter:stable]"
        >
          {chatItems.map((item) => (
            <ChatBubble
              key={item.id}
              item={item}
              sessionSeconds={sessionSeconds}
              onOpenSummary={onOpenSummary}
              highlightPatientSummary={ctaHints.has(CTA_HINT.OPEN_PREVISIT_SUMMARY)}
              onSchedulerViewUnconfirmed={onSchedulerViewUnconfirmed}
              onSchedulerViewNoShow={onSchedulerViewNoShow}
              schedulerChrome={isScheduler}
              onQuickAction={onQuickAction}
              ctaHints={ctaHints}
            />
          ))}
        </div>

        <div className="shrink-0 space-y-2 px-5 pb-5 pt-2">

          <div className="rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-4 pb-3 pt-3 shadow-[var(--ds-shadow-card)]">
            <textarea
              value={chatInput}
              onChange={(event) => onInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  onSubmit(chatInput);
                }
              }}
              className="min-h-[64px] w-full resize-none border-none bg-transparent font-['Inter',sans-serif] text-[14px] font-normal leading-[20px] text-[var(--ds-text-primary)] outline-none placeholder:text-[var(--ds-text-muted)]"
              placeholder={finalInputPlaceholder}
              aria-label="Message Eva"
            />
            <div className="mt-2 flex items-center justify-end gap-4 pt-2">
              <div className="flex justify-start flex-1" data-name="ChatPaneQuickActions">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(0,9,50,0.12)] bg-slate-50/80 px-3 py-2 text-[12px] font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
                >
                  Quick Actions
                  <ChevronDown className="size-3.5 opacity-70" strokeWidth={2} />
                </button>
              </div>
              <AudioControls size="md" />
              <button
                type="button"
                onClick={() => onSubmit(chatInput)}
                className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-[var(--ds-primary-action)] text-white"
                aria-label="Send message"
              >
                <Send className="size-[14px]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
