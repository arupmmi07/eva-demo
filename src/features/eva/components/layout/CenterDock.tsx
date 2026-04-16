import type { PanelMode } from '../../types';

function SplitPanelIcon({ variant }: { variant: 'left' | 'split' | 'right' }) {
  const leftActive = variant === 'left' || variant === 'split';
  const rightActive = variant === 'right' || variant === 'split';

  return (
    <span className="flex h-[14px] w-[16px] overflow-hidden rounded-[var(--ds-radius-xs)] border border-current">
      <span className={`h-full flex-1 ${leftActive ? 'bg-current' : 'bg-transparent'}`} />
      <span className="h-full w-px bg-current opacity-60" />
      <span className={`h-full flex-1 ${rightActive ? 'bg-current' : 'bg-transparent'}`} />
    </span>
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
      className={`flex size-[32px] items-center justify-center rounded-[var(--ds-radius-button)] transition-colors ${
        active
          ? 'bg-[var(--ds-bg-accent-purple)] text-[var(--ds-primary-action)]'
          : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-tertiary)] hover:text-[var(--ds-primary-action)]'
      }`}
    >
      <SplitPanelIcon variant={variant} />
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

  return (
    <div
      data-name="CenterDock"
      className={`absolute top-1/2 z-30 -translate-y-1/2 ${dockPositionClass}`}
      role="toolbar"
      aria-label="Panel layout"
    >
      <div className="flex flex-col gap-[4px] rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-1 shadow-[var(--ds-shadow-card)]">
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
