import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChatItem, HeaderMode, PanelMode, WorkflowStage } from '../types';
import { EVA_TIMESTAMP, FINAL_CLARIFICATION, INITIAL_CHIEF_COMPLAINT } from '../constants';
import { COMORBIDITIES_CHIP, getActiveCtaHints, getChatSuggestionChips } from '../utils/ctaHints';
import { normalizeText } from '../utils/format';

const initialChat: ChatItem[] = [
  {
    id: 'welcome',
    kind: 'eva',
    content:
      'Hi Dr. Maya — you have 6 patients today. 4 follow ups, and 2 evals. Diane is your next patient',
    timestamp: EVA_TIMESTAMP,
  },
  { id: 'patient-card', kind: 'patient-card', timestamp: EVA_TIMESTAMP },
];

export function useEvaWorkflow() {
  const [stage, setStage] = useState<WorkflowStage>('dashboard');
  const [chatItems, setChatItems] = useState<ChatItem[]>(initialChat);
  const [chatInput, setChatInput] = useState('');
  const [referralOpen, setReferralOpen] = useState(false);
  const [topSetupVisible, setTopSetupVisible] = useState(false);
  const [recordingActive, setRecordingActive] = useState(false);
  const [sessionPaused, setSessionPaused] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(274);
  const [showHighlight, setShowHighlight] = useState(false);
  const [sleepTableVisible, setSleepTableVisible] = useState(false);
  const [sleepDisturbanceAccepted, setSleepDisturbanceAccepted] = useState(false);
  const [chiefComplaint, setChiefComplaint] = useState(INITIAL_CHIEF_COMPLAINT);
  const [chiefComplaintFocused, setChiefComplaintFocused] = useState(false);
  const [clarificationApplied, setClarificationApplied] = useState(false);
  const [panelMode, setPanelMode] = useState<PanelMode>('both');
  const highlightTimerRef = useRef<number | null>(null);

  const headerMode: HeaderMode = useMemo(() => {
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
    }, 10_000);
    return () => {
      if (highlightTimerRef.current) window.clearTimeout(highlightTimerRef.current);
    };
  }, [stage, recordingActive, showHighlight]);

  const suggestionButtons = useMemo(
    () =>
      getChatSuggestionChips({
        stage,
        referralOpen,
        topSetupVisible,
        recordingActive,
        sessionPaused,
        showHighlight,
        sleepTableVisible,
        sleepDisturbanceAccepted,
      }),
    [
      stage,
      referralOpen,
      topSetupVisible,
      recordingActive,
      sessionPaused,
      showHighlight,
      sleepTableVisible,
      sleepDisturbanceAccepted,
    ],
  );

  const ctaHints = useMemo(
    () =>
      getActiveCtaHints({
        stage,
        referralOpen,
        topSetupVisible,
        recordingActive,
        sessionPaused,
        showHighlight,
        sleepTableVisible,
        sleepDisturbanceAccepted,
      }),
    [
      stage,
      referralOpen,
      topSetupVisible,
      recordingActive,
      sessionPaused,
      showHighlight,
      sleepTableVisible,
      sleepDisturbanceAccepted,
    ],
  );

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
      timestamp: EVA_TIMESTAMP,
      content:
        "I've pulled these insights from Diane's pre-visit surveys.\n\nHigh Fear-Avoidance: Patient may require extra verbal cueing and reassurance during PROM to manage protective guarding.\nSource: pre-eval survey TSK-11\n\nGoal Mismatch: Patient expects to return to high-level gardening within 6 weeks, but current DASH score suggests significant functional deficit. Recommend setting intermediate 'micro-goals' to manage expectations.\n\nWould you like to start the session or review intake?",
    });
    appendChat({
      id: `eva-summary-${Date.now()}`,
      kind: 'eva',
      timestamp: EVA_TIMESTAMP,
      content:
        'Sure let me bring Diane M profile before we start the session. You can check her profile right here →',
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
      timestamp: EVA_TIMESTAMP,
      content:
        "None documented. Past medical history states no significant history. Prognosis is good given her motivation and no complicating factors.\n\nIs there anything else you'd like to know before you begin your session?",
    });
  };

  const beginSession = (includeUserMessage = true) => {
    if (!['summary', 'summaryReady', 'summaryAnswered'].includes(stage)) return;
    setStage('session');
    setRecordingActive(true);
    setSessionPaused(false);
    if (includeUserMessage) {
      appendChat({
        id: `user-begin-${Date.now()}`,
        kind: 'user',
        content: 'Begin Session',
        timestamp: '07:53 PM',
      });
    }
    appendChat({
      id: `eva-begin-${Date.now()}`,
      kind: 'eva',
      timestamp: EVA_TIMESTAMP,
      content:
        "I've pre-filled initial intake details into the note. I'll continue capturing as you speak. You can start naturally. I'm listening..",
    });
    appendChat({
      id: `widget-${Date.now()}`,
      kind: 'session-widget',
      timestamp: EVA_TIMESTAMP,
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
    const normalized = normalizeText(text);

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
      beginSession(false);
      return;
    }

    if (
      ['summary', 'summaryCustomizing', 'summaryReady', 'summaryAnswered'].includes(stage) &&
      normalized === normalizeText(COMORBIDITIES_CHIP)
    ) {
      answerComorbidities();
      return;
    }

    if (normalized === 'view referral document' && ['summary', 'summaryReady', 'summaryAnswered'].includes(stage) && !referralOpen) {
      setReferralOpen(true);
      return;
    }

    if (normalized === 'close referral' && referralOpen) {
      closeReferral();
      return;
    }

    if (normalized === 'save as default' && stage === 'summaryCustomizing' && topSetupVisible) {
      resolveCustomization();
      return;
    }

    if (normalized === 'add sleep disturbance' && stage === 'session' && recordingActive && showHighlight && !sleepTableVisible) {
      setSleepTableVisible(true);
      return;
    }

    if (normalized === 'accept sleep details' && sleepTableVisible) {
      acceptSleepSuggestion();
      return;
    }

    if (normalized === 'stop session' && (stage === 'session' || stage === 'sessionAccepted') && recordingActive) {
      stopSession();
      return;
    }

    if (normalized === 'review & finalise' && stage === 'sessionStopped' && reviewEnabled) {
      finalizeReview();
      return;
    }

    if (stage === 'finalized' && normalized === 'share with patient') {
      appendChat({ id: `user-share-type-${Date.now()}`, kind: 'user', content: text, timestamp: '07:53 PM' });
      appendChat({
        id: `eva-share-type-${Date.now()}`,
        kind: 'eva',
        content: 'Opening share options for the patient portal.',
        timestamp: EVA_TIMESTAMP,
      });
      return;
    }

    if (stage === 'finalized' && normalized === FINAL_CLARIFICATION) {
      appendChat({ id: `user-fix-${Date.now()}`, kind: 'user', content: text, timestamp: '07:53 PM' });
      appendChat({
        id: `eva-fix-${Date.now()}`,
        kind: 'eva',
        content: 'Updated pain details.',
        timestamp: EVA_TIMESTAMP,
      });
      appendChat({
        id: `eva-verify-${Date.now()}`,
        kind: 'prompt',
        content: 'Do you want to verify Complete Source details?',
        timestamp: EVA_TIMESTAMP,
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
    if (label === 'View referral document') {
      setReferralOpen(true);
      return;
    }
    if (label === 'Close referral') {
      closeReferral();
      return;
    }
    if (label === 'Save as Default') {
      resolveCustomization();
      return;
    }
    if (label === COMORBIDITIES_CHIP) {
      answerComorbidities();
      return;
    }
    if (label === 'Add sleep disturbance') {
      setSleepTableVisible(true);
      return;
    }
    if (label === 'Accept sleep details') {
      acceptSleepSuggestion();
      return;
    }
    if (label === 'Stop session') {
      stopSession();
      return;
    }
    if (label === 'Review & Finalise') {
      finalizeReview();
      return;
    }
    if (label === 'Share with patient') {
      appendChat({ id: `user-share-${Date.now()}`, kind: 'user', content: label, timestamp: '07:53 PM' });
      appendChat({
        id: `eva-share-${Date.now()}`,
        kind: 'eva',
        content: 'Opening share options for the patient portal.',
        timestamp: EVA_TIMESTAMP,
      });
      return;
    }
    submitChat(label);
  };

  const mentionVisible = chiefComplaint.includes('@');

  const handleChiefComplaintChange = (value: string) => {
    setChiefComplaint(value);
  };

  const insertMention = (value: string) => {
    setChiefComplaint((prev) => prev.replace(/@[^ ]*$/, value));
  };

  const dismissClinicalTags = () => {
    setChiefComplaint((prev) => prev.replace(/@[^ ]*$/, ''));
  };

  return {
    stage,
    chatItems,
    chatInput,
    setChatInput,
    referralOpen,
    setReferralOpen,
    topSetupVisible,
    recordingActive,
    sessionPaused,
    sessionSeconds,
    showHighlight,
    sleepTableVisible,
    setSleepTableVisible,
    sleepDisturbanceAccepted,
    chiefComplaint,
    chiefComplaintFocused,
    setChiefComplaintFocused,
    mentionVisible,
    clarificationApplied,
    panelMode,
    setPanelMode,
    headerMode,
    suggestionButtons,
    saveDraftEnabled,
    reviewEnabled,
    submitChat,
    selectSuggestion,
    openSummaryFromUser,
    closeReferral,
    resolveCustomization,
    beginSession,
    acceptSleepSuggestion,
    stopSession,
    finalizeReview,
    togglePause,
    handleChiefComplaintChange,
    insertMention,
    dismissClinicalTags,
    leftPanelCollapsed: panelMode === 'rightOnly',
    ctaHints,
  };
}
