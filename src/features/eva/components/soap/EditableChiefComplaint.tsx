import { ArrowRight } from 'lucide-react';

const MENTION_OPTIONS = [
  'Medial joint line tenderness',
  'Right knee flexion',
  'Left knee flexion',
  'Knee extension',
] as const;

export function EditableChiefComplaint({
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
    <div className="relative" data-name="EditableChiefComplaint">
      <p className="mb-[8px] font-['Inter',sans-serif] text-[12px] font-semibold uppercase leading-[18px] tracking-[0.08em] text-[var(--ds-text-secondary)]">
        {label}
      </p>
      {editable ? (
        <div
          className={`rounded-[var(--ds-radius-card)] border px-[12px] py-[8px] ${
            focused ? 'border-[var(--ds-primary-accent)]' : 'border-[var(--ds-border)]'
          }`}
        >
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={() => onFocusChange(true)}
            onBlur={() => window.setTimeout(() => onFocusChange(false), 120)}
            className="min-h-[58px] w-full resize-none border-none bg-transparent font-['Inter',sans-serif] text-[14px] font-normal leading-[28px] text-[var(--ds-text-primary)] outline-none"
            aria-label={label}
          />
          <p className="font-['Inter',sans-serif] text-[11px] leading-[16px] text-[var(--ds-text-secondary)]">Type `@` to insert a clinical tag.</p>
        </div>
      ) : (
        <p className="font-['Inter',sans-serif] text-[14px] font-normal leading-[28px] text-[var(--ds-text-primary)]">{value}</p>
      )}

      {editable && mentionVisible && (
        <div className="absolute left-0 top-[98px] z-10 w-[250px] rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-[8px] shadow-[var(--ds-shadow-card)]">
          {MENTION_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                onSelectMention(option);
              }}
              className="flex w-full items-center justify-between rounded-[var(--ds-radius-card)] px-[12px] py-[8px] text-left font-['Inter',sans-serif] text-[13px] leading-[20px] text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-accent-purple)] hover:text-[var(--ds-primary-action)]"
            >
              {option}
              <ArrowRight className="size-[12px]" strokeWidth={1.5} aria-hidden />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
