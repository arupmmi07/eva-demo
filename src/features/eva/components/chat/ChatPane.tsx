import { useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, History, ListChecks, MessageCircle } from 'lucide-react';
import { EvaLogo } from '../icons/EvaLogo';
import { SendHorizontalIcon } from '../icons/SendHorizontalIcon';
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
  onMoment3CheckIn,
  figmaWorkspaceShell,
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
  /** Moment3: primary action on the new-patient chat card. */
  onMoment3CheckIn?: () => void;
  /** Match `figma-make-moment3` chat workspace (header, transcript, Ask Eva). */
  figmaWorkspaceShell?: boolean;
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

  const figmaWs = Boolean(figmaWorkspaceShell);

  return (
    <div
      data-name="ChatPane"
      className={`box-border flex min-h-0 flex-1 flex-col font-['Inter',sans-serif] ${figmaWs ? 'm-0' : 'm-3'}`}
    >
      <div
        className={
          figmaWs
            ? 'flex min-h-0 flex-1 flex-col overflow-hidden rounded-[12px] border border-[rgba(0,0,0,0.12)] bg-white shadow-[0px_12px_32px_-16px_rgba(0,0,51,0.06),0px_8px_40px_0px_rgba(0,0,0,0.05)]'
            : 'flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] shadow-[var(--ds-shadow-card)]'
        }
      >
        <header
          className={
            figmaWs
              ? 'relative z-[3] min-h-[64px] w-full shrink-0 bg-white'
              : 'shrink-0 border-b border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-5 py-3'
          }
          data-name="ChatPaneHeader"
        >
          {figmaWs ? (
            <>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 border-b border-solid border-[rgba(0,0,0,0.12)]"
              />
              <div className="relative flex min-h-[64px] w-full flex-row items-center">
                <div className="flex size-full min-h-[inherit] items-center justify-between px-4 pb-[9px] pt-2">
                  <div className="flex min-w-0 flex-1 items-center gap-5">
                    <div className="flex min-w-0 items-center gap-3 pl-1">
                      <EvaLogo decorative />
                      <p className="shrink-0 whitespace-nowrap text-[16px] font-medium leading-6 text-[#020617]">
                        AI Chat
                      </p>
                    </div>
                    {showHistory && stage !== 'scheduler' ? (
                      <div className="flex shrink-0 items-center gap-1.5 text-[14px] font-medium leading-5 text-[#64748b]">
                        <History className="size-4 shrink-0" strokeWidth={1.25} aria-hidden />
                        History
                      </div>
                    ) : null}
                  </div>
                  {schedulerChromeVisual ? (
                    <button
                      type="button"
                      className="inline-flex h-8 shrink-0 items-center gap-2 rounded-[12px] border border-[rgba(0,0,0,0.12)] bg-white px-[9px] transition hover:bg-slate-50"
                    >
                      <ListChecks className="size-4 shrink-0 text-[#64748b]" strokeWidth={1.25} aria-hidden />
                      <span className="text-[14px] font-medium leading-6 text-[#020617]">Tasks</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-5 text-[12px] font-medium leading-[18px]">
                <div
                  className={`flex items-center gap-1.5 pb-0.5 font-semibold ${schedulerChromeVisual
                    ? 'text-indigo-600'
                    : 'border-b-2 border-[var(--ds-primary-action)] text-[var(--ds-primary-action)]'
                    }`}
                >
                  <MessageCircle className="size-[14px] shrink-0" strokeWidth={1.75} aria-hidden />
                  <span className="truncate tracking-tight">AI Chat</span>
                </div>
                {showHistory && stage !== 'scheduler' ? (
                  <div className="flex items-center gap-1.5 pb-0.5 text-[var(--ds-text-secondary)]">
                    <History className="size-[12px]" strokeWidth={1.5} aria-hidden />
                    History
                  </div>
                ) : null}
              </div>
              {schedulerChromeVisual ? (
                <button
                  type="button"
                  className="shrink-0 rounded-lg border border-[rgba(0,9,50,0.12)] bg-slate-50/90 px-3.5 py-2 text-[12px] font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
                >
                  Tasks
                </button>
              ) : null}
            </div>
          )}
        </header>

        <div
          ref={chatScrollRef}
          className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-gutter:stable] ${figmaWs ? 'px-8 py-6' : 'space-y-[16px] px-[50px] py-4'}`}
        >
          <div className={figmaWs ? 'mx-auto flex w-full max-w-[720px] flex-col gap-10' : 'contents'}>
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
                figmaWorkspaceChat={figmaWs}
                schedulerChrome={schedulerChromeVisual}
                onQuickAction={onQuickAction}
                ctaHints={ctaHints}
              />
            ))}
          </div>
        </div>

        <div className={`shrink-0 ${figmaWs ? 'bg-white px-4 pb-4 pt-2' : 'space-y-2 px-5 pb-5 pt-2'}`}>
          <div
            className={
              figmaWs
                ? 'mx-auto box-border flex h-[112px] w-full max-w-[720px] flex-col rounded-[12px] bg-[#f3f4f7] p-4'
                : 'rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-4 pb-3 pt-3 shadow-[var(--ds-shadow-card)]'
            }
          >
            <textarea
              value={chatInput}
              onChange={(event) => onInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  onSubmit(chatInput);
                }
              }}
              {...(figmaWs ? { rows: 1 as const } : {})}
              className={
                figmaWs
                  ? 'box-border h-[28px] min-h-[28px] w-full resize-none overflow-hidden border-none bg-transparent py-0 font-["Inter",sans-serif] text-[16px] font-normal leading-[28px] text-[#020617] outline-none placeholder:text-[#64748b]'
                  : 'min-h-[64px] w-full resize-none border-none bg-transparent font-["Inter",sans-serif] text-[14px] font-normal leading-[20px] text-[var(--ds-text-primary)] outline-none placeholder:text-[var(--ds-text-muted)]'
              }
              placeholder={finalInputPlaceholder}
              aria-label="Message Eva"
            />
            <div
              className={
                figmaWs
                  ? 'mt-5 flex h-8 min-h-8 shrink-0 items-center justify-between gap-2'
                  : 'mt-2 flex items-center justify-end gap-4 pt-2'
              }
            >
              <div className={`flex min-w-0 justify-start ${figmaWs ? '' : 'flex-1'}`} data-name="ChatPaneQuickActions">
                <button
                  type="button"
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium transition ${figmaWs ? 'h-8 bg-[#eaecf0] text-[#64748b] shadow-sm hover:bg-[#e2e5ea]' : 'rounded-lg border border-[rgba(0,9,50,0.12)] bg-slate-50/80 py-1.5 font-semibold text-slate-700 shadow-sm hover:bg-slate-100'}`}
                >
                  Quick Actions
                  {figmaWs ? (
                    <ChevronUp className="size-3.5 opacity-70" strokeWidth={2} aria-hidden />
                  ) : (
                    <ChevronDown className="size-3.5 opacity-70" strokeWidth={2} aria-hidden />
                  )}
                </button>
              </div>
              <div className={`flex shrink-0 items-center ${figmaWs ? 'gap-2' : 'gap-4'}`}>
                <AudioControls size="md" variant={figmaWs ? 'micOnly' : 'full'} />
                <button
                  type="button"
                  onClick={() => onSubmit(chatInput)}
                  className={
                    figmaWs
                      ? 'flex size-8 shrink-0 items-center justify-center rounded-[12px] bg-[var(--ds-bg-accent-purple)] text-[var(--ds-primary-action)] transition hover:bg-[#dfe8ff]'
                      : 'flex size-[32px] shrink-0 items-center justify-center rounded-full bg-[var(--ds-primary-action)] text-white'
                  }
                  aria-label="Send message"
                >
                  <SendHorizontalIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
