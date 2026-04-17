import type { PanelMode } from '../../types';

/** 16×16 split-view glyphs aligned with `figma-make-moment3` Split-View-Button icons. */
function SplitDockIcon({ mode, stroke }: { mode: 'left' | 'split' | 'right'; stroke: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke={stroke} strokeWidth="1.25" />
      {mode === 'split' ? (
        <path d="M8 2.5v11" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
      ) : null}
      {mode === 'left' ? (
        <>
          <path d="M10 2.5v11" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
          <rect x="2.6" y="3.25" width="6.9" height="9.5" rx="0.9" fill={stroke} fillOpacity={0.14} />
        </>
      ) : null}
      {mode === 'right' ? (
        <>
          <path d="M6 2.5v11" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
          <rect x="6.5" y="3.25" width="6.9" height="9.5" rx="0.9" fill={stroke} fillOpacity={0.14} />
        </>
      ) : null}
    </svg>
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
  const stroke = active ? '#3E63DD' : '#64748B';
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`relative shrink-0 rounded-[4px] p-0 transition-[opacity,background-color] ${
        active
          ? 'z-[3] bg-[rgba(0,64,255,0.03)]'
          : 'z-[1] opacity-50 hover:opacity-90 focus-visible:opacity-100'
      }`}
    >
      <span className="flex items-center p-2">
        <SplitDockIcon mode={variant} stroke={stroke} />
      </span>
    </button>
  );
}

export function CenterDock({
  panelMode,
  onPanelModeChange,
}: {
  panelMode: PanelMode;
  onPanelModeChange: (mode: PanelMode) => void;
}) {
  const dockPositionClass =
    panelMode === 'rightOnly'
      ? 'left-[12px] translate-x-0'
      : panelMode === 'leftOnly'
        ? 'right-[12px] translate-x-0'
        : 'left-1/2 -translate-x-1/2';

  const verticalClass =
    panelMode === 'both' ? 'top-[calc(50%-63px)] -translate-y-1/2' : 'top-1/2 -translate-y-1/2';

  return (
    <div
      data-name="CenterDock"
      className={`absolute z-30 ${verticalClass} ${dockPositionClass}`}
      role="toolbar"
      aria-label="Panel layout"
    >
      <div className="relative isolate flex flex-col items-center justify-center rounded-[12px] bg-[rgba(255,255,255,0.9)] p-1">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-1px] z-0 rounded-[13px] border border-solid border-[rgba(0,9,50,0.12)]"
        />
        <div className="relative z-[1] flex flex-col">
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
    </div>
  );
}
