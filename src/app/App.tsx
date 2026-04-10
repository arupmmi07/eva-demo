import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { ChatPanel, FloatingSessionDock } from './components/ChatPanel';
import { PanelDividerToolbar } from './components/PanelDividerToolbar';
import { DashboardPanel } from './components/DashboardPanel';
import { PatientSummaryPanel } from './components/PatientSummaryPanel';
import { SOAPNotePanel } from './components/SOAPNotePanel';
import { AppView, ChatMessage, DemoPhase, SOAPVariant } from './types';

function norm(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Recognizes the scripted strength grades; tolerates spacing around "/" and common punctuation. */
function matchesStrengthInput(raw: string): boolean {
  const n = norm(raw)
    .replace(/[，、;]/g, ',')
    .replace(/\s*\/\s*/g, '/');
  if (!n.includes('deltoid') || !n.includes('biceps') || !n.includes('triceps')) return false;
  const exact = n === 'deltoid 1/5, biceps 1/5, triceps 3/5' || n === 'deltoid 1/5 biceps 1/5 triceps 3/5';
  if (exact) return true;
  return n.includes('1/5') && n.includes('3/5');
}

function phaseToView(phase: DemoPhase): AppView {
  if (phase === 'welcome') return 'dashboard';
  if (phase === 'patientSummary' || phase === 'tearAnswered') return 'patientSummary';
  if (phase === 'soapPrefill') return 'soapNote';
  return 'sessionActive';
}

function soapVariantForPhase(phase: DemoPhase): SOAPVariant {
  if (phase === 'soapPrefill') return 'prefill';
  if (phase === 'sessionReady' || phase === 'sessionRecording') return 'sessionRecording';
  if (phase === 'sessionTranscript') return 'transcript';
  return 'postRom';
}

// ── Static message blocks ─────────────────────────────────────────────────────

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'eva-greeting',
    type: 'eva-text',
    content:
      'Hi Dr. Maya — you have 6 patients today. 4 follow ups, and 2 evals. Diane is your next patient',
  },
  {
    id: 'patient-card',
    type: 'patient-card',
    content: '',
    timestamp: '8:47 AM',
  },
  {
    id: 'eva-alerts',
    type: 'alert-message',
    content: `<strong>Patient alerts:</strong><br/>
<strong>High Fear-Avoidance:</strong> Patient may require extra verbal cueing and reassurance during PROM to manage protective guarding.<br/>
Source: <span style="color:#2e04e8">pre-eval survey TSK-11</span><br/><br/>
<strong>Goal Mismatch</strong>: Patient expects to return to high-level gardening within 6 weeks, but current DASH score suggests significant functional deficit. Recommend setting intermediate '<strong>micro-goals'</strong> to manage expectations.<br/><br/>
Would you like to start the session or review intake?`,
    timestamp: '8:47 AM',
  },
  {
    id: 'dashboard-chips',
    type: 'suggestion-chips',
    chips: [
      { label: 'Show me patient list', action: 'showPatientList' },
      { label: 'Open patient summary', action: 'openPatientSummary' },
      { label: 'Start next session', action: 'startSoapNote' },
      { label: 'Check flagged cases', action: 'checkFlagged' },
    ],
  },
];

function buildMessages(phase: DemoPhase, showSessionWidget: boolean): ChatMessage[] {
  const list: ChatMessage[] = [...INITIAL_MESSAGES];

  if (phase === 'welcome') return list;

  list.push(
    {
      id: 'user-open-summary',
      type: 'user-bubble',
      content: 'Open patient summary',
      timestamp: '07:53 PM',
    },
    {
      id: 'eva-profile',
      type: 'eva-text',
      content:
        'Sure let me bring Diane M profile before we start the session. You can check her profile right here →',
      timestamp: '8:47 AM',
    },
    {
      id: 'summary-chips',
      type: 'suggestion-chips',
      chips: [
        { label: 'Summarize patient condition', action: 'summarize' },
        { label: 'What changed since last visit?', action: 'changes' },
        { label: 'Any risk factors?', action: 'risks' },
        { label: 'Highlight inconsistencies', action: 'inconsistencies' },
      ],
    },
  );

  if (phase === 'patientSummary') return list;

  list.push(
    {
      id: 'user-tear',
      type: 'user-bubble',
      content: 'Was the tear massive?',
      timestamp: '07:53 PM',
    },
    {
      id: 'eva-tear',
      type: 'eva-text',
      content: `This was a Massive (Grade IV) Tear.<ul style="list-style:disc;padding-left:18px;margin-top:4px">
<li>Details: 5.5 cm retraction of the Supraspinatus with full-thickness involvement of the Infraspinatus.</li>
<li>Repair Type: Double-row anchor fixation with a biceps tenodesis.</li>
<li>Tissue Quality: Surgeon noted 'fair to poor' tissue quality (friable), suggesting a higher risk of re-tear.</li>
</ul>`,
      timestamp: '8:47 AM',
    },
    {
      id: 'summary-chips-2',
      type: 'suggestion-chips',
      chips: [
        { label: 'Summarize patient condition', action: 'summarize' },
        { label: 'What changed since last visit?', action: 'changes' },
        { label: 'Any risk factors?', action: 'risks' },
        { label: 'Highlight inconsistencies', action: 'inconsistencies' },
      ],
    },
  );

  if (phase === 'tearAnswered') return list;

  list.push(
    {
      id: 'user-start-note',
      type: 'user-bubble',
      content: 'Start initial evaluation note for Diana',
      timestamp: '07:53 PM',
    },
    {
      id: 'eva-prefill',
      type: 'eva-text',
      content:
        "I've pre-filled initial intake details into the note based on intake, referral and patient portal activity.",
      timestamp: '8:47 AM',
    },
  );

  if (phase === 'soapPrefill') return list;

  list.push(
    {
      id: 'user-start-session',
      type: 'user-bubble',
      content: 'Start diana session',
      timestamp: '07:52 PM',
    },
    {
      id: 'eva-session-starting',
      type: 'eva-text',
      content:
        "Starting Diana's session. I'll continue capturing as you speak. You can start naturally — I'm listening.",
      timestamp: '8:47 AM',
    },
  );

  if (showSessionWidget) {
    list.push({
      id: 'session-widget',
      type: 'session-widget',
      timestamp: '8:47 AM',
    });
  }

  if (phase === 'sessionReady') return list;

  if (phase === 'sessionRecording') return list;

  if (phase === 'sessionTranscript') return list;

  list.push({
    id: 'eva-rom',
    type: 'eva-text',
    content: `<span style="color:#16a34a">✅ ROM captured</span><br/>
<span style="color:#f97316">⚠️ Missing:</span><ul style="list-style:disc;padding-left:18px;margin-top:2px">
<li>Muscle strength grading</li>
<li>Special tests</li>
</ul>`,
    timestamp: '8:47 AM',
  });
  list.push({
    id: 'post-rom-chips',
    type: 'suggestion-chips',
    chips: [
      { label: 'Any tingling or numbness?', action: 'noop' },
      { label: 'Any tingling or numbness?', action: 'noop' },
    ],
  });

  if (phase === 'sessionPostRom') return list;

  list.push(
    {
      id: 'user-deltoid',
      type: 'user-bubble',
      content: 'Deltoid 1/5, Biceps 1/5, Triceps 3/5',
      timestamp: '07:53 PM',
    },
    {
      id: 'eva-pattern',
      type: 'eva-text',
      content: "Pattern suggests C5-C6 involvement. I'll align this with diagnosis..",
      timestamp: '8:47 AM',
    },
  );

  return list;
}

export default function App() {
  const [phase, setPhase] = useState<DemoPhase>('welcome');
  const [chatOpen, setChatOpen] = useState(true);
  const [recorderSeconds, setRecorderSeconds] = useState(274);
  const [recordingActive, setRecordingActive] = useState(false);

  const view = phaseToView(phase);
  const soapVariant = soapVariantForPhase(phase);

  const showSessionWidget =
    phase === 'sessionReady' ||
    phase === 'sessionRecording' ||
    phase === 'sessionTranscript' ||
    phase === 'sessionPostRom' ||
    phase === 'strengthAnswered';

  const messages = useMemo(
    () => buildMessages(phase, showSessionWidget),
    [phase, showSessionWidget],
  );

  useEffect(() => {
    if (!recordingActive) return;
    const interval = setInterval(() => {
      setRecorderSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [recordingActive]);

  const handleChipAction = useCallback(
    (action: string) => {
      if (action === 'noop') return;
      if (action === 'openPatientSummary' && phase === 'welcome') {
        setPhase('patientSummary');
        return;
      }
      if (action === 'startSoapNote' && (phase === 'welcome' || phase === 'patientSummary')) {
        setPhase('soapPrefill');
        return;
      }
    },
    [phase],
  );

  const handleChatSend = useCallback(
    (text: string) => {
      const n = norm(text);

      if (phase === 'welcome' && n === 'open patient summary') {
        setPhase('patientSummary');
        return;
      }
      if (phase === 'patientSummary' && n === 'was the tear massive?') {
        setPhase('tearAnswered');
        return;
      }
      if (phase === 'tearAnswered' && n === 'start initial evaluation note for diana') {
        setPhase('soapPrefill');
        return;
      }
      if (phase === 'soapPrefill' && n === 'start diana session') {
        setPhase('sessionReady');
        setRecordingActive(false);
        return;
      }
      // After stop recording, users often type this before clicking "View Transcript" — accept both phases.
      if (phase === 'sessionPostRom' || phase === 'sessionTranscript') {
        if (matchesStrengthInput(text)) {
          setPhase('strengthAnswered');
        }
      }
    },
    [phase],
  );

  const startRecording = useCallback(() => {
    setRecordingActive(true);
    setPhase('sessionRecording');
  }, []);

  const stopRecording = useCallback(() => {
    setRecordingActive(false);
    setPhase('sessionTranscript');
  }, []);

  const onViewTranscript = useCallback(() => {
    if (phase === 'sessionTranscript') {
      setPhase('sessionPostRom');
    }
  }, [phase]);

  const expandChatAndMaybeTranscript = useCallback(() => {
    setChatOpen(true);
    onViewTranscript();
  }, [onViewTranscript]);

  const showFloatingDock = !chatOpen && recordingActive;

  return (
    <div className="flex flex-col h-screen bg-[#f7f9ff] overflow-hidden">
      <Header view={view} onSaveDraft={() => {}} onReviewFinalize={() => {}} />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar chatOpen={chatOpen} onToggleChat={() => setChatOpen((c) => !c)} />

        <div className="flex flex-1 overflow-hidden relative min-w-0">
          {chatOpen && (
            <div className="w-[490px] shrink-0 flex flex-col overflow-hidden border-r border-[#e8ecf1] relative bg-white z-0">
              <ChatPanel
                messages={messages}
                sessionSeconds={recorderSeconds}
                recordingActive={recordingActive}
                sessionPhase={phase}
                onAction={handleChipAction}
                onSendMessage={handleChatSend}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                onViewTranscript={onViewTranscript}
              />
            </div>
          )}

          {/* Vertical split line */}
          <div
            className={`absolute top-0 bottom-0 w-px bg-[#e2e8f0] z-[5] pointer-events-none ${
              chatOpen ? 'left-[490px]' : 'left-0'
            }`}
            aria-hidden
          />

          {/* Middle layout controls (sc7 / mock reference) */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 z-[15] ${
              chatOpen ? 'left-[490px] -translate-x-1/2' : 'left-3 translate-x-0'
            }`}
          >
            <PanelDividerToolbar
              chatOpen={chatOpen}
              onExpandChat={() => setChatOpen(true)}
              onCollapseChat={() => setChatOpen(false)}
              onSplitView={() => setChatOpen(true)}
            />
          </div>

          <div className="flex-1 overflow-hidden bg-white min-w-0 relative z-0">
            {view === 'dashboard' && (
              <DashboardPanel onOpenPatientSummary={() => setPhase('patientSummary')} />
            )}
            {view === 'patientSummary' && (
              <PatientSummaryPanel onBeginSession={() => setPhase('soapPrefill')} />
            )}
            {(view === 'soapNote' || view === 'sessionActive') && (
              <SOAPNotePanel
                variant={soapVariant}
                sessionSeconds={recorderSeconds}
                recordingActive={recordingActive}
              />
            )}
          </div>

          {showFloatingDock && (
            <FloatingSessionDock
              seconds={recorderSeconds}
              onExpandChat={() => setChatOpen(true)}
              onViewTranscript={expandChatAndMaybeTranscript}
              onStopRecording={stopRecording}
              onSendMessage={handleChatSend}
            />
          )}
        </div>
      </div>
    </div>
  );
}
