/**
 * Floating pill toolbar on the split between AI chat and main content.
 * Top: show / expand chat · Middle: split (balanced) view · Bottom: hide chat
 */
interface PanelDividerToolbarProps {
  chatOpen: boolean;
  onExpandChat: () => void;
  onCollapseChat: () => void;
  onSplitView: () => void;
}

function IconExpandLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10 3v10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M6.5 8L4.5 6M6.5 8L4.5 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSplit({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 2.5v11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconCollapseLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6 3v10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M9.5 8l2-2M9.5 8l2 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PanelDividerToolbar({
  chatOpen,
  onExpandChat,
  onCollapseChat,
  onSplitView,
}: PanelDividerToolbarProps) {
  return (
    <div
      className="flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-full bg-white border border-[#e2e8f0] shadow-[0_2px_12px_rgba(15,23,42,0.08)]"
      role="toolbar"
      aria-label="Panel layout"
    >
      <button
        type="button"
        onClick={onExpandChat}
        title="Show chat panel"
        aria-label="Show chat panel"
        className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
          chatOpen
            ? 'text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#64748b]'
            : 'text-[#4f46e5] bg-[#eef2ff] hover:bg-[#e0e7ff]'
        }`}
      >
        <IconExpandLeft className="shrink-0" />
      </button>
      <button
        type="button"
        onClick={onSplitView}
        title="Split view"
        aria-label="Split view"
        className="flex items-center justify-center w-9 h-9 rounded-full text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#4f46e5] transition-colors"
      >
        <IconSplit className="shrink-0" />
      </button>
      <button
        type="button"
        onClick={onCollapseChat}
        disabled={!chatOpen}
        title="Hide chat panel"
        aria-label="Hide chat panel"
        className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
          chatOpen
            ? 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#4f46e5]'
            : 'text-[#cbd5e1] cursor-not-allowed'
        }`}
      >
        <IconCollapseLeft className="shrink-0" />
      </button>
    </div>
  );
}
