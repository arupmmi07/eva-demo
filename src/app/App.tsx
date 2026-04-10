import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  Circle,
  Clock3,
  FileText,
  Gauge,
  Grip,
  History,
  House,
  Menu,
  MessageCircle,
  Mic,
  MoreVertical,
  Pause,
  Play,
  Search,
  Send,
  Settings,
  Shield,
  Square,
  Stethoscope,
  User,
  Users,
  Zap,
} from 'lucide-react';
import imgPatient from 'figma:asset/454e804c0c0a65927356b922ba37d88ac95d6327.png';
import imgBodyDiagram from 'figma:asset/9eeb366f3badd324b6e7f1c56be9beca3b64d9d5.png';

type WorkflowStage =
  | 'dashboard'
  | 'summary'
  | 'summaryCustomizing'
  | 'summaryReady'
  | 'summaryAnswered'
  | 'session'
  | 'sessionAccepted'
  | 'sessionStopped'
  | 'finalized';

type ChatKind = 'eva' | 'user' | 'patient-card' | 'insight' | 'session-widget' | 'prompt';
type PanelMode = 'both' | 'leftOnly' | 'rightOnly';

interface ChatItem {
  id: string;
  kind: ChatKind;
  content?: string;
  timestamp?: string;
}

const TIMESTAMP = '8:47 AM';
const FINAL_CLARIFICATION =
  'actually, clarify that her flexion is 110 degrees, but she experiences a sharp catch specifically when descending stairs.';

function normalize(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

function formatClock(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (totalSeconds % 60).toString().padStart(2, '0');
  return `00:${mins}:${secs}`;
}

function App() {
  const [stage, setStage] = useState<WorkflowStage>('dashboard');
  const [chatItems, setChatItems] = useState<ChatItem[]>([
    {
      id: 'welcome',
      kind: 'eva',
      content:
        'Hi Dr. Maya — you have 6 patients today. 4 follow ups, and 2 evals. Diane is your next patient',
      timestamp: TIMESTAMP,
    },
    { id: 'patient-card', kind: 'patient-card', timestamp: TIMESTAMP },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [referralOpen, setReferralOpen] = useState(false);
  const [topSetupVisible, setTopSetupVisible] = useState(false);
  const [recordingActive, setRecordingActive] = useState(false);
  const [sessionPaused, setSessionPaused] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(274);
  const [showHighlight, setShowHighlight] = useState(false);
  const [sleepTableVisible, setSleepTableVisible] = useState(false);
  const [sleepDisturbanceAccepted, setSleepDisturbanceAccepted] = useState(false);
  const [chiefComplaint, setChiefComplaint] = useState(
    'Pain in the right shoulder and inability to move hand for overhead activities',
  );
  const [chiefComplaintFocused, setChiefComplaintFocused] = useState(false);
  const [mentionVisible, setMentionVisible] = useState(false);
  const [clarificationApplied, setClarificationApplied] = useState(false);
  const [panelMode, setPanelMode] = useState<PanelMode>('both');
  const highlightTimerRef = useRef<number | null>(null);

  const headerMode = useMemo(() => {
    if (stage === 'summaryCustomizing') return 'setup';
    if (stage === 'finalized') return 'share';
    if (stage === 'session' || stage === 'sessionAccepted') return 'session-disabled';
    if (stage === 'sessionStopped') return 'session-active';
    return 'default';
  }, [stage]);

  useEffect(() => {
    if (!recordingActive || sessionPaused) return;
    const timer = window.setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [recordingActive, sessionPaused]);

  useEffect(() => {
    if (stage !== 'session' || !recordingActive || showHighlight) return;
    highlightTimerRef.current = window.setTimeout(() => {
      setShowHighlight(true);
    }, 3000);
    return () => {
      if (highlightTimerRef.current) window.clearTimeout(highlightTimerRef.current);
    };
  }, [stage, recordingActive, showHighlight]);

  const suggestionButtons = useMemo(() => {
    if (stage === 'dashboard') {
      return ['Show me patient list', 'Open patient profile', 'Show pending notes', 'Check flagged cases'];
    }
    return ['Begin Session', 'Show allergies'];
  }, [stage]);

  const saveDraftEnabled = stage === 'sessionStopped';
  const reviewEnabled = stage === 'sessionStopped';

  const appendChat = (item: ChatItem) => {
    setChatItems((prev) => [...prev, item]);
  };

  const openSummary = () => {
    if (stage !== 'dashboard') return;
    setStage('summary');
    appendChat({
      id: `insight-${Date.now()}`,
      kind: 'insight',
      timestamp: TIMESTAMP,
      content:
        "I've pulled these insights from Diane's pre-visit surveys.\n\nHigh Fear-Avoidance: Patient may require extra verbal cueing and reassurance during PROM to manage protective guarding.\nSource: pre-eval survey TSK-11\n\nGoal Mismatch: Patient expects to return to high-level gardening within 6 weeks, but current DASH score suggests significant functional deficit. Recommend setting intermediate 'micro-goals' to manage expectations.\n\nWould you like to start the session or review intake?",
    });
    appendChat({
      id: `eva-summary-${Date.now()}`,
      kind: 'eva',
      timestamp: TIMESTAMP,
      content: 'Sure let me bring Diane M profile before we start the session. You can check her profile right here →',
    });
  };

  const openSummaryFromUser = () => {
    appendChat({
      id: `user-open-summary-${Date.now()}`,
      kind: 'user',
      content: 'Open pre visit summary',
      timestamp: '07:53 PM',
    });
    openSummary();
  };

  const closeReferral = () => {
    setReferralOpen(false);
    setTopSetupVisible(true);
    setStage('summaryCustomizing');
  };

  const resolveCustomization = () => {
    setTopSetupVisible(false);
    setStage('summaryReady');
  };

  const answerComorbidities = () => {
    if (!['summary', 'summaryCustomizing', 'summaryReady', 'summaryAnswered'].includes(stage)) return;
    if (stage === 'summaryAnswered') return;
    setStage('summaryAnswered');
    appendChat({
      id: `user-comorb-${Date.now()}`,
      kind: 'user',
      content: 'Any comorbidities I should be aware of?',
      timestamp: '07:53 PM',
    });
    appendChat({
      id: `eva-comorb-${Date.now()}`,
      kind: 'eva',
      timestamp: TIMESTAMP,
      content:
        "None documented. Past medical history states no significant history. Prognosis is good given her motivation and no complicating factors.\n\nIs there anything else you'd like to know before you begin your session?",
    });
  };

  const beginSession = () => {
    if (!['summary', 'summaryReady', 'summaryAnswered'].includes(stage)) return;
    setStage('session');
    setRecordingActive(true);
    setSessionPaused(false);
    appendChat({
      id: `user-begin-${Date.now()}`,
      kind: 'user',
      content: 'Begin Session',
      timestamp: '07:53 PM',
    });
    appendChat({
      id: `eva-begin-${Date.now()}`,
      kind: 'eva',
      timestamp: TIMESTAMP,
      content:
        "I've pre-filled initial intake details into the note. I'll continue capturing as you speak. You can start naturally. I'm listening..",
    });
    appendChat({
      id: `widget-${Date.now()}`,
      kind: 'session-widget',
      timestamp: TIMESTAMP,
    });
  };

  const acceptSleepSuggestion = () => {
    setSleepTableVisible(false);
    setSleepDisturbanceAccepted(true);
    setStage('sessionAccepted');
  };

  const stopSession = () => {
    setRecordingActive(false);
    setSessionPaused(false);
    setPanelMode('rightOnly');
    setStage('sessionStopped');
  };

  const finalizeReview = () => {
    if (!reviewEnabled) return;
    setStage('finalized');
  };

  const submitChat = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setChatInput('');
    const normalized = normalize(text);

    if ((stage === 'dashboard' || stage === 'summary') && normalized === 'open pre visit summary') {
      appendChat({ id: `user-open-${Date.now()}`, kind: 'user', content: text, timestamp: '07:53 PM' });
      openSummary();
      return;
    }

    if (
      ['summary', 'summaryCustomizing', 'summaryReady', 'summaryAnswered'].includes(stage) &&
      normalized === 'begin session'
    ) {
      appendChat({ id: `user-begin-chat-${Date.now()}`, kind: 'user', content: text, timestamp: '07:53 PM' });
      beginSession();
      return;
    }

    if (
      ['summary', 'summaryCustomizing', 'summaryReady', 'summaryAnswered'].includes(stage) &&
      normalized === 'any comorbidities i should be aware of?'
    ) {
      answerComorbidities();
      return;
    }

    if (stage === 'finalized' && normalized === FINAL_CLARIFICATION) {
      appendChat({ id: `user-fix-${Date.now()}`, kind: 'user', content: text, timestamp: '07:53 PM' });
      appendChat({
        id: `eva-fix-${Date.now()}`,
        kind: 'eva',
        content: 'Updated pain details.',
        timestamp: TIMESTAMP,
      });
      appendChat({
        id: `eva-verify-${Date.now()}`,
        kind: 'prompt',
        content: 'Do you want to verify Complete Source details?',
        timestamp: TIMESTAMP,
      });
      setClarificationApplied(true);
      return;
    }

    appendChat({ id: `user-generic-${Date.now()}`, kind: 'user', content: text, timestamp: '07:53 PM' });
  };

  const togglePause = () => {
    if (!recordingActive) return;
    setSessionPaused((prev) => !prev);
  };

  const selectSuggestion = (label: string) => {
    if (label === 'Open pre visit summary') {
      openSummaryFromUser();
      return;
    }
    if (label === 'Begin Session') {
      beginSession();
      return;
    }
  };

  const handleChiefComplaintChange = (value: string) => {
    setChiefComplaint(value);
    setMentionVisible(value.includes('@'));
  };

  const insertMention = (value: string) => {
    setChiefComplaint((prev) => prev.replace(/@[^ ]*$/, value));
    setMentionVisible(false);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f7f7fb] text-[#20253b]">
      <div className="flex h-full">
        <AppRail />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <TopHeader
            mode={headerMode}
            saveDraftEnabled={saveDraftEnabled}
            reviewEnabled={reviewEnabled}
            onFinalize={finalizeReview}
            setupVisible={topSetupVisible}
            onSetupResolve={resolveCustomization}
          />

          <div className="relative flex min-h-0 flex-1 overflow-hidden">
            <div
              className={`grid min-h-0 min-w-0 flex-1 overflow-hidden ${
                panelMode === 'both'
                  ? 'grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'
                  : panelMode === 'leftOnly'
                    ? 'grid-cols-[minmax(0,1fr)_0px]'
                    : 'grid-cols-[0px_minmax(0,1fr)]'
              }`}
            >
              <section className="relative min-h-0 min-w-0 overflow-hidden border-r border-[#ececf6] bg-white">
                <ChatPane
                  chatItems={chatItems}
                  chatInput={chatInput}
                  onInputChange={setChatInput}
                  onSubmit={submitChat}
                  onQuickAction={selectSuggestion}
                  suggestions={suggestionButtons}
                  stage={stage}
                  sessionSeconds={sessionSeconds}
                  onOpenSummary={openSummaryFromUser}
                />
              </section>

              <section className="relative min-h-0 min-w-0 overflow-hidden bg-[#fbfbfe]">
                <RightPane
                  stage={stage}
                  referralOpen={referralOpen}
                  topSetupVisible={topSetupVisible}
                  recordingActive={recordingActive}
                  sessionPaused={sessionPaused}
                  sessionSeconds={sessionSeconds}
                  showHighlight={showHighlight}
                  sleepTableVisible={sleepTableVisible}
                  sleepDisturbanceAccepted={sleepDisturbanceAccepted}
                  chiefComplaint={chiefComplaint}
                  chiefComplaintFocused={chiefComplaintFocused}
                  mentionVisible={mentionVisible}
                  clarificationApplied={clarificationApplied}
                  leftPanelCollapsed={panelMode === 'rightOnly'}
                  onOpenSummary={openSummaryFromUser}
                  onOpenReferral={() => setReferralOpen(true)}
                  onCloseReferral={closeReferral}
                  onBeginSession={beginSession}
                  onSleepPosition={() => setSleepTableVisible(true)}
                  onAcceptSleep={acceptSleepSuggestion}
                  onPause={togglePause}
                  onStop={stopSession}
                  onChiefComplaintChange={handleChiefComplaintChange}
                  onChiefComplaintFocus={setChiefComplaintFocused}
                  onSelectMention={insertMention}
                />
              </section>
            </div>

            <CenterDock panelMode={panelMode} onPanelModeChange={setPanelMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TopHeader({
  mode,
  saveDraftEnabled,
  reviewEnabled,
  onFinalize,
  setupVisible,
  onSetupResolve,
}: {
  mode: 'default' | 'setup' | 'session-disabled' | 'session-active' | 'share';
  saveDraftEnabled: boolean;
  reviewEnabled: boolean;
  onFinalize: () => void;
  setupVisible: boolean;
  onSetupResolve: () => void;
}) {
  return (
    <header className="flex h-[54px] items-center justify-between border-b border-[#ececf6] bg-white px-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#5c44f4] text-white">
          <span className="text-[11px] font-semibold">//</span>
        </div>
        <span className="text-[13px] font-semibold text-[#23263b]">My Dashboard</span>
      </div>

      <div className="flex items-center gap-2">
        {setupVisible && mode === 'setup' && (
          <>
            <button
              onClick={onSetupResolve}
              className="rounded-lg border border-[#e7e7f3] px-3 py-1.5 text-[12px] text-[#535b76]"
            >
              Cancel
            </button>
            <button
              onClick={onSetupResolve}
              className="rounded-lg border border-[#ece8ff] bg-[#f7f4ff] px-3 py-1.5 text-[12px] font-semibold text-[#6448f6]"
            >
              Save for similar profile
            </button>
            <button
              onClick={onSetupResolve}
              className="rounded-lg bg-[#5237ec] px-3 py-1.5 text-[12px] font-semibold text-white"
            >
              Save as Default
            </button>
          </>
        )}

        {(mode === 'session-disabled' || mode === 'session-active') && (
          <>
            <button
              disabled={!saveDraftEnabled}
              className="rounded-lg border border-[#e7e7f3] px-3 py-1.5 text-[12px] text-[#535b76] disabled:opacity-45"
            >
              Save Draft
            </button>
            <button
              disabled={!reviewEnabled}
              onClick={onFinalize}
              className="rounded-lg bg-[#5237ec] px-3 py-1.5 text-[12px] font-semibold text-white disabled:opacity-45"
            >
              Review &amp; Finalise →
            </button>
          </>
        )}

        {mode === 'share' && (
          <button className="rounded-lg bg-[#4928e6] px-4 py-2 text-[12px] font-semibold text-white">Share with Patient</button>
        )}

        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e6e9f5] text-[#6f7494]">
          <Bell size={14} />
        </button>
      </div>
    </header>
  );
}

function AppRail() {
  const icons = [ChevronLeft, Search, House, MessageCircle, Users, Calendar, FileText, Shield, Clock3];
  return (
    <aside className="flex w-[36px] flex-col items-center border-r border-[#ececf6] bg-white py-2">
      <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-md bg-[#5c44f4] text-white">
        <span className="text-[11px] font-semibold">//</span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-3">
        {icons.map((Icon, index) => {
          const active = index === 2;
          return (
            <button
              key={index}
              className={`flex h-7 w-7 items-center justify-center rounded-md ${
                active ? 'bg-[#f0ecff] text-[#5b43f4]' : 'text-[#8187a2]'
              }`}
            >
              <Icon size={14} />
            </button>
          );
        })}
      </div>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ede8ff] text-[10px] font-semibold text-[#6b52f8]">
        AK
      </div>
    </aside>
  );
}

function CenterDock({
  panelMode,
  onPanelModeChange,
}: {
  panelMode: PanelMode;
  onPanelModeChange: (mode: PanelMode) => void;
}) {
  const dockPositionClass =
    panelMode === 'rightOnly'
      ? 'left-3 translate-x-0'
      : panelMode === 'leftOnly'
        ? 'right-3 translate-x-0'
        : 'left-1/2 -translate-x-1/2';

  return (
    <div className={`absolute top-1/2 z-30 -translate-y-1/2 ${dockPositionClass}`}>
      <div className="flex flex-col gap-1 rounded-xl border border-[#ececf6] bg-white p-1.5 shadow-[0_8px_24px_rgba(66,55,140,0.08)]">
        <PanelToggleButton
          label="Collapse right panel"
          active={panelMode === 'leftOnly'}
          onClick={() => onPanelModeChange('leftOnly')}
          variant="left"
        />
        <PanelToggleButton
          label="Show both panels"
          active={panelMode === 'both'}
          onClick={() => onPanelModeChange('both')}
          variant="split"
        />
        <PanelToggleButton
          label="Collapse left panel"
          active={panelMode === 'rightOnly'}
          onClick={() => onPanelModeChange('rightOnly')}
          variant="right"
        />
      </div>
    </div>
  );
}

function PanelToggleButton({
  label,
  active,
  onClick,
  variant,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant: 'left' | 'split' | 'right';
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
        active ? 'bg-[#f0ecff] text-[#5b43f4]' : 'text-[#9aa0b8] hover:bg-[#f8f7ff] hover:text-[#5b43f4]'
      }`}
    >
      <SplitPanelIcon variant={variant} />
    </button>
  );
}

function SplitPanelIcon({ variant }: { variant: 'left' | 'split' | 'right' }) {
  const leftActive = variant === 'left' || variant === 'split';
  const rightActive = variant === 'right' || variant === 'split';

  return (
    <span className="flex h-[14px] w-[16px] overflow-hidden rounded-[3px] border border-current">
      <span className={`h-full flex-1 ${leftActive ? 'bg-current' : 'bg-transparent'}`} />
      <span className="h-full w-px bg-current opacity-60" />
      <span className={`h-full flex-1 ${rightActive ? 'bg-current' : 'bg-transparent'}`} />
    </span>
  );
}

function ChatPane({
  chatItems,
  chatInput,
  onInputChange,
  onSubmit,
  onQuickAction,
  suggestions,
  stage,
  sessionSeconds,
  onOpenSummary,
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
    <div className="flex h-full min-h-0 flex-col overflow-hidden px-16 py-10">
      <div className="mb-5 flex items-center gap-5 text-[12px]">
        <div className="flex items-center gap-1 border-b-2 border-[#6550f5] pb-2 font-semibold text-[#6550f5]">
          <MessageCircle size={12} />
          AI Chat
        </div>
        {showHistory && (
          <div className="flex items-center gap-1 pb-2 text-[#9aa0b8]">
            <History size={12} />
            History
          </div>
        )}
      </div>

      <div ref={chatScrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-3">
        {chatItems.map((item) => (
          <ChatBubble key={item.id} item={item} sessionSeconds={sessionSeconds} onOpenSummary={onOpenSummary} />
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestions.map((label) => (
            <button
              key={label}
              onClick={() => onQuickAction(label)}
              className="rounded-full border border-[#7061f2] px-4 py-1.5 text-[12px] font-medium text-[#4e42d6]"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="rounded-[18px] border border-[#e6dffd] bg-white px-4 pb-3 pt-2 shadow-[0_8px_30px_rgba(117,86,255,0.05)]">
          <textarea
            value={chatInput}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                onSubmit(chatInput);
              }
            }}
            className="min-h-[64px] w-full resize-none border-none bg-transparent text-[14px] text-[#2a2d42] outline-none placeholder:text-[#a5abc1]"
            placeholder={finalInputPlaceholder}
          />
          <div className="flex items-center justify-end gap-4 text-[#7d859f]">
            <button className="text-[#7d859f]">
              <Mic size={16} />
            </button>
            <button className="text-[#7d859f]">
              <Play size={16} />
            </button>
            <button className="text-[#7d859f]">
              <Gauge size={16} />
            </button>
            <button
              onClick={() => onSubmit(chatInput)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5a48f5] text-white"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({
  item,
  sessionSeconds,
  onOpenSummary,
}: {
  item: ChatItem;
  sessionSeconds: number;
  onOpenSummary: () => void;
}) {
  if (item.kind === 'patient-card') {
    return (
      <div className="w-full max-w-[390px] rounded-[18px] border border-[#e9eaf5] bg-white p-4 shadow-[0_10px_24px_rgba(54,60,114,0.04)]">
        <div className="flex items-start gap-3">
          <img src={imgPatient} alt="Diane M" className="h-10 w-10 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between gap-3">
              <div>
                <p className="text-[14px] font-semibold text-[#1f2438]">Diane M</p>
                <p className="text-[12px] text-[#707895]">(Brachial Plexus Injury) is ready for evaluation.</p>
              </div>
              <span className="rounded-md bg-[#eef3ff] px-2 py-1 text-[10px] font-semibold text-[#6a8ff7]">Checked in</span>
            </div>
            <div className="mt-3 text-[12px] text-[#434a64]">
              <p className="mb-1 font-semibold">Intake flags:</p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Pain level reported: 7/10</li>
                <li>Tingling in fingers</li>
                <li>Post-surgical case (6 weeks)</li>
              </ul>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Tag tone="amber">New patient</Tag>
              <Tag tone="purple">Intake evaluation</Tag>
              <Tag tone="rose">Latex Allergy</Tag>
            </div>
            <button
              onClick={onOpenSummary}
              className="mt-3 rounded-lg bg-[#4e2dec] px-3 py-2 text-[12px] font-semibold text-white"
            >
              Open pre visit summary
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (item.kind === 'insight') {
    return (
      <div className="w-full max-w-[390px] rounded-[18px] border border-[#e9eaf5] bg-white p-4 text-[13px] leading-6 text-[#2d3146] shadow-[0_10px_24px_rgba(54,60,114,0.04)] whitespace-pre-line">
        {item.content}
        <div className="mt-2 text-[11px] text-[#a0a5bc]">{item.timestamp}</div>
      </div>
    );
  }

  if (item.kind === 'session-widget') {
    return (
      <div className="w-full max-w-[390px] rounded-[18px] border border-[#e4e7f6] bg-white p-4 shadow-[0_10px_24px_rgba(54,60,114,0.04)]">
        <p className="text-[14px] font-semibold text-[#2a3042]">Session Started</p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-[20px] font-medium tracking-[0.1em] text-[#303651]">{formatClock(sessionSeconds)}</p>
            <div className="mt-2 flex items-center gap-1.5">
              {[8, 13, 10, 18, 7, 16, 9, 12, 5, 14, 8, 15, 11].map((height, index) => (
                <span
                  key={index}
                  className="block rounded-full bg-[#5c4bf5]"
                  style={{ height: `${height}px`, width: '2px', opacity: index > 6 ? 0.2 : 1 }}
                />
              ))}
            </div>
          </div>
          <button className="rounded-xl border border-[#dadcf0] px-3 py-2 text-[12px] font-semibold text-[#545b76]">View Transcript</button>
        </div>
        <div className="mt-2 text-[11px] text-[#a0a5bc]">{item.timestamp}</div>
      </div>
    );
  }

  if (item.kind === 'prompt') {
    return (
      <div className="w-fit max-w-[390px] rounded-full border border-[#d5c58d] bg-[#fffaf1] px-4 py-2 text-[12px] font-medium text-[#635739]">
        {item.content}
      </div>
    );
  }

  const isUser = item.kind === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`${isUser ? 'max-w-[260px]' : 'w-full max-w-[390px]'}`}>
        {!isUser && (
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7a7feb]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#efeaff] text-[#6a54f7]">✦</span>
            EVA
          </div>
        )}
        <div
          className={`rounded-[18px] px-4 py-3 text-[14px] leading-6 shadow-[0_10px_24px_rgba(54,60,114,0.04)] ${
            isUser
              ? 'bg-gradient-to-r from-[#5f43f6] to-[#7e4cff] text-white'
              : 'border border-[#e9eaf5] bg-white text-[#2d3146]'
          }`}
        >
          {item.content}
        </div>
        <div className={`mt-1 text-[11px] text-[#b1b6ca] ${isUser ? 'text-right' : ''}`}>{item.timestamp}</div>
      </div>
    </div>
  );
}

function RightPane(props: {
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
  onBeginSession: () => void;
  onSleepPosition: () => void;
  onAcceptSleep: () => void;
  onPause: () => void;
  onStop: () => void;
  onChiefComplaintChange: (value: string) => void;
  onChiefComplaintFocus: (focused: boolean) => void;
  onSelectMention: (value: string) => void;
}) {
  const {
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
  } = props;

  if (stage === 'dashboard') {
    return (
      <div className="h-full overflow-y-auto">
        <DashboardSurface onOpenSummary={props.onOpenSummary} />
      </div>
    );
  }

  if (stage === 'finalized') {
    return (
      <div className="h-full overflow-y-auto">
        <FinalizedSurface clarificationApplied={clarificationApplied} />
      </div>
    );
  }

  if (stage === 'summary' || stage === 'summaryCustomizing' || stage === 'summaryReady' || stage === 'summaryAnswered') {
    return (
      <div className="relative h-full overflow-y-auto px-8 py-8">
        <SummarySurface
          disabledActions={topSetupVisible}
          topSetupVisible={topSetupVisible}
          answered={stage === 'summaryAnswered'}
          onOpenReferral={onOpenReferral}
          onBeginSession={onBeginSession}
        />
        {referralOpen && <ReferralDrawer onClose={onCloseReferral} />}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-8 py-6">
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
      />
    </div>
  );
}

function DashboardSurface({ onOpenSummary }: { onOpenSummary: () => void }) {
  return (
    <div className="flex min-h-full items-start justify-center px-10 py-9">
      <div className="w-full max-w-[430px] space-y-5">
        <DashboardCard
          icon={<img src={imgPatient} alt="Diane M" className="h-8 w-8 rounded-xl object-cover" />}
          title="Your First Patient Diane M"
          subtitle="Initial Eval"
          action="Open pre-visit summary"
          onAction={onOpenSummary}
        />
        <DashboardCard icon={<Calendar size={18} className="text-[#74bfa1]" />} title="Today's Patients" subtitle="8 Patients" badge="4 Checked In" />
        <DashboardCard icon={<Zap size={18} className="text-[#6d75f9]" />} title="Notes Incomplete" subtitle="2 need attention" badge="4" />
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard compact icon={<FileText size={18} className="text-[#9aa0b8]" />} title="Authorizations Expired" />
          <DashboardCard compact icon={<FileText size={18} className="text-[#9aa0b8]" />} title="Plan of Care Expired" />
        </div>
        <DashboardCard icon={<FileText size={18} className="text-[#f59c62]" />} title="Mid-Treatment Referral Received" subtitle="2 Items" badge="2" />
        <DashboardCard icon={<MessageCircle size={18} className="text-[#80d9ab]" />} title="New Messages" subtitle="3 Clinic | 2 Patients" badge="6" />
        <DashboardCard icon={<FileText size={18} className="text-[#9aa0b8]" />} title="Co-Signatures Pending" subtitle="2 Items" />
        <div className="flex justify-center pt-2">
          <button className="rounded-lg bg-[#f4f0ff] px-4 py-2 text-[12px] font-semibold text-[#6a56f5]">Customize Dashboard</button>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  subtitle,
  badge,
  action,
  onAction,
  compact = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  action?: string;
  onAction?: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-[18px] border border-[#e8e8f4] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(54,60,114,0.04)] ${compact ? 'min-h-[112px]' : ''}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#eef0f7] bg-[#fafbff]">{icon}</div>
          <div>
            <p className="text-[14px] font-semibold text-[#20253b]">{title}</p>
            {subtitle && <p className="mt-1 text-[13px] text-[#7f869f]">{subtitle}</p>}
          </div>
        </div>
        {action && (
          <button onClick={onAction} className="text-[14px] font-medium text-[#70c49d]">
            {action}
          </button>
        )}
        {badge && !action && <span className="text-[14px] font-semibold text-[#70c49d]">{badge}</span>}
      </div>
    </div>
  );
}

function SummarySurface({
  disabledActions,
  topSetupVisible,
  answered,
  onOpenReferral,
  onBeginSession,
}: {
  disabledActions: boolean;
  topSetupVisible: boolean;
  answered: boolean;
  onOpenReferral: () => void;
  onBeginSession: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-[#e7e7f3] bg-white p-5 shadow-[0_12px_30px_rgba(60,66,124,0.04)]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[28px] font-semibold tracking-tight text-[#22253b]">Pre-Visit Patient Summary</h2>
            <div className="mt-4 flex items-center gap-4">
              <img src={imgPatient} alt="Diane M" className="h-14 w-14 rounded-2xl object-cover" />
              <div>
                <p className="text-[28px] font-semibold text-[#22253b]">Diane M</p>
                <p className="text-[14px] text-[#9da2b9]">ID: #1123-K · Age: 58y</p>
                <div className="mt-2 flex gap-2">
                  <Tag tone="amber">New patient</Tag>
                  <Tag tone="purple">Intake evaluation</Tag>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button disabled={disabledActions} className="rounded-xl border border-[#dad8fd] px-4 py-2 text-[13px] font-semibold text-[#6b59f5] disabled:opacity-40">
              <span className="inline-flex items-center gap-1">
                <User size={14} />
                Patient profile
              </span>
            </button>
            <button
              disabled={disabledActions}
              onClick={onBeginSession}
              className="rounded-xl bg-[#4b32eb] px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-40"
            >
              Begin session
            </button>
            <button disabled={disabledActions} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ececf5] text-[#b0b4c8] disabled:opacity-40">
              <Settings size={15} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_160px] gap-4">
          <PanelCard
            title="Chief complaint"
            titleIcon={<Stethoscope size={14} className="text-[#7c6bf7]" />}
            rightSlot={topSetupVisible ? <MoreVertical size={14} className="text-[#a3a7bb]" /> : undefined}
          >
            Severe right shoulder pain and limited range of motion following a fall 3 days ago. Patient reports sharp pain
            (8/10) with overhead movements and difficulty sleeping on right side.
          </PanelCard>

          <PanelCard title="First visit" compact rightSlot={<Tag tone="amber">Today</Tag>}>
            <div className="pt-2">
              <p className="text-[34px] font-semibold text-[#272c44]">Apr 14 <span className="text-[18px] text-[#b2b6ca]">2026</span></p>
              <p className="mt-2 text-[12px] text-[#a0a5bc]">Intake evaluation</p>
            </div>
          </PanelCard>
        </div>

        <div className="mt-4 rounded-[22px] border border-[#ececf5] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[18px] font-semibold text-[#2d3146]">Referred by</p>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenReferral}
                className="rounded-lg bg-[#f6f3ff] px-4 py-2 text-[13px] font-semibold text-[#6551f5]"
              >
                View Referral Document
              </button>
              {topSetupVisible && <MoreVertical size={14} className="text-[#a3a7bb]" />}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-[13px]">
            <SummaryFact label="Provider" value="Dr. Samantha Wickram, MD" />
            <SummaryFact label="Specialty" value="Orthopedic Surgery" />
            <SummaryFact label="Date referred" value="Mar 12, 2026" />
          </div>
          <div className="mt-4 rounded-xl border border-[#99efbf] bg-[#ebfff1] p-3 text-[13px] font-medium text-[#4e596d]">
            Arthroscopic rotator cuff repair performed. Recommend conservative PT approach with reassessment in 6 weeks.
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-3 text-[18px] font-semibold text-[#b1b5c7]">Pain assessment</p>
          <div className={`grid grid-cols-2 gap-4 ${topSetupVisible ? 'items-start' : ''}`}>
            <PanelCard title="Current pain level" titleIcon={<TriangleIcon />} rightSlot={topSetupVisible ? <MoreVertical size={14} className="text-[#a3a7bb]" /> : undefined}>
              <div className="flex items-end justify-between">
                <span className="text-[58px] font-semibold leading-none text-[#eb6a4f]">8</span>
                <span className="pb-2 text-[14px] text-[#adb2c7]">out of 10</span>
              </div>
              <div className="mt-4 h-3 rounded-full bg-gradient-to-r from-[#8bcf6a] via-[#efc944] to-[#e57749]" />
              <div className="mt-2 flex justify-between text-[11px] text-[#c0c4d6]">
                <span>No pain</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                <DetailPill label="Pain type" value="Sharp, stabbing" />
                <DetailPill label="Frequency" value="Constant" />
                <DetailPill label="Aggravating factors" value="Overhead reach" />
                <DetailPill label="Relieving factors" value="Rest, ice" />
              </div>
            </PanelCard>

            <div className={topSetupVisible ? 'relative z-10 translate-x-[-44px] translate-y-[-28px]' : ''}>
              <PanelCard
                title="Pain location"
                titleIcon={<MapPinMini />}
                rightSlot={topSetupVisible ? <MoreVertical size={14} className="text-[#a3a7bb]" /> : undefined}
              >
                <div className={`rounded-[18px] ${topSetupVisible ? 'border border-[#a7bcff] bg-white p-4 shadow-[0_24px_48px_rgba(95,104,200,0.18)]' : 'bg-[#fafbfe] p-4'}`}>
                  <div className="flex justify-center">
                    <img src={imgBodyDiagram} alt="Body diagram" className="h-[220px] object-contain" />
                  </div>
                  <div className="mt-4 rounded-xl border border-[#eef0f7] bg-white px-4 py-3 text-[13px] text-[#4e556d]">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#ee775b]" />
                    Right shoulder (anterior)
                  </div>
                </div>
              </PanelCard>
            </div>
          </div>
        </div>

        {answered && (
          <div className="mt-4 rounded-xl border border-[#e8ebf6] bg-[#fafbff] p-4 text-[13px] text-[#616783]">
            No significant past medical history.
          </div>
        )}
      </div>
    </div>
  );
}

function ReferralDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-20 flex bg-[rgba(32,37,59,0.18)]">
      <div className="flex-1" />
      <div className="h-full w-[56%] min-w-[520px] overflow-y-auto border-l border-[#e7e7f3] bg-white p-6 shadow-[-24px_0_48px_rgba(64,72,120,0.14)]">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="h-10 w-1 rounded-full bg-[#4256f1]" />
            <div>
              <h3 className="text-[28px] font-semibold text-[#2a2e43]">Physical Therapy Referral</h3>
              <p className="text-[12px] text-[#9ba1b8]">Clinical Ledger Reference ID: #RX-2024-0812</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f6fb] text-[#99a0ba]">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 text-[12px]">
          <SummaryFact label="Patient Name" value="Diane M" />
          <SummaryFact label="MRN" value="104992-8" />
          <SummaryFact label="Date of Birth" value="04/22/1985" />
        </div>

        <div className="mt-6 space-y-5">
          <ReferralSection
            index="01"
            title="Physician & Provider Details"
            rows={[
              ['Referring Physician', 'Dr. Samantha Wickram, MD'],
              ['NPI Number', '1285093341'],
              ['Clinic Phone', '(555) 123-4567'],
              ['Address', '900 Clinical Way, Suite 402, Metro City'],
            ]}
          />
          <ReferralSection
            index="02"
            title="Clinical Diagnosis (ICD-10)"
            rows={[
              ['Primary Diagnosis', 'e.g. Chronic low back pain, unspecified'],
              ['ICD-10 Code', 'M54.50'],
              ['Secondary Diagnosis', 'e.g. Spondylosis without myelopathy or radiculopathy'],
              ['ICD-10 Code', 'M47.817'],
            ]}
          />
          <ReferralSection
            index="03"
            title="Treatment Parameters"
            rows={[
              ['Frequency', '2-3 Times Week'],
              ['Duration', '4-6 Weeks'],
            ]}
          />
          <div className="rounded-[18px] border border-[#ececf5] p-5">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#7a819c]">Rehab Interventions</p>
            <div className="grid grid-cols-2 gap-3 text-[13px] text-[#4d536d]">
              {[
                'Therapeutic Exercise (Strength/Flexibility)',
                'Neuromuscular Re-education',
                'Manual Therapy / Mobilization',
                'Gait Training',
                'Soft Tissue Mobilization (STM)',
                'Kinesiology Taping',
                'Ergonomic / Home Safety Instruction',
              ].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="accent-[#5f48f4]" />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-[18px] border border-[#ececf5] p-5">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#7a819c]">Clinical Precautions &amp; Notes</p>
            <div className="h-24 rounded-xl bg-[#f7f8fc]" />
            <div className="mt-10 flex items-center justify-between text-[13px] text-[#59607b]">
              <p className="font-serif text-[18px] italic text-[#7081bf]">Samantha Wickram, MD</p>
              <p className="text-[26px] font-semibold text-[#44495f]">March 12, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SoapSurface({
  stage,
  recordingActive,
  sessionPaused,
  sessionSeconds,
  showHighlight,
  sleepTableVisible,
  sleepDisturbanceAccepted,
  chiefComplaint,
  chiefComplaintFocused,
  mentionVisible,
  leftPanelCollapsed,
  onSleepPosition,
  onAcceptSleep,
  onPause,
  onStop,
  onChiefComplaintChange,
  onChiefComplaintFocus,
  onSelectMention,
}: {
  stage: WorkflowStage;
  recordingActive: boolean;
  sessionPaused: boolean;
  sessionSeconds: number;
  showHighlight: boolean;
  sleepTableVisible: boolean;
  sleepDisturbanceAccepted: boolean;
  chiefComplaint: string;
  chiefComplaintFocused: boolean;
  mentionVisible: boolean;
  leftPanelCollapsed: boolean;
  onSleepPosition: () => void;
  onAcceptSleep: () => void;
  onPause: () => void;
  onStop: () => void;
  onChiefComplaintChange: (value: string) => void;
  onChiefComplaintFocus: (focused: boolean) => void;
  onSelectMention: (value: string) => void;
}) {
  const showRecordingControls = stage === 'session' || stage === 'sessionAccepted';
  const showGeneratedSoap = showHighlight || stage === 'sessionAccepted' || stage === 'sessionStopped';
  const subjectiveEditable = stage === 'session' || stage === 'sessionAccepted' || stage === 'sessionStopped';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-[22px] border border-[#ececf5] bg-white px-5 py-4">
        <h2 className="text-[30px] font-semibold tracking-tight text-[#262b40]">SOAP Note</h2>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-[#f0d8d8] px-4 py-1.5 text-[13px] font-semibold text-[#d75448]">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#e25b48]" />
            REC {formatClock(sessionSeconds)}
          </div>
          {showRecordingControls && (
            <>
              <button onClick={onPause} className="rounded-lg border border-[#e7e7f3] px-4 py-2 text-[13px] text-[#606884]">
                {sessionPaused ? 'Resume' : 'Pause'}
              </button>
              <button onClick={onStop} className="rounded-lg border border-[#e7e7f3] px-4 py-2 text-[13px] text-[#606884]">
                Stop
              </button>
            </>
          )}
        </div>
      </div>

      <div className="rounded-[22px] border border-[#ececf5] bg-white">
        <div className="flex items-center justify-between border-b border-[#ececf5] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6a61f1] text-[13px] font-semibold text-white">S</div>
            <p className="text-[18px] font-semibold text-[#2a2f45]">Subjective</p>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[#adb2c7]">
            3 items
            <ChevronDown size={14} />
          </div>
        </div>

        {showGeneratedSoap && (
          <div className="border-b border-[#ececf5] px-5 py-3">
            <p className="mb-2 text-[13px] font-semibold text-[#6b5af4]">✦ AI Suggestions</p>
            <div className="flex flex-wrap gap-2">
              <SmallChip>Grip Strength</SmallChip>
              <SmallChip active={sleepTableVisible} onClick={onSleepPosition}>
                Sleep Position
              </SmallChip>
              <SmallChip>Pain Medication Use</SmallChip>
              <SmallChip>Radiation Pattern</SmallChip>
              <SmallChip>ADL Functional Screen</SmallChip>
            </div>
          </div>
        )}

        <div className="space-y-5 px-5 py-4">
          {sleepTableVisible && (
            <div className="overflow-hidden rounded-xl border border-[#dfe3f4]">
              <div className="flex items-center justify-between bg-[#fbfcff] px-4 py-2 text-[13px] font-semibold text-[#343a52]">
                Sleep Disturbance
                <button onClick={onAcceptSleep} className="rounded-md bg-[#4f57f6] px-3 py-1.5 text-[12px] text-white">
                  Accept
                </button>
              </div>
              <table className="w-full text-left text-[13px] text-[#4b526c]">
                <tbody>
                  <TableRow label="Pattern" value="Difficulty sleeping on affected (right) side" />
                  <TableRow label="Duration" value="Past 3-4 weeks" />
                  <TableRow label="Impact" value="Reports 4-5 hrs interrupted sleep per night." />
                </tbody>
              </table>
            </div>
          )}

          <EditableBlock
            label="Chief Complaint"
            value={chiefComplaint}
            editable={subjectiveEditable}
            focused={chiefComplaintFocused}
            mentionVisible={mentionVisible}
            onChange={onChiefComplaintChange}
            onFocusChange={onChiefComplaintFocus}
            onSelectMention={onSelectMention}
          />

          <div>
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#adb2c7]">
              {showGeneratedSoap ? 'HPI' : 'History of Present Condition'}
            </p>
            <p className="text-[14px] leading-8 text-[#4b516b]">
              {showGeneratedSoap ? (
                <>
                  The patient reports gradual onset of right shoulder pain over the past 3-4 months. She was diagnosed with a
                  rotator cuff complete tear for which she got operated 10 weeks prior to evaluation.{' '}
                  <Highlight>Following surgery, the patient reports incomplete recovery of shoulder function, with persistent pain and progressive difficulty in raising her right arm above shoulder level.</Highlight>{' '}
                  <Highlight>
                    She reports significant limitations in overhead activities such as reaching overhead for kitchen cabinets,
                    combing her hair and unable to perform gardening activities.
                  </Highlight>{' '}
                  <Highlight>
                    The pain is localized to the right shoulder, worsened by active abduction and forward flexion, and is
                    associated with mild weakness in the right upper extremity.
                  </Highlight>
                </>
              ) : (
                <>
                  The patient reports a gradual onset of right shoulder pain over the past 3-4 months. She was diagnosed with a
                  rotator cuff complete tear for which she got operated 10 weeks prior to evaluation.
                </>
              )}
            </p>
          </div>

          <InfoBlock label="Pain Presentation">
            On the Numeric Pain Rating Scale (NPRS), the patient reports 8/10 pain with movement and 6/10 at rest.
          </InfoBlock>

          <InfoBlock label="Patient Goals">Patient desires to return to a prior level of function like gardening, cooking.</InfoBlock>

          <InfoBlock label="Past Medical History">No significant past medical history.</InfoBlock>

          <InfoBlock label="Surgical History">Arthroscopic rotator cuff repair prior to 10 weeks of evaluation.</InfoBlock>

          {sleepDisturbanceAccepted && (
            <InfoBlock label="Sleep Disturbance">
              Difficulty sleeping on affected (right) side, Past 3-4 weeks, Reports 4-5 hrs interrupted sleep per night.
            </InfoBlock>
          )}
        </div>
      </div>

      <SoapSectionCard letter="O" title="Objective">
        {showGeneratedSoap ? (
          <div className="space-y-6">
            <SuggestionRow items={['Add PROM measurements', 'MMT — Rotator cuff', 'Special Tests', 'Posterior capsule tightness']} />
            <InfoBlock label="Incision">
              2 cm thin slit-like scar is present on the anterior and posterior part of the shoulder. Scar looks pale, thin and well healed.
            </InfoBlock>
            <InfoBlock label="Shoulder ROM Table — Right Side">
              <ClinicalTable
                title="AROM and PROM: Shoulder Joint"
                headers={['Measure', 'AROM Right', 'PROM Right', 'AROM Left', 'PROM Left']}
                rows={[
                  ['Flexion', '68°', '85°', 'WFL', 'WFL'],
                  ['Abduction', '54°', '70°', 'WFL', 'WFL'],
                  ['External Rotation', '22°', '35°', 'WFL', 'WFL'],
                  ['End feel', 'N/A', 'Firm, consistent with early posterior capsule tightness', 'N/A', 'Soft, normal'],
                  ['DASH score', '72 (severe disability)', 'N/A', 'N/A', 'N/A'],
                  ['Penn Shoulder Score', '28/100 (severe dysfunction)', 'N/A', 'N/A', 'N/A'],
                ]}
              />
            </InfoBlock>
            <InfoBlock label="Strength Test">
              <ClinicalTable
                title="Strength Test"
                headers={['Muscle', 'Movement', 'MMT Right', 'MMT Left', 'Interpretation']}
                rows={[
                  ['Supraspinatus', 'Abduction 0-15° (Empty Can position)', '2/5', '5/5', 'Right: full range in gravity eliminated position only. Left: normal strength.'],
                  ['Infraspinatus', 'External Rotation', '3/5', '5/5', 'Right: can lift against gravity without resistance. Left: normal strength.'],
                  ['Teres Minor', 'External Rotation', '3/5', '5/5', 'Right: can lift against gravity without resistance. Left: normal strength.'],
                  ['Subscapularis', 'Internal Rotation', '4/5', '5/5', 'Right: full range against gravity with minimal resistance. Left: normal strength.'],
                ]}
              />
            </InfoBlock>
            <InfoBlock label="Outcome Measures">
              <ClinicalTable
                title="Outcome Measures"
                headers={['Measure', 'Score', 'Interpretation']}
                rows={[
                  ['DASH score', '72', 'Severe disability'],
                  ['Penn Shoulder Score', '28/100', 'Severe dysfunction'],
                ]}
              />
            </InfoBlock>
          </div>
        ) : (
          <InfoBlock label="No Input"> </InfoBlock>
        )}
      </SoapSectionCard>

      <SoapSectionCard letter="A" title="Assessment">
        {showGeneratedSoap && (
          <SuggestionRow items={['Healing phase classification', 'Medicare audit readiness', 'Compliance risk flag']} />
        )}
        <InfoBlock label="Diagnosis">M75.11, Complete rotator cuff tear, right shoulder, not specified as traumatic.</InfoBlock>
        {showGeneratedSoap && (
          <InfoBlock label="Rehabilitation Potential">
            Patient presents with significant post-surgical ROM deficits and pain consistent with status post arthroscopic
            rotator cuff repair. Prognosis is good given patient motivation and absence of complicating comorbidities.
            Functional limitations impact ADLs and prior level of function.
          </InfoBlock>
        )}
      </SoapSectionCard>

      {showGeneratedSoap && (
        <>
          <SoapSectionCard letter="P" title="Plan">
            <SuggestionRow items={['Healing phase classification', 'Medicare audit readiness', 'Compliance risk flag']} />
            <InfoBlock label="Goals Established">
              <GoalText title="Shoulder Flexion (Right ROM)">
                Diane will demonstrate improved active right shoulder flexion from 68° to 150° within 12 visits to allow
                overhead reach into kitchen cabinets and return to gardening without pain limitation.
              </GoalText>
              <GoalText title="Shoulder Abduction (Right ROM)">
                Diane will demonstrate improved active right shoulder abduction from 54° to 140° within 12 visits to support
                bilateral overhead reaching for daily household tasks.
              </GoalText>
              <GoalText title="Shoulder External Rotation (Right ROM)">
                Diane will demonstrate improved active right shoulder external rotation from 22° to 60° within 12 visits to
                enable functional reaching and independent dressing with her dominant arm.
              </GoalText>
              <GoalText title="Pain with Movement">
                Diane will report decreased pain with movement from 8/10 to ≤2/10 within 12 visits to allow full participation
                in her home exercise program and daily activities.
              </GoalText>
              <GoalText title="DASH Score">
                Diane will demonstrate an improved DASH score from 72 to ≤30 within 12 visits, reflecting reduced disability
                and return toward prior level of function for home and gardening tasks.
              </GoalText>
              <GoalText title="Functional Outcome">
                Diane will progress from unable to independent with overhead reaching for kitchen tasks and light gardening
                within 12 visits, without pain or compensatory movement patterns.
              </GoalText>
              <GoalText title="Rotator Cuff Strength (Right)">
                Diane will improve right rotator cuff strength to 4+/5 or greater across all planes within 12 visits, sufficient
                to perform overhead reaching and gardening without substitution patterns or fatigue.
              </GoalText>
            </InfoBlock>
            <InfoBlock label="Interventions Planned">
              Progressive ROM, posterior capsule mobilization, progressive resisted strengthening, neuromuscular re-education,
              HEP instruction.
            </InfoBlock>
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#adb2c7]">Visit Frequency</p>
              <div className="flex gap-3">
                <DetailPill label="Frequency" value="2x per week" />
                <DetailPill label="Duration" value="6 weeks (12 visits)" />
              </div>
            </div>
          </SoapSectionCard>

          <SoapSectionCard letter="P" title="Billing">
            <ClinicalTable
              title="Suggested CPT Codes"
              headers={['CPT Code', 'Type', 'Description', 'Unit Duration']}
              rows={[
                ['97163', 'Untimed (serve-based)', 'Physical therapy evaluation, high complexity', '1 unit regardless of time'],
                ['97163', 'Timed (15-minute units)', 'Therapeutic exercise', '1 unit per 15 minutes (minimum 8 minutes to bill 1 unit)'],
                ['97163', 'Untimed (serve-based)', 'Physical therapy evaluation, high complexity', '1 unit regardless of time'],
                ['97163', 'Timed (15-minute units)', 'Self care and home management training', '1 unit per 15 minutes (minimum 8 minutes to bill 1 unit)'],
              ]}
            />
          </SoapSectionCard>
        </>
      )}

      {leftPanelCollapsed && (stage === 'session' || stage === 'sessionAccepted') && (
        <div className="fixed bottom-4 left-[48px] z-20 w-[324px] overflow-hidden rounded-[18px] border border-[#f1b285] bg-white shadow-[0_18px_40px_rgba(233,126,61,0.28)]">
          <div className="bg-gradient-to-r from-[#f06a2f] to-[#f29b54] p-4 text-white">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[15px] font-semibold">Session - In Progress..</p>
              <button className="rounded-full bg-white/20 p-1">
                <ArrowRight size={12} />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[18px] font-semibold tracking-[0.08em]">{formatClock(sessionSeconds)}</p>
                <div className="mt-2 flex items-center gap-1">
                  {[10, 13, 8, 18, 12, 15, 9, 14, 7, 16, 10, 14].map((height, index) => (
                    <span key={index} className="block w-[2px] rounded-full bg-white" style={{ height }} />
                  ))}
                </div>
              </div>
              <button className="rounded-xl bg-white/20 px-3 py-2 text-[12px] font-semibold">View Transcript</button>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-[#7d859f]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#efeaff] text-[#6a54f7]">✦</div>
            <span className="flex-1 text-[13px]">Ask eva,,</span>
            <Mic size={14} />
            <Play size={14} />
            <Gauge size={14} />
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f2f9]">
              <Send size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SoapSectionCard({
  letter,
  title,
  children,
}: {
  letter: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-[#ececf5] bg-white">
      <div className="flex items-center justify-between border-b border-[#ececf5] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6a61f1] text-[13px] font-semibold text-white">
            {letter}
          </div>
          <p className="text-[18px] font-semibold text-[#2a2f45]">{title}</p>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-[#adb2c7]">
          3 items
          <ChevronDown size={14} />
        </div>
      </div>
      <div className="space-y-5 px-5 py-4">{children}</div>
    </div>
  );
}

function SuggestionRow({ items }: { items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-semibold text-[#6b5af4]">✦ AI Suggestions</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <SmallChip key={item}>{item}</SmallChip>
        ))}
      </div>
    </div>
  );
}

function ClinicalTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#f2b754]">
      <div className="flex items-center justify-between bg-[#fff4df] px-4 py-3 text-[13px] font-semibold text-[#2d3146]">
        {title}
        <span className="h-1.5 w-1.5 rounded-full bg-[#efb14a]" />
      </div>
      <table className="w-full text-left text-[12px] text-[#4b526c]">
        <thead className="bg-[#fbfcff] text-[11px] uppercase tracking-[0.06em] text-[#626a83]">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-t border-[#edf0f7] px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-[#edf0f7]">
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GoalText({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <p>
        <Highlight>{title}</Highlight>
      </p>
      <p className="mt-1 leading-8">
        <Highlight>{children}</Highlight>
      </p>
    </div>
  );
}

function FinalizedSurface({ clarificationApplied }: { clarificationApplied: boolean }) {
  return (
    <div className="space-y-5 px-8 py-8">
      <div className="rounded-[28px] border border-[#e8eaf4] bg-white p-6 shadow-[0_10px_30px_rgba(66,74,122,0.05)]">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eefdf3] text-[#55ba80]">
              <Check size={22} />
            </div>
            <div>
              <p className="text-[34px] font-semibold tracking-tight text-[#273046]">Visit 1 of 7 complete - Sarah Kim</p>
              <p className="mt-1 text-[15px] text-[#848ba4]">
                Left ACL Tear <span className="mx-2 text-[#c2c5d3]">•</span>
                <span className="font-medium text-[#57bf88]">Finalized successfully</span>
              </p>
              <div className="mt-4 flex gap-2">
                <Tag tone="slate"># 97110 (TherEx)</Tag>
                <Tag tone="slate"># 97112 (Neuro re-ed)</Tag>
              </div>
            </div>
          </div>

          <div className="w-[220px]">
            <div className="mb-2 flex justify-between text-[12px] font-semibold uppercase tracking-[0.08em] text-[#b0b5c8]">
              <span>Progress</span>
              <span>42%</span>
            </div>
            <div className="h-2 rounded-full bg-[#edeffa]">
              <div className="h-full w-[42%] rounded-full bg-[#4f34eb]" />
            </div>
            <div className="mt-6 flex justify-end">
              <Tag tone="green">100% Documentation quality</Tag>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[24px] font-semibold text-[#293047]">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f0ecff] text-[#6756f5]">
            <FileText size={16} />
          </div>
          SOAP Documentation
        </div>
        <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#55bf89]">Verified 4/4</div>
      </div>

      <FinalSection
        title="Subjective"
        color="bg-[#4a2ee7]"
        highlight={clarificationApplied ? 'Pain is improving slightly compared to last visit but continues to limit activity.' : undefined}
        items={[
          'Persistent left knee pain worse with descending stairs, and weight bearing. AROM limited to 90° of flexion',
          clarificationApplied
            ? 'Updated: Flexion clarified to 110 degrees with a sharp catch specifically when descending stairs.'
            : 'Current: 3/10',
          clarificationApplied ? 'Worst (past week): 6/10' : 'Worst (past week): 6/10',
        ]}
      />

      <FinalSection
        title="Objective"
        color="bg-[#4aa59e]"
        items={[
          'Mild antalgic gait pattern on right.',
          'Slight varus alignment noted.',
          'Trace swelling present.',
          'Tenderness along medial joint line.',
        ]}
      />
    </div>
  );
}

function FinalSection({
  title,
  color,
  items,
  highlight,
}: {
  title: string;
  color: string;
  items: string[];
  highlight?: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#e8eaf4] bg-white p-6 shadow-[0_10px_30px_rgba(66,74,122,0.05)]">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-white ${color}`}>{title[0]}</div>
          <p className="text-[22px] font-semibold text-[#2b3248]">{title}</p>
        </div>
        <button className="text-[13px] font-semibold text-[#6756f5]">Edit section</button>
      </div>
      {highlight && (
        <div className="mb-4 rounded-lg bg-[#fff1c9] px-3 py-2 text-[14px] font-semibold italic text-[#5a4d27]">{highlight}</div>
      )}
      <ul className="space-y-3 text-[15px] leading-7 text-[#56607b]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#c6cada]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EditableBlock({
  label,
  value,
  editable,
  focused,
  mentionVisible,
  onChange,
  onFocusChange,
  onSelectMention,
}: {
  label: string;
  value: string;
  editable: boolean;
  focused: boolean;
  mentionVisible: boolean;
  onChange: (value: string) => void;
  onFocusChange: (focused: boolean) => void;
  onSelectMention: (value: string) => void;
}) {
  return (
    <div className="relative">
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#adb2c7]">{label}</p>
      {editable ? (
        <div className={`rounded-xl border px-3 py-2 ${focused ? 'border-[#6b5af4]' : 'border-[#e5e8f4]'}`}>
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={() => onFocusChange(true)}
            onBlur={() => window.setTimeout(() => onFocusChange(false), 120)}
            className="min-h-[58px] w-full resize-none border-none bg-transparent text-[14px] leading-7 text-[#4b516b] outline-none"
          />
          <p className="text-[11px] text-[#adb2c7]">Type `@` to insert a clinical tag.</p>
        </div>
      ) : (
        <p className="text-[14px] leading-7 text-[#4b516b]">{value}</p>
      )}

      {editable && mentionVisible && (
        <div className="absolute left-0 top-[98px] z-10 w-[250px] rounded-2xl border border-[#ececf5] bg-white p-2 shadow-[0_24px_42px_rgba(78,86,130,0.16)]">
          {[
            'Medial joint line tenderness',
            'Right knee flexion',
            'Left knee flexion',
            'Knee extension',
          ].map((option) => (
            <button
              key={option}
              onMouseDown={(event) => {
                event.preventDefault();
                onSelectMention(option);
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] text-[#4f566f] hover:bg-[#f4f1ff] hover:text-[#5d49f4]"
            >
              {option}
              <ArrowRight size={12} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PanelCard({
  title,
  titleIcon,
  children,
  rightSlot,
  compact = false,
}: {
  title: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-[22px] border border-[#ececf5] bg-white p-4 ${compact ? 'min-h-[160px]' : ''}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[16px] font-semibold text-[#625cf0]">
          {titleIcon}
          <span className="text-[#635cf0]">{title}</span>
        </div>
        {rightSlot}
      </div>
      <div className="text-[15px] leading-7 text-[#4d536d]">{children}</div>
    </div>
  );
}

function SummaryFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[12px] text-[#a0a5bc]">{label}</p>
      <p className="text-[14px] font-medium text-[#414860]">{value}</p>
    </div>
  );
}

function ReferralSection({ index, title, rows }: { index: string; title: string; rows: [string, string][] }) {
  return (
    <div className="rounded-[18px] border border-[#ececf5] p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-md bg-[#f1f3ff] px-2 py-1 text-[12px] font-semibold text-[#6573d8]">{index}</span>
        <p className="text-[18px] font-semibold text-[#2d3348]">{title}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {rows.map(([label, value]) => (
          <SummaryFact key={`${label}-${value}`} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}

function MetaItem({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <p>
      <span className="font-semibold text-[#4a5168]">{label} :</span>{' '}
      <span className={accent ? 'text-[#6dbd93]' : 'text-[#4a5168]'}>{value}</span>
    </p>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#f7f8fc] p-3">
      <p className="text-[12px] text-[#b2b7ca]">{label}</p>
      <p className="mt-1 text-[14px] font-medium text-[#4c536d]">{value}</p>
    </div>
  );
}

function TableRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-t border-[#e9ecf6]">
      <td className="w-[140px] px-4 py-2 text-[#99a0ba]">{label}</td>
      <td className="px-4 py-2">{value}</td>
    </tr>
  );
}

function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#adb2c7]">{label}</p>
      <p className="text-[14px] leading-7 text-[#4b516b]">{children}</p>
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md bg-[#ffeebf] px-1.5 py-0.5 font-semibold italic text-[#5f5330]">{children}</span>;
}

function Tag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: 'amber' | 'purple' | 'rose' | 'green' | 'slate';
}) {
  const styles = {
    amber: 'bg-[#fff4d8] text-[#f0b14a]',
    purple: 'bg-[#f2efff] text-[#6b58f5]',
    rose: 'bg-[#fff0ed] text-[#f08a66]',
    green: 'bg-[#effdf4] text-[#63c18e]',
    slate: 'bg-[#f5f7fb] text-[#7a819a]',
  } as const;
  return <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${styles[tone]}`}>{children}</span>;
}

function SmallChip({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-[13px] font-medium ${
        active ? 'border-[#7464f5] text-[#604ef4]' : 'border-[#d9ddec] text-[#5d6580]'
      }`}
    >
      {children}
    </button>
  );
}

function TriangleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2L12 11H2L7 2Z" stroke="#f08462" strokeWidth="1.4" />
    </svg>
  );
}

function MapPinMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 7.75C8.24264 7.75 9.25 6.74264 9.25 5.5C9.25 4.25736 8.24264 3.25 7 3.25C5.75736 3.25 4.75 4.25736 4.75 5.5C4.75 6.74264 5.75736 7.75 7 7.75Z" stroke="#6d5cf5" strokeWidth="1.4" />
      <path d="M7 12C7 12 10.5 8.8 10.5 5.5C10.5 3.57 8.93 2 7 2C5.07 2 3.5 3.57 3.5 5.5C3.5 8.8 7 12 7 12Z" stroke="#6d5cf5" strokeWidth="1.4" />
    </svg>
  );
}

export default App;
