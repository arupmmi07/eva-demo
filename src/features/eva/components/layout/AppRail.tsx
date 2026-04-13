import { Calendar, ChevronLeft, Clock3, FileText, House, MessageCircle, Search, Shield, Users } from 'lucide-react';

const icons = [ChevronLeft, Search, House, MessageCircle, Users, Calendar, FileText, Shield, Clock3];

export function AppRail() {
  return (
    <aside
      data-name="AppRail"
      className="flex w-[var(--ds-rail-width)] shrink-0 flex-col items-center border-r border-[var(--ds-border)] bg-[var(--ds-bg-primary)] py-[8px]"
      aria-label="Primary navigation"
    >
      <div className="mb-[12px] flex size-[32px] items-center justify-center rounded-[var(--ds-radius-card)] bg-[var(--ds-primary-action)] text-white">
        <span className="font-['Inter',sans-serif] text-[11px] font-semibold leading-none">//</span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-[12px]">
        {icons.map((Icon, index) => {
          const active = index === 2;
          return (
            <button
              key={`rail-nav-${index}`}
              type="button"
              className={`flex size-[32px] items-center justify-center rounded-[var(--ds-radius-card)] transition-colors ${
                active
                  ? 'bg-[var(--ds-bg-accent-purple)] text-[var(--ds-primary-action)]'
                  : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-tertiary)]'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="size-[16px]" strokeWidth={1.5} aria-hidden />
            </button>
          );
        })}
      </div>
      <div className="flex size-[32px] items-center justify-center rounded-[var(--ds-radius-pill)] bg-[var(--ds-bg-accent-purple)] font-['Inter',sans-serif] text-[10px] font-semibold leading-none text-[var(--ds-primary-action)]">
        AK
      </div>
    </aside>
  );
}
