import { useEffect, useRef } from 'react';
import { History, MessageCircle, Send } from 'lucide-react';
import type { ChatItem, WorkflowStage } from '../../types';
import type { CtaHintId } from '../../utils/ctaHints';
import { CTA_HINT, ctaHighlightClass } from '../../utils/ctaHints';
import { AudioControls } from '../audio/AudioControls';
import { ChatBubble } from './ChatBubble';

function suggestionToCtaHint(label: string): CtaHintId | null {
  if (label === 'Open pre visit summary') return CTA_HINT.OPEN_PREVISIT_SUMMARY;
  if (label === 'Begin Session') return CTA_HINT.BEGIN_SESSION;
  return null;
}

export function ChatPane({
  chatItems,
  chatInput,
  onInputChange,
  onSubmit,
  onQuickAction,
  suggestions,
  stage,
  sessionSeconds,
  onOpenSummary,
  ctaHints,
}: {
  chatItems: ChatItem[];
  chatInput: string;
  onInputChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onQuickAction: (label: string) => void;
  suggestions: string[];
  stage: WorkflowStage;
  sessionSeconds: number;
  onOpenSummary: () => void;
  ctaHints: ReadonlySet<CtaHintId>;
}) {
  const showHistory = stage === 'session' || stage === 'sessionAccepted' || stage === 'sessionStopped';
  const finalInputPlaceholder =
    stage === 'finalized' ? 'Ask Eva anything — patients, insurance, schedule...' : 'Ask eva about your schedule...';
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chatScroll = chatScrollRef.current;
    if (!chatScroll) return;
    chatScroll.scrollTo({
      top: chatScroll.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatItems]);

  return (
    <div data-name="ChatPane" className="flex h-full min-h-0 flex-col overflow-hidden px-[40px] py-[40px]">
      <div className="mb-[20px] flex items-center gap-[20px] font-['Inter',sans-serif] text-[12px] font-medium leading-[18px]">
        <div className="flex items-center gap-[4px] border-b-2 border-[var(--ds-primary-action)] pb-[8px] font-semibold text-[var(--ds-primary-action)]">
          <MessageCircle className="size-[12px]" strokeWidth={1.5} aria-hidden />
          AI Chat
        </div>
        {showHistory && (
          <div className="flex items-center gap-[4px] pb-[8px] text-[var(--ds-text-secondary)]">
            <History className="size-[12px]" strokeWidth={1.5} aria-hidden />
            History
          </div>
        )}
      </div>

      <div ref={chatScrollRef} className="min-h-0 flex-1 space-y-[16px] overflow-y-auto pr-[12px]">
        {chatItems.map((item) => (
          <ChatBubble
            key={item.id}
            item={item}
            sessionSeconds={sessionSeconds}
            onOpenSummary={onOpenSummary}
            highlightPatientSummary={ctaHints.has(CTA_HINT.OPEN_PREVISIT_SUMMARY)}
          />
        ))}
      </div>

      <div className="mt-[20px]">
        <div className="mb-[12px] flex flex-wrap gap-[8px]">
          {suggestions.map((label) => {
            const hint = suggestionToCtaHint(label);
            const isCta = hint !== null && ctaHints.has(hint);
            return (
              <button
                key={label}
                type="button"
                onClick={() => onQuickAction(label)}
                {...(isCta && hint ? { 'data-cta-hint': hint } : {})}
                className={`rounded-[var(--ds-radius-pill)] border border-[var(--ds-border-accent)] px-[16px] py-[6px] font-['Inter',sans-serif] text-[12px] font-medium leading-[18px] text-[var(--ds-primary-action)] ${ctaHighlightClass(isCta, 'pill')}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-[16px] pb-[12px] pt-[8px] shadow-[var(--ds-shadow-card)]">
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
          <div className="flex items-center justify-end gap-[16px]">
            <AudioControls size="md" />
            <button
              type="button"
              onClick={() => onSubmit(chatInput)}
              className="flex size-[32px] items-center justify-center rounded-full bg-[var(--ds-primary-action)] text-white"
              aria-label="Send message"
            >
              <Send className="size-[14px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
